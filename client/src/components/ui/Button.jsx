export function Button({ variant = "primary", loading = false, children, className = "", ...props }) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    accent: "bg-accent text-text hover:bg-accent/90",
    outline: "border border-primary text-primary hover:bg-primary/5",
    ghost: "text-text hover:bg-black/5",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}