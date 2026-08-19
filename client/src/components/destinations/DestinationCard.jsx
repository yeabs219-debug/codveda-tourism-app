import { Link } from "react-router-dom";
import { Heart, MapPin, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function DestinationCard({ destination, isFavourited, onToggleFavourite }) {
  const { isAuthenticated } = useAuth();
  const price = Number(destination.price);

  return (
    <div className="group rounded-2xl border border-border bg-surface overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isAuthenticated && (
          <button
            onClick={() => onToggleFavourite(destination.id)}
            aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              size={18}
              className={isFavourited ? "fill-error text-error" : "text-text"}
            />
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-text text-lg mb-1">{destination.name}</h3>
        <div className="flex items-center gap-1 text-muted text-sm mb-2">
          <MapPin size={14} />
          <span>{destination.location}</span>
        </div>
        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mb-3">
          {destination.category}
        </span>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-text">${price.toFixed(2)}</span>
          <Link
            to={`/destinations/${destination.id}`}
            className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
          >
            View <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}