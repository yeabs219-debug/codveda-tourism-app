export function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-text">{label}</label>
      )}
      <input
        className={`px-3 py-2 rounded-lg border bg-surface text-text placeholder:text-muted
          focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
          transition-colors ${error ? "border-error" : "border-border"}`}
        {...props}
      />
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
}