type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Paginação"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={page <= 0}
        onClick={() => onChange(page - 1)}
        className="rounded-lg border border-[#E2E3DD] px-3 py-2 text-sm text-[#272B28] transition-colors hover:bg-[#F3F1EA] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }, (_, index) => index).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          aria-current={page === pageNumber ? "page" : undefined}
          onClick={() => onChange(pageNumber)}
          className={`h-9 min-w-9 rounded-lg px-3 text-sm transition-colors ${
            page === pageNumber
              ? "bg-[#34483A] text-white"
              : "text-[#272B28] hover:bg-[#F3F1EA]"
          }`}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
        className="rounded-lg border border-[#E2E3DD] px-3 py-2 text-sm text-[#272B28] transition-colors hover:bg-[#F3F1EA] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Próxima
      </button>
    </nav>
  )
}

export default Pagination