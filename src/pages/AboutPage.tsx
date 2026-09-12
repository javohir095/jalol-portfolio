import { useProfile } from '../hooks/useData'

export default function AboutPage() {
  const { profile } = useProfile()

  return (
    <main className="max-w-2xl mx-auto px-5 pt-28 pb-16">
      <div className="animate-fade-up">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-2">Haqimda</p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink-950 tracking-tight mb-10">
          Men kim?
        </h1>
      </div>

      {/* Avatar + intro */}
      <div className="flex items-start gap-6 mb-12 animate-fade-up animate-delay-100">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-accent flex items-center justify-center text-white font-display font-bold text-4xl flex-shrink-0">
          J
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-950 mb-1">Kamolov Jalol</h2>
          <p className="text-accent font-mono text-sm mb-3">Frontend Developer · Toshkent, O'zbekiston</p>
          <p className="text-ink-600 leading-relaxed">
            {profile?.bio}
          </p>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 animate-fade-up animate-delay-200">
        {[
          { icon: '🎂', label: 'Tug\'ilgan sana', value: "31-avgust 2008" },
          { icon: '📍', label: 'Joylashuv', value: 'Toshkent, O\'zbekiston' },
          { icon: '📧', label: 'Email', value: 'navisharkus@gmail.com' },
          { icon: '📱', label: 'Telefon', value: '+998 77 100 90 30' },
        ].map(item => (
          <div key={item.label} className="bg-white border border-ink-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-xs font-mono text-ink-400 mb-0.5">{item.label}</p>
                <p className="text-ink-800 text-sm font-medium break-all">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="mb-12 animate-fade-up animate-delay-300">
        <h3 className="font-display text-xl font-bold text-ink-950 mb-4">Mening yo'lim</h3>
        <div className="space-y-4 text-ink-600 leading-relaxed">
          <p>
            Dasturlash bilan tanishishim tasodifiy bo'lmadi — men muammolarni hal qilishni yaxshi ko'raman va kod buning uchun eng kuchli vosita ekanligini tez angladim.
          </p>
          <p>
            React va Typescript bilan CRM tizimlar qurib, RESTful API'larni loyihalashni o'rgandim. Hozirda <strong className="text-ink-800">frontend arxitektura</strong>, <strong className="text-ink-800">ma'lumotlar bazalari</strong> va <strong className="text-ink-800">API dizayni</strong> ustida ko'proq e'tibor qaratmoqdaman.
          </p>
          <p>
            Bu blog — o'rganganlarimni mustahkamlash va boshqalar bilan bo'lishish uchun yaratilgan. Texnik maqolalardan tashqari, hayot, kitoblar va karyera haqida ham yozaman.
          </p>
        </div>
      </div>

      {/* Skills */}
      {profile && (
        <div className="mb-12 animate-fade-up animate-delay-400">
          <h3 className="font-display text-xl font-bold text-ink-950 mb-5">Ko'nikmalar</h3>
          <div className="space-y-4">
            {profile.skills.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-ink-700">{skill.name}</span>
                  <span className="text-xs font-mono text-ink-400">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="animate-fade-up animate-delay-500">
        <h3 className="font-display text-xl font-bold text-ink-950 mb-5">Bog'lanish</h3>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/SHarKing0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink-950 text-white rounded-xl text-sm font-medium hover:bg-ink-800 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://t.me/javakhir_0105"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Telegram
          </a>
          <a
            href="mailto:navisharkus@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-ink-200 text-ink-700 rounded-xl text-sm font-medium hover:border-ink-400 transition-colors"
          >
            Email yozish
          </a>
        </div>
      </div>
    </main>
  )
}
