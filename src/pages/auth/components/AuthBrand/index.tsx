import { Link } from 'react-router'

export default function AuthBrand({ variant = 'dark' }) {
  const isDark = variant === 'dark'

  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <div
        className={`flex size-10 items-center justify-center ${
          isDark ? 'bg-white' : 'bg-[#202B24]'
        }`}
      >
        <div
          className={`size-5 rotate-45 border-2 ${
            isDark ? 'border-[#202B24]' : 'border-white'
          }`}
        />
      </div>

      <span
        className={`text-xl font-bold tracking-[0.2em] ${
          isDark ? 'text-white' : 'text-[#202B24]'
        }`}
      >
        URBANA
      </span>
    </Link>
  )
}