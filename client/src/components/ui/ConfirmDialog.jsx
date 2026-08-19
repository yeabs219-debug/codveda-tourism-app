import { Button } from "./Button";

export function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" className="bg-surface rounded-2xl p-6 max-w-sm w-full shadow-lg" >       
                 <h3 id="confirm-dialog-title" className="font-bold text-text text-lg mb-2">{title}</h3>
        <p className="text-muted text-sm mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="!bg-error hover:!bg-error/90"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}