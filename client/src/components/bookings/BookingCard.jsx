import { MapPin, Calendar, Users } from "lucide-react";
import { StatusBadge } from "../shared/StatusBadge";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export function BookingCard({ booking, onCancel, onConfirm, cancelling, confirming }) {
  const { isAdmin } = useAuth();
  const { destination } = booking;
  const travelDate = new Date(booking.travelDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const bookingDate = new Date(booking.createdAt).toLocaleDateString();

  const canCancel = booking.status !== "CANCELLED";
  const canConfirm = isAdmin && booking.status === "PENDING";

  return (
    <div className="flex flex-col sm:flex-row gap-4 border border-border rounded-2xl p-4 bg-surface">
      <img
        src={destination.imageUrl}
        alt={destination.name}
        className="w-full sm:w-32 h-32 object-cover rounded-xl flex-shrink-0"
      />

      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-text">{destination.name}</h3>
            <StatusBadge status={booking.status} />
          </div>
          <div className="flex items-center gap-1 text-muted text-sm mt-1">
            <MapPin size={14} />
            <span>{destination.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> Travel: {travelDate}
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} /> {booking.guests} guest{booking.guests > 1 ? "s" : ""}
          </span>
          <span>Booked on {bookingDate}</span>
        </div>

        <div className="flex gap-2">
          {canConfirm && (
            <Button
              variant="primary"
              onClick={() => onConfirm(booking.id)}
              loading={confirming}
            >
              Confirm Booking
            </Button>
          )}
          {canCancel && (
            <Button
              variant="outline"
              className="!text-error !border-error hover:!bg-error/5"
              onClick={() => onCancel(booking.id)}
              loading={cancelling}
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}