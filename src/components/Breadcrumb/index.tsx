type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-[#747A74]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-[#A5AAA3]">
                  /
                </span>
              )}

              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-[#34483A]"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={isLast ? "font-medium text-[#272B28]" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb