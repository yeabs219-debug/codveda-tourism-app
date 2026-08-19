import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bookingService from "../../services/bookingService";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
function todayISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1); // earliest bookable day is tomorrow
  return d.toISOString().split("T")[0];
}

export function BookingPanel({ destinationId }) {
    const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [travelDate, setTravelDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleBook(e) {
    e.preventDefault();
    setError("");

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await bookingService.createBooking({
        destinationId,
        travelDate,
        guests: Number(guests),
      });
      setSuccess(true);
      showToast("Booking request sent!");
    } catch (err) {
      const backendError = err.response?.data;
      if (backendError?.details) {
        setError(backendError.details.map((d) => d.message).join(" "));
      } else {
        setError(backendError?.error || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="border border-success/30 bg-success/5 rounded-2xl p-6 text-center">
        <p className="text-success font-semibold mb-1">Booking request sent!</p>
        <p className="text-muted text-sm mb-4">
          Your booking is pending confirmation. You can track it from your bookings page.
        </p>
        <Button variant="primary" onClick={() => navigate("/bookings")}>
          View My Bookings
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleBook} className="border border-border rounded-2xl p-6 bg-surface flex flex-col gap-4">
      <h3 className="font-bold text-text text-lg">Book this destination</h3>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text">Travel Date</label>
        <input
          type="date"
          min={todayISO()}
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          required
          className="px-3 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text">Guests</label>
        <input
          type="number"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
          className="px-3 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <span className="text-xs text-muted">Maximum 10 guests per booking.</span>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <Button type="submit" variant="primary" loading={loading}>
        {isAuthenticated ? "Book Now" : "Log In to Book"}
      </Button>
    </form>
  );
}