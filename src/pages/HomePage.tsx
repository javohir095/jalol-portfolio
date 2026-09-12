import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProfile, usePosts } from '../hooks/useData'
import PostCard from '../components/PostCard'

const ROLES = [
  'Frontend Developer',
  'React Dasturchi',
  'API Arxitektori',
  'Texnologiya Ishqibozi',
]

export default function HomePage() {
  const { profile } = useProfile()
  const { posts } = usePosts()
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [typing, setTyping] = useState(true)
  const timeoutRef = useRef<number>(0)

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex]
    if (typing) {
      if (displayText.length < current.length) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1))
        }, 70)
      } else {
        timeoutRef.current = window.setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 40)
      } else {
        setRoleIndex(i => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayText, typing, roleIndex])

  const recentPosts = posts.slice(0, 3)

  return (
    <main className="max-w-4xl mx-auto px-5">
      {/* Hero */}
      <section className="pt-36 pb-24">
        <div className="animate-fade-up">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-mono text-green-700 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Ishga tayyor
          </div>

          {/* Name */}
          <div className="mb-4">
            <p className="text-ink-400 font-mono text-sm tracking-widest uppercase mb-1">Salom, men —</p>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-ink-950 tracking-tight leading-none">
              Kamolov Jalolbek
            </h1>
          </div>

          {/* Typewriter role */}
          <div className="flex items-center gap-2 mb-6 h-9">
            <span className="font-mono text-xl sm:text-2xl text-accent font-medium">
              {displayText}
            </span>
            <span className="w-0.5 h-6 bg-accent animate-blink" />
          </div>

          {/* Tagline */}
          <p className="text-ink-500 text-lg max-w-lg leading-relaxed mb-10">
            Men texnik bo'lmagan narsalar haqida yozaman —{' '}
            <span className="text-ink-700">hayot, kitoblar, karyera va fikrlar.</span>{' '}
            Frontend tizimlar quraman, blog yuritaman.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-accent/30"
            >
              Blogni o'qish
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a
              href="https://github.com/SHarKing0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-ink-200 text-ink-700 rounded-xl font-medium text-sm hover:border-ink-400 hover:text-ink-950 transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
            <a
              href="mailto:navisharkus@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-ink-200 text-ink-700 rounded-xl font-medium text-sm hover:border-ink-400 hover:text-ink-950 transition-colors"
            >
              Bog'lanish
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-8 border-t border-ink-200 grid grid-cols-3 gap-4 animate-fade-up animate-delay-300">
          {[
            { label: 'Yosh', value: new Date().getFullYear() - 2010 },
            { label: "Blog post", value: posts.length + '+' },
            { label: 'Loyihalar', value: '5+' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-ink-950">{s.value}</div>
              <div className="text-xs text-ink-400 font-mono mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      {profile && (
        <section className="mb-24 animate-fade-up animate-delay-200">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-accent font-medium tracking-widest uppercase">Ko'nikmalar</span>
            <div className="flex-1 h-px bg-ink-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {profile.skills.map((skill, i) => (
              <div key={skill.name} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-ink-700">{skill.name}</span>
                  <span className="text-xs font-mono text-ink-400">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent font-medium tracking-widest uppercase">So'nggi maqolalar</span>
              <div className="w-16 h-px bg-ink-200" />
            </div>
            <Link
              to="/blog"
              className="text-sm text-ink-400 hover:text-accent transition-colors font-mono flex items-center gap-1"
            >
              Barchasi
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* About snippet */}
      <section className="mb-24">
        <div className="bg-ink-950 rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
               style={{ background: '#2563eb', transform: 'translate(30%, -30%)' }} />
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Haqimda</p>
          <blockquote className="font-display text-xl sm:text-2xl font-semibold leading-snug text-white mb-6 max-w-xl">
            "Kod yozish — bu muammo hal qilish san'ati. Men har kuni yangi narsalar o'rganib, ularni amalda qo'llashga harakat qilaman."
          </blockquote>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-semibold text-white">Kamolov Jalolbek</p>
              <p className="text-ink-400 text-sm">Frontend Developer · Toshkent</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
