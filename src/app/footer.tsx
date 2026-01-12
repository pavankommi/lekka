export function Footer() {
  return (
    <footer className="py-6 text-center text-xs text-gray-400 bg-white">
      <div className="flex items-center justify-center gap-4">
        <span>© {new Date().getFullYear()} Lekka</span>
        <span className="text-gray-300">|</span>
        <a
          href="https://github.com/pavankommi/lekka"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
