import { Link } from 'react-router-dom'
import type { Post } from '../types'
import { formatDate } from '../utils'

interface Props {
  post: Post
  index?: number
}

export default function PostCard({ post, index = 0 }: Props) {
  return (
    <article
      className="group bg-white border border-ink-200 rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 animate-fade-up flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden bg-ink-100">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        <h2 className="font-display font-semibold text-ink-950 text-lg leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-ink-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-ink-100">
          <div className="flex items-center gap-3 text-xs text-ink-400 font-mono">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} daqiqa</span>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
          >
            O'qish
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
