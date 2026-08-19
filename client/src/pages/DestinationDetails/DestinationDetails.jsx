import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { BookingPanel } from "../../components/bookings/BookingPanel";
import * as destinationService from "../../services/destinationService";

export default function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await destinationService.getDestinationById(id);
        setDestination(data);
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

    if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
        <div className="h-80 bg-border rounded-2xl mb-6" />
        <div className="h-8 bg-border rounded w-1/2 mb-3" />
        <div className="h-4 bg-border rounded w-1/3 mb-6" />
        <div className="h-24 bg-border rounded" />
      </div>
    );
  }

  if (notFound || !destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-muted mb-4">Destination not found.</p>
        <Link to="/destinations" className="text-primary font-medium">
          Back to destinations
        </Link>
      </div>
    );
  }

  const price = Number(destination.price);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/destinations" className="flex items-center gap-1 text-muted hover:text-text mb-6">
        <ArrowLeft size={16} /> Back to destinations
      </Link>

      <img
        src={destination.imageUrl}
        alt={destination.name}
        className="w-full h-80 object-cover rounded-2xl mb-6"
      />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">{destination.name}</h1>
          <div className="flex items-center gap-1 text-muted mb-2">
            <MapPin size={16} />
            <span>{destination.location}</span>
          </div>
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {destination.category}
          </span>
        </div>
        <span className="text-2xl font-bold text-text">${price.toFixed(2)}</span>
      </div>

      <p className="text-text leading-relaxed mb-8">{destination.description}</p>

      {/* Booking panel goes here — Phase 7 */}
      <div className="border border-border rounded-2xl p-6 bg-surface">
      <BookingPanel destinationId={destination.id} />
      </div>
    </div>
  );
}