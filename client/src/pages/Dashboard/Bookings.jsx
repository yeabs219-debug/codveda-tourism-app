import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bookingService from "../../services/bookingService";
import { BookingCard } from "../../components/bookings/BookingCard";
import { EmptyState } from "../../components/shared/EmptyState";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { useToast } from "../../context/ToastContext";

export default function Bookings() {
    const { showToast } = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);
  const [confirmingActionId, setConfirmingActionId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  }

   async function handleCancel(id) {
    setCancellingId(id);
    try {
      const updated = await bookingService.cancelBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: updated.status } : b)));
      showToast("Booking cancelled.");
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to cancel booking.", "error");
    } finally {
      setCancellingId(null);
      setConfirmingId(null);
    }
  }

  async function handleConfirm(id) {
    setConfirmingActionId(id);
    try {
      const updated = await bookingService.confirmBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: updated.status } : b)));
      showToast("Booking confirmed.");
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to confirm booking.", "error");
    } finally {
      setConfirmingActionId(null);
    }
  }

    if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-text mb-6">My Bookings</h1>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 border border-border rounded-2xl p-4 bg-surface animate-pulse">
              <div className="w-32 h-32 bg-border rounded-xl flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-3 py-2">
                <div className="h-4 bg-border rounded w-1/2" />
                <div className="h-3 bg-border rounded w-1/3" />
                <div className="h-3 bg-border rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-text mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <EmptyState
          title="Your next adventure starts here"
          description="Explore destinations and plan your next trip."
          actionLabel="Explore Destinations"
          onAction={() => navigate("/destinations")}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={setConfirmingId}
              onConfirm={handleConfirm}
              cancelling={cancellingId === booking.id}
              confirming={confirmingActionId === booking.id}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmingId}
        title="Cancel this booking?"
        description="This action cannot be undone."
        confirmLabel="Cancel Booking"
        onCancel={() => setConfirmingId(null)}
        onConfirm={() => handleCancel(confirmingId)}
        loading={cancellingId === confirmingId}
      />
    </div>
  );
}