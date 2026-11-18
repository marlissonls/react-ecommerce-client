type OrderFiltersProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

const filters = [
  { label: "Todos", value: "ALL" },
  { label: "Pendentes", value: "PENDING" },
  { label: "Confirmados", value: "CONFIRMED" },
  { label: "Concluídos", value: "COMPLETED" },
  { label: "Cancelados", value: "CANCELLED" },
];

function OrderFilters({
  activeFilter,
  onFilterChange,
}: OrderFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default OrderFilters;