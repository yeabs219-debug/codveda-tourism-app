import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const emptyForm = {
  name: "",
  description: "",
  location: "",
  price: "",
  imageUrl: "",
  category: "",
};

export function DestinationForm({ initialData, onSubmit, onCancel, submitLabel = "Save" }) {
  const [form, setForm] = useState(initialData || emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit({ ...form, price: Number(form.price) });
    } catch (err) {
      const backendError = err.response?.data;
      if (backendError?.details) {
        setError(backendError.details.map((d) => d.message).join(" "));
      } else {
        setError(backendError?.error || "Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Name" name="name" value={form.name} onChange={handleChange} required minLength={2} />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          minLength={10}
          rows={4}
          className="px-3 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <Input label="Location" name="location" value={form.location} onChange={handleChange} required minLength={2} />
      <Input label="Price ($)" type="number" step="0.01" min="0" name="price" value={form.price} onChange={handleChange} required />
      <Input label="Image URL" type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} required />
      <Input label="Category" name="category" value={form.category} onChange={handleChange} required minLength={2} />

      {form.imageUrl && (
        <img
          src={form.imageUrl}
          alt="Preview"
          className="w-full h-40 object-cover rounded-lg border border-border"
          onError={(e) => (e.target.style.display = "none")}
          onLoad={(e) => (e.target.style.display = "block")}
        />
      )}

      {error && <p className="text-sm text-error">{error}</p>}

      <div className="flex gap-3 justify-end mt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}