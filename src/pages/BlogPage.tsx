import { useState, useMemo } from 'react'
import { usePosts } from '../hooks/useData'
import PostCard from '../components/PostCard'

export default function BlogPage() {
  const { posts, loading, error } = usePosts()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach(p => p.tags.forEach(t => set.add(t)))
    return Array.from(set)
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const q = query.toLowerCase()
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      const matchTag = !activeTag || p.tags.includes(activeTag)
      return matchQuery && matchTag
    })
  }, [posts, query, activeTag])

  return (
    <main className="max-w-4xl mx-auto px-5 pt-28 pb-16">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-2">Blog</p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink-950 tracking-tight mb-4">
          Maqolalar
        </h1>
        <p className="text-ink-500 text-lg max-w-lg">
          Frontend texnologiyalari, hayot darslari, kitob tahlillari va boshqa mavzulardagi fikrlar.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 animate-fade-up animate-delay-100">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Maqola yoki mavzu qidiring..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-ink-200 rounded-xl text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-10 animate-fade-up animate-delay-200">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
            activeTag === null
              ? 'bg-accent text-white'
              : 'bg-white border border-ink-200 text-ink-500 hover:border-ink-400'
          }`}
        >
          Barchasi ({posts.length})
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(t => t === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
              activeTag === tag
                ? 'bg-accent text-white'
                : 'bg-white border border-ink-200 text-ink-500 hover:border-ink-400'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white border border-ink-200 rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-[16/9] bg-ink-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-ink-100 rounded w-1/3" />
                <div className="h-5 bg-ink-100 rounded w-4/5" />
                <div className="h-3 bg-ink-100 rounded" />
                <div className="h-3 bg-ink-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-ink-400">{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-3xl mb-3">🔍</p>
          <p className="text-ink-500 font-medium">Hech narsa topilmadi</p>
          <p className="text-ink-400 text-sm mt-1">Boshqa kalit so'z bilan urinib ko'ring</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <>
          <p className="text-xs font-mono text-ink-400 mb-5">
            {filtered.length} ta maqola
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}
