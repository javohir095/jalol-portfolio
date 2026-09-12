import { useProfile } from '../hooks/useData'

const experience = [
  {
    role: 'Frontend Developer',
    company: 'Amaliyot loyihasi',
    period: '06.02.2024 — 06.08.2025',
    desc: "React va TypeScript bilan REST API'lar qurish, Telegram botlar yaratish, PostgreSQL bilan ishlash.",
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Telegram Bot'],
  }

]

const education = [
  {
    school: 'Hozircha hech qanday oliy ta’lim yo‘q',
    degree: '',
    period: '2015',
    desc: 'Hozircha hech qanday oliy ta’lim yo‘q',
  }
]

export default function ResumePage() {
  const { profile } = useProfile()

  return (
    <main className="max-w-2xl mx-auto px-5 pt-28 pb-16">
      {/* Header */}
      <div className="animate-fade-up mb-10">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-2">Resume</p>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink-950 tracking-tight mb-2">
              Kamolov Jalol
            </h1>
            <p className="text-ink-500 font-mono">Frontend Developer · Toshkent</p>
          </div>
          <a
            href="mailto:navisharkus@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors self-start"
          >
            Bog'lanish
          </a>
        </div>
      </div>

      {/* Contact info */}
      <div className="bg-white border border-ink-200 rounded-2xl p-5 mb-10 animate-fade-up animate-delay-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { icon: '📧', text: 'navisharkus@gmail.com', href: 'mailto:navisharkus@gmail.com' },
            { icon: '📱', text: '+998 77 100 90 30', href: 'tel:+998771009030' },
            { icon: '💻', text: 'github.com/SHarKing0', href: 'https://github.com/SHarKing0' },
            { icon: '✈️', text: '@JustJavas_Fun', href: 'https://t.me/@JustJavas_Fun' },
          ].map(item => (
            <a
              key={item.text}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-ink-600 hover:text-accent transition-colors font-mono"
            >
              <span>{item.icon}</span>
              <span className="truncate">{item.text}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Summary */}
      <section className="mb-10 animate-fade-up animate-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-display text-lg font-bold text-ink-950">Qisqacha</h2>
          <div className="flex-1 h-px bg-ink-200" />
        </div>
        <p className="text-ink-600 leading-relaxed">
          {profile?.bio ?? 'Frontend dasturchi — React, Typescript va FastAPI texnologiyalari bilan ishlayman. REST API arxitekturasi, ma\'lumotlar bazalari va server-side dasturlash sohasida tajriba orttirmoqdaman.'}
        </p>
      </section>

      {/* Skills */}
      {profile && (
        <section className="mb-10 animate-fade-up animate-delay-300">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-display text-lg font-bold text-ink-950">Ko'nikmalar</h2>
            <div className="flex-1 h-px bg-ink-200" />
          </div>
          <div className="space-y-3">
            {profile.skills.map(skill => (
              <div key={skill.name} className="flex items-center gap-4">
                <span className="text-sm text-ink-700 font-medium w-28 flex-shrink-0">{skill.name}</span>
                <div className="flex-1 skill-bar">
                  <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                </div>
                <span className="text-xs font-mono text-ink-400 w-8 text-right">{skill.level}%</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      <section className="mb-10 animate-fade-up animate-delay-400">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="font-display text-lg font-bold text-ink-950">Tajriba</h2>
          <div className="flex-1 h-px bg-ink-200" />
        </div>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={i} className="relative pl-5 border-l-2 border-ink-200 hover:border-accent transition-colors">
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white border-2 border-ink-300" />
              <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
                <h3 className="font-semibold text-ink-950">{exp.role}</h3>
                <span className="font-mono text-xs text-ink-400">{exp.period}</span>
              </div>
              <p className="text-accent text-sm font-medium mb-2">{exp.company}</p>
              <p className="text-ink-500 text-sm leading-relaxed mb-3">{exp.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map(t => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="animate-fade-up animate-delay-500">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="font-display text-lg font-bold text-ink-950">Ta'lim</h2>
          <div className="flex-1 h-px bg-ink-200" />
        </div>
        <div className="space-y-5">
          {education.map((edu, i) => (
            <div key={i} className="relative pl-5 border-l-2 border-ink-200">
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white border-2 border-ink-300" />
              <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
                <h3 className="font-semibold text-ink-950">{edu.school}</h3>
                <span className="font-mono text-xs text-ink-400">{edu.period}</span>
              </div>
              <p className="text-accent text-sm font-medium mb-2">{edu.degree}</p>
              <p className="text-ink-500 text-sm leading-relaxed">{edu.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
