import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <p className="font-mono text-8xl font-bold text-ink-200 mb-4">404</p>
        <h1 className="font-display text-2xl font-bold text-ink-950 mb-3">Sahifa topilmadi</h1>
        <p className="text-ink-400 mb-8">Siz izlayotgan sahifa mavjud emas yoki ko'chirilgan.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors"
        >
          ← Bosh sahifaga
        </Link>
      </div>
    </main>
  )
}
