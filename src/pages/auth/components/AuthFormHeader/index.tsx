export default function AuthFormHeader({ title, description }) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight text-[#202B24]">
        {title}
      </h1>

      <p className="text-sm leading-relaxed text-gray-500">
        {description}
      </p>
    </div>
  )
}