import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import * as destinationService from "../../services/destinationService";
import { DestinationForm } from "../../components/destinations/DestinationForm";
import { EmptyState } from "../../components/shared/EmptyState";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../context/ToastContext";
export default function AdminDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await destinationService.getAllDestinations();
      setDestinations(data);
    } catch (err) {
      console.error("Failed to load destinations:", err);
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingDestination(null);
    setFormOpen(true);
  }

  function openEditForm(destination) {
    setEditingDestination({ ...destination, price: String(destination.price) });
    setFormOpen(true);
  }

    async function handleSubmit(formData) {
    if (editingDestination) {
      await destinationService.updateDestination(editingDestination.id, formData);
      showToast("Destination updated.");
    } else {
      await destinationService.createDestination(formData);
      showToast("Destination created.");
    }
    setFormOpen(false);
    setEditingDestination(null);
    load();
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await destinationService.deleteDestination(deletingId);
      setDestinations((prev) => prev.filter((d) => d.id !== deletingId));
      showToast("Destination deleted.");
    } catch (err) {
      showToast("Failed to delete destination.", "error");
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">Manage Destinations</h1>
        <Button variant="primary" onClick={openCreateForm}>
          <Plus size={18} className="inline mr-1" /> Add Destination
        </Button>
      </div>

      {formOpen && (
        <div className="border border-border rounded-2xl bg-surface p-6 mb-8">
          <h2 className="font-bold text-text mb-4">
            {editingDestination ? "Edit Destination" : "New Destination"}
          </h2>
          <DestinationForm
            initialData={editingDestination}
            onSubmit={handleSubmit}
            onCancel={() => { setFormOpen(false); setEditingDestination(null); }}
            submitLabel={editingDestination ? "Save Changes" : "Create Destination"}
          />
        </div>
      )}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : destinations.length === 0 ? (
        <EmptyState
          title="No destinations have been added yet"
          actionLabel="Add Destination"
          onAction={openCreateForm}
        />
      ) : (
        <div className="overflow-x-auto border border-border rounded-2xl bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Created</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr key={dest.id} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <img src={dest.imageUrl} alt={dest.name} className="w-14 h-14 object-cover rounded-lg" />
                  </td>
                  <td className="p-3 font-medium text-text">{dest.name}</td>
                  <td className="p-3 text-muted">{dest.location}</td>
                  <td className="p-3 text-muted">{dest.category}</td>
                  <td className="p-3 text-text">${Number(dest.price).toFixed(2)}</td>
                  <td className="p-3 text-muted">{new Date(dest.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEditForm(dest)} className="text-primary hover:opacity-70" aria-label="Edit">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => setDeletingId(dest.id)} className="text-error hover:opacity-70" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deletingId}
        title="Delete destination?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onCancel={() => setDeletingId(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}