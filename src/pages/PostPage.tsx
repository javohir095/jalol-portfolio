import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePost, usePosts } from '../hooks/useData'
import { formatDate, parseMarkdown } from '../utils'
import PostCard from '../components/PostCard'

export default function PostPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { post, loading, error } = usePost(id ?? '')
  const { posts } = usePosts()

  const related = posts
    .filter(p => p.id !== id && p.tags.some(t => post?.tags.includes(t)))
    .slice(0, 3)

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-5 pt-28 pb-16 animate-pulse">
        <div className="h-4 bg-ink-200 rounded w-24 mb-8" />
        <div className="h-10 bg-ink-200 rounded w-4/5 mb-4" />
        <div className="h-4 bg-ink-200 rounded w-1/3 mb-10" />
        <div className="aspect-video bg-ink-200 rounded-2xl mb-10" />
        {[1,2,3,4].map(i => (
          <div key={i} className="h-4 bg-ink-100 rounded mb-3" />
        ))}
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="max-w-2xl mx-auto px-5 pt-28 pb-16 text-center">
        <p className="text-5xl mb-4">😕</p>
        <h1 className="font-display text-2xl font-bold text-ink-950 mb-2">Maqola topilmadi</h1>
        <p className="text-ink-400 mb-8">Bunday maqola mavjud emas yoki o'chirilgan.</p>
        <Link to="/blog" className="text-accent font-medium hover:underline">
          ← Blogga qaytish
        </Link>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-16">
      {/* Hero image */}
      <div className="max-w-4xl mx-auto px-5 mb-8">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-ink-100">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-400 mb-6 font-mono">
          <button onClick={() => navigate(-1)} className="hover:text-ink-700 transition-colors flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Orqaga
          </button>
          <span>/</span>
          <Link to="/blog" className="hover:text-ink-700 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-ink-600 truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-ink-400 font-mono mb-10 pb-8 border-b border-ink-200">
          <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            {formatDate(post.date)}
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {post.readTime} daqiqa o'qish
          </div>
          <span>·</span>
          <span>Kamolov Jalol</span>
        </div>

        {/* Content */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-ink-200 flex items-center justify-between flex-wrap gap-4">
          <p className="text-ink-500 text-sm">Maqola foydali bo'ldimi?</p>
          <div className="flex items-center gap-2">
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Telegram'da ulashish
            </a>
          </div>
        </div>

        {/* Author card */}
        <div className="mt-10 bg-ink-50 border border-ink-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0">
            J
          </div>
          <div>
            <p className="font-semibold text-ink-950">Kamolov Jalol</p>
            <p className="text-ink-500 text-sm mt-0.5">Frontend Developer · Toshkent</p>
            <p className="text-ink-500 text-sm mt-2 leading-relaxed">
              Frontend dasturchi va texnologiya ishqibozi. React va FastAPI bilan CRM tizimlar qurishni yaxshi ko'raman. Bu blog — texnik va hayotiy fikrlarim uchun maydon.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <a href="https://github.com/SHarKing0" target="_blank" rel="noopener noreferrer"
                 className="text-xs text-ink-400 hover:text-accent transition-colors font-mono">GitHub</a>
              <a href="https://t.me/javakhir_0105" target="_blank" rel="noopener noreferrer"
                 className="text-xs text-ink-400 hover:text-accent transition-colors font-mono">Telegram</a>
            </div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="max-w-4xl mx-auto px-5 mt-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-accent font-medium tracking-widest uppercase">O'xshash maqolalar</span>
            <div className="flex-1 h-px bg-ink-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
