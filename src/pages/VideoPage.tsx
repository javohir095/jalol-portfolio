import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useVideos } from '../hooks/useData'
import type { Video } from '../types'

/* ─── Plyr loaded from CDN (no npm install needed at runtime) ─── */
declare global {
  interface Window { Plyr: any }
}

const PLYR_CSS = 'https://cdn.plyr.io/3.7.8/plyr.css'
const PLYR_JS  = 'https://cdn.plyr.io/3.7.8/plyr.polyfilled.js'

function loadPlyr(): Promise<void> {
  return new Promise(resolve => {
    if (window.Plyr) { resolve(); return }

    // CSS
    if (!document.querySelector(`link[href="${PLYR_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel  = 'stylesheet'
      link.href = PLYR_CSS
      document.head.appendChild(link)
    }

    // JS
    const script = document.createElement('script')
    script.src = PLYR_JS
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

/* ─── Constants ─────────────────────────────────────────────────── */
const CATS = [
  { key: 'all',    label: 'Hammasi' },
  { key: 'loyiha', label: 'Loyihalar' },
  { key: 'dars',   label: 'Darslar' },
  { key: 'qisqa',  label: 'Qisqa' },
  { key: 'boshqa', label: 'Boshqa' },
]

const CAT_DOT: Record<string, string> = {
  loyiha: '#2563eb',
  dars:   '#10b981',
  qisqa:  '#f59e0b',
  boshqa: '#94a3b8',
}
const CAT_LABEL: Record<string, string> = {
  loyiha: 'Loyiha', dars: 'Dars', qisqa: 'Qisqa', boshqa: 'Boshqa',
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('uz-UZ', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

/* ─── Plyr modal ─────────────────────────────────────────────────── */
function PlyrModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef    = useRef<any>(null)

  /* load Plyr → init */
  useEffect(() => {
    let cancelled = false
    loadPlyr().then(() => {
      if (cancelled || !containerRef.current) return
      const videoEl = containerRef.current.querySelector('video')
      if (!videoEl) return

      playerRef.current = new window.Plyr(videoEl, {
        controls: [
          'play-large','play','progress','current-time','duration',
          'mute','volume','captions','settings','pip','fullscreen',
        ],
        settings: ['quality','speed','loop'],
        tooltips: { controls: true, seek: true },
        keyboard: { focused: true, global: false },
      })
      playerRef.current.play()
    })
    return () => { cancelled = true }
  }, [])

  /* destroy on unmount */
  useEffect(() => {
    return () => { playerRef.current?.destroy() }
  }, [])

  /* body scroll lock + ESC */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', h)
    }
  }, [onClose])

  return (
    <div
      className="vp-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog" aria-modal="true" aria-label={video.name}
    >
      <div className="vp-modal">

        {/* close */}
        <button className="vp-close" onClick={onClose} aria-label="Yopish">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* player */}
        <div className="vp-player-wrap" ref={containerRef}>
          <video
            src={video.url}
            poster={video.poster || ''}
            playsInline
            crossOrigin="anonymous"
          />
        </div>

        {/* meta */}
        <div className="vp-meta">
          <div className="vp-meta-left">
            <span className="vp-dot" style={{ background: CAT_DOT[video.category] ?? '#94a3b8' }} />
            <span className="vp-cat">{CAT_LABEL[video.category] ?? video.category}</span>
            {video.duration && <span className="vp-dur">{video.duration}</span>}
          </div>
          <time className="vp-date">{fmt(video.date)}</time>
        </div>

        <div className="vp-title-row">
          <h2 className="vp-modal-title">{video.name}</h2>
        </div>
        <p className="vp-modal-desc">{video.description}</p>
      </div>

      <style>{`
        .vp-overlay {
          position: fixed; inset: 0; z-index: 9000;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          background: rgba(10,10,15,0.92);
          backdrop-filter: blur(14px);
          animation: vp-fade .2s ease;
        }
        @keyframes vp-fade { from{opacity:0} to{opacity:1} }

        .vp-modal {
          position: relative;
          width: 100%; max-width: 860px;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          animation: vp-up .25s cubic-bezier(.22,1,.36,1);
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5);
        }
        @keyframes vp-up {
          from { opacity:0; transform:translateY(28px) scale(0.97) }
          to   { opacity:1; transform:translateY(0) scale(1) }
        }

        .vp-close {
          position: absolute; top: 12px; right: 12px; z-index: 10;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(0,0,0,0.55);
          border: none; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .15s, transform .15s;
        }
        .vp-close:hover { background: rgba(0,0,0,0.8); transform: scale(1.08); }

        .vp-player-wrap { background: #000; }
        .vp-player-wrap video { display: block; width: 100%; }

        /* Plyr theme override */
        .vp-player-wrap .plyr--video .plyr__control:hover,
        .vp-player-wrap .plyr--video .plyr__control[aria-expanded=true] {
          background: #2563eb;
        }
        .vp-player-wrap .plyr__progress input[type=range],
        .vp-player-wrap .plyr__volume input[type=range] {
          color: #2563eb;
        }
        .vp-player-wrap .plyr--full-ui input[type=range] {
          color: #2563eb;
        }

        .vp-meta {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px 0;
        }
        .vp-meta-left { display:flex; align-items:center; gap:8px; }
        .vp-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .vp-cat {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase;
          color: #4a4a47;
        }
        .vp-dur {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #919190;
        }
        .vp-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #b8b8b4;
        }

        .vp-title-row { padding: 6px 20px 2px; }
        .vp-modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem; font-weight: 800;
          letter-spacing: -0.02em; color: #1c1c1b;
          line-height: 1.25;
        }
        .vp-modal-desc {
          padding: 4px 20px 18px;
          font-size: 0.8rem; color: #74746f; line-height: 1.6;
        }
      `}</style>
    </div>
  )
}

/* ─── Video Card ─────────────────────────────────────────────────── */
function VideoCard({
  video, index, featured, onPlay,
}: { video: Video; index: number; featured: boolean; onPlay: (v: Video) => void }) {

  const isFeatured = featured && index === 0

  return (
    <article
      className={`vc-card ${isFeatured ? 'vc-card--featured' : ''}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {/* Thumbnail */}
      <button className="vc-thumb" onClick={() => onPlay(video)} aria-label={`${video.name} ko'rish`}>
        {/* grid texture */}
        <svg className="vc-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <pattern id={`g${video.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#g${video.id})`}/>
        </svg>

        {/* large index number */}
        <span className="vc-num" aria-hidden>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* play ring */}
        <div className="vc-play-ring">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M7 4.5l10 5.5-10 5.5V4.5z" fill="currentColor"/>
          </svg>
        </div>

        {/* duration */}
        {video.duration && <span className="vc-dur-badge">{video.duration}</span>}
      </button>

      {/* Body */}
      <div className="vc-body">
        <div className="vc-header">
          <span className="vc-cat-dot" style={{ background: CAT_DOT[video.category] ?? '#94a3b8' }} />
          <span className="vc-cat-lbl">{CAT_LABEL[video.category] ?? video.category}</span>
          <span className="vc-sep">·</span>
          <time className="vc-date">{fmt(video.date)}</time>
        </div>

        <h2 className="vc-title">{video.name}</h2>
        <p className="vc-desc">{video.description}</p>

        <button className="vc-watch" onClick={() => onPlay(video)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 2l6 4-6 4V2z" fill="currentColor"/>
          </svg>
          Ko'rish
        </button>
      </div>
    </article>
  )
}

/* ─── Skeleton ───────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="vc-skeleton">
      <div className="vc-sk-thumb" />
      <div className="vc-sk-body">
        <div className="vc-sk-line" style={{ width: '40%', height: 10 }} />
        <div className="vc-sk-line" style={{ width: '80%', height: 14 }} />
        <div className="vc-sk-line" style={{ width: '100%', height: 10 }} />
        <div className="vc-sk-line" style={{ width: '60%', height: 10 }} />
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function VideoPage() {
  const { videos, loading, error } = useVideos()
  const [category, setCategory]   = useState('all')
  const [query,    setQuery]       = useState('')
  const [active,   setActive]      = useState<Video | null>(null)
  const featured = false

  const activeCats = useMemo(() => {
    const used = new Set(videos.map(v => v.category))
    return CATS.filter(c => c.key === 'all' || used.has(c.key as Video['category']))
  }, [videos])

  const filtered = useMemo(() => {
    return videos.filter(v => {
      const matchCat = category === 'all' || v.category === category
      const q = query.toLowerCase()
      const matchQ = !q || v.name.toLowerCase().includes(q) || v.description.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [videos, category, query])

  const openPlayer = useCallback((v: Video) => setActive(v), [])

  return (
    <main className="vp-page">

      {/* ── Hero ── */}
      <section className="vp-hero">
        <div className="vp-hero-inner">
          <p className="vp-eyebrow">
            <span className="vp-eyebrow-line" />
            Video ishlar
          </p>
          <h1 className="vp-h1">
            Kadr<br/>
            <em>lar</em>
          </h1>
          <p className="vp-hero-sub">
            Har bir kadr — bir fikr. Har bir video — bir hikoya.
          </p>
        </div>

        {/* decorative count */}
        {!loading && (
          <div className="vp-hero-count" aria-hidden>
            <span className="vp-count-num">{String(videos.length).padStart(2, '0')}</span>
            <span className="vp-count-lbl">Kadr</span>
          </div>
        )}
      </section>

      {/* ── Controls ── */}
      <div className="vp-controls">
        {/* search */}
        <div className="vp-search-wrap">
          <svg className="vp-search-icon" width="15" height="15" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="vp-search"
            type="text"
            placeholder="Video qidirish…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Video qidirish"
          />
          {query && (
            <button className="vp-search-clear" onClick={() => setQuery('')} aria-label="Tozalash">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* filters */}
        <div className="vp-filters" role="group" aria-label="Kategoriya filtri">
          {activeCats.map(c => (
            <button
              key={c.key}
              className={`vp-filter ${category === c.key ? 'vp-filter--active' : ''}`}
              onClick={() => setCategory(c.key)}
            >
              {c.key !== 'all' && (
                <span className="vp-filter-dot"
                  style={{ background: CAT_DOT[c.key] ?? '#94a3b8' }} />
              )}
              {c.label}
              <span className="vp-filter-count">
                {c.key === 'all' ? videos.length : videos.filter(v => v.category === c.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="vp-grid-wrap">

        {loading && (
          <div className="vp-grid">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} />)}
          </div>
        )}

        {error && (
          <div className="vp-empty">
            <span className="vp-empty-icon">⚠</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="vp-empty">
            <span className="vp-empty-icon">🎬</span>
            <p>Hech narsa topilmadi</p>
            <small>Boshqa kalit so'z bilan urinib ko'ring</small>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="vp-result-count">
              <span>{filtered.length}</span> ta video
            </p>
            <div className="vp-grid">
              {filtered.map((v, i) => (
                <VideoCard
                  key={v.id} video={v} index={i}
                  featured={featured} onPlay={openPlayer}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Modal ── */}
      {active && <PlyrModal video={active} onClose={() => setActive(null)} />}

      {/* ── Styles ── */}
      <style>{`
        /* Page */
        .vp-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px 80px;
        }

        /* Hero */
        .vp-hero {
          padding: 110px 0 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          border-bottom: 1px solid #eeeeed;
          margin-bottom: 40px;
          animation: fadeUp .6s ease both;
        }
        .vp-hero-inner { flex: 1; }

        .vp-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 18px;
        }
        .vp-eyebrow-line {
          display: block;
          width: 28px; height: 1.5px;
          background: #2563eb;
        }

        .vp-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: #1c1c1b;
          margin-bottom: 16px;
        }
        .vp-h1 em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px #2563eb;
        }
        .vp-hero-sub {
          font-size: 0.95rem;
          color: #74746f;
          line-height: 1.65;
          max-width: 360px;
        }

        .vp-hero-count {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
          padding-bottom: 4px;
        }
        .vp-count-num {
          font-family: 'Syne', sans-serif;
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #eeeeed;
          line-height: 1;
        }
        .vp-count-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #b8b8b4;
        }

        /* Controls */
        .vp-controls {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 36px;
          animation: fadeUp .6s .1s ease both;
        }

        .vp-search-wrap {
          position: relative;
        }
        .vp-search-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          color: #b8b8b4;
          pointer-events: none;
        }
        .vp-search {
          width: 100%;
          padding: 11px 40px 11px 40px;
          background: #fff;
          border: 1px solid #d9d9d6;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #1c1c1b;
          outline: none;
          transition: border .15s, box-shadow .15s;
        }
        .vp-search::placeholder { color: #b8b8b4; }
        .vp-search:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,.12);
        }
        .vp-search-clear {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #b8b8b4; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: color .15s;
        }
        .vp-search-clear:hover { color: #4a4a47; }

        .vp-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .vp-filter {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          background: #fff;
          border: 1px solid #d9d9d6;
          color: #74746f;
          cursor: pointer;
          transition: all .15s;
        }
        .vp-filter:hover { border-color: #919190; color: #1c1c1b; }
        .vp-filter--active {
          background: #1c1c1b !important;
          border-color: #1c1c1b !important;
          color: #fff !important;
        }
        .vp-filter-dot {
          width: 6px; height: 6px;
          border-radius: 50%; flex-shrink: 0;
        }
        .vp-filter--active .vp-filter-dot { background: #fff !important; }
        .vp-filter-count {
          font-size: 10px;
          opacity: 0.55;
        }

        /* Grid */
        .vp-grid-wrap { animation: fadeUp .6s .18s ease both; }
        .vp-result-count {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #b8b8b4;
          margin-bottom: 20px;
        }
        .vp-result-count span { color: #4a4a47; }

        .vp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1px;
          border: 1px solid #eeeeed;
          border-radius: 16px;
          overflow: hidden;
          background: #eeeeed;
        }

        /* Card */
        .vc-card {
          background: #fff;
          display: flex;
          flex-direction: column;
          animation: fadeUp .55s ease both;
          transition: background .15s;
        }
        .vc-card:hover { background: #f7f7f6; }

        /* thumb */
        .vc-thumb {
          position: relative;
          aspect-ratio: 16/9;
          width: 100%;
          background: #f7f7f6;
          border: none; cursor: pointer;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .vc-grid {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          color: #1c1c1b;
          opacity: .06;
        }
        .vc-num {
          position: absolute;
          bottom: 8px; left: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 2.2rem;
          font-weight: 900;
          color: #1c1c1b;
          opacity: .06;
          line-height: 1;
          user-select: none;
        }
        .vc-dur-badge {
          position: absolute;
          bottom: 8px; right: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          background: rgba(0,0,0,.55);
          color: #fff;
          padding: 2px 7px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }
        .vc-play-ring {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid #1c1c1b;
          display: flex; align-items: center; justify-content: center;
          color: #1c1c1b;
          transition: background .18s, color .18s, transform .18s, border-color .18s;
          position: relative; z-index: 1;
        }
        .vc-thumb:hover .vc-play-ring {
          background: #2563eb;
          border-color: #2563eb;
          color: #fff;
          transform: scale(1.1);
        }

        /* body */
        .vc-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .vc-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }
        .vc-cat-dot {
          width: 6px; height: 6px;
          border-radius: 50%; flex-shrink: 0;
        }
        .vc-cat-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #74746f;
        }
        .vc-sep { color: #d9d9d6; font-size: 10px; }
        .vc-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #b8b8b4;
        }
        .vc-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #1c1c1b;
          line-height: 1.3;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .vc-desc {
          font-size: 0.78rem;
          color: #919190;
          line-height: 1.55;
          flex: 1;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .vc-watch {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: #2563eb;
          cursor: pointer;
          padding: 0;
          transition: gap .15s, opacity .15s;
        }
        .vc-watch:hover { opacity: .75; gap: 10px; }

        /* Skeleton */
        .vc-skeleton {
          background: #fff;
          animation: pulse 1.6s ease infinite;
        }
        .vc-sk-thumb {
          aspect-ratio: 16/9;
          background: #f7f7f6;
        }
        .vc-sk-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .vc-sk-line {
          background: #eeeeed;
          border-radius: 4px;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1 }
          50% { opacity: .55 }
        }

        /* Empty */
        .vp-empty {
          text-align: center;
          padding: 80px 20px;
          color: #919190;
        }
        .vp-empty-icon {
          display: block;
          font-size: 2.5rem;
          margin-bottom: 12px;
        }
        .vp-empty p { font-weight: 500; margin-bottom: 4px; }
        .vp-empty small { font-size: 0.82rem; color: #b8b8b4; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px) }
          to   { opacity:1; transform:translateY(0) }
        }

        @media (max-width: 600px) {
          .vp-hero { padding-top: 90px; flex-direction: column; gap: 1rem; }
          .vp-hero-count { align-items: flex-start; }
          .vp-h1 { font-size: 2.2rem; }
          .vp-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
