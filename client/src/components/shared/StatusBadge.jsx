const statusStyles = {
  PENDING: "bg-warning/10 text-warning border-warning/30",
  CONFIRMED: "bg-success/10 text-success border-success/30",
  CANCELLED: "bg-error/10 text-error border-error/30",
};

const statusLabels = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}