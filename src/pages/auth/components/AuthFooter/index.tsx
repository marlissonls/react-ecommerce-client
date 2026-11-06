import { Link } from 'react-router'

export default function AuthFooter({ text, linkText, to }) {
  return (
    <p className="mt-8 text-center text-sm text-gray-500">
      {text}{' '}
      <Link
        to={to}
        className="font-semibold text-[#202B24] underline underline-offset-4 hover:text-gray-600"
      >
        {linkText}
      </Link>
    </p>
  )
}