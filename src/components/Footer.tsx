export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-200 mt-24 py-10">
      <div className="max-w-4xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-400">
        <span className="font-mono">
          © {year} <span className="text-ink-600 font-medium">Kamolov Jalolbek</span>
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/SHarKing0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-700 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://t.me/javakhir_0105"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-700 transition-colors"
          >
            Telegram
          </a>
          <a
            href="mailto:navisharkus@gmail.com"
            className="hover:text-ink-700 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
