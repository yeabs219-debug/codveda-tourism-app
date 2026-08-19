import { useEffect, useState ,useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ShieldCheck, Heart, MapPinned, Sparkles } from "lucide-react";
import * as destinationService from "../../services/destinationService";
import * as favouriteService from "../../services/favouriteService";
import { DestinationCard } from "../../components/destinations/DestinationCard";
import { CardSkeletonGrid } from "../../components/shared/LoadingSkeleton";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [destinations, setDestinations] = useState([]);
  const [favouriteIds, setFavouriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await destinationService.getAllDestinations();
        setDestinations(data.slice(0, 6));

        if (isAuthenticated) {
          const favs = await favouriteService.getMyFavourites();
          setFavouriteIds(new Set(favs.map((f) => f.destinationId)));
        }
      } catch (err) {
        console.error("Failed to load destinations:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [isAuthenticated]);

    const categories = useMemo(() => {
    const unique = [...new Set(destinations.map((d) => d.category))];
    return unique.slice(0, 6);
  }, [destinations]);

  async function handleToggleFavourite(destinationId) {
    const wasFavourited = favouriteIds.has(destinationId);
    const next = new Set(favouriteIds);

    // Optimistic update
    if (wasFavourited) {
      next.delete(destinationId);
    } else {
      next.add(destinationId);
    }
    setFavouriteIds(next);

    try {
      if (wasFavourited) {
        await favouriteService.removeFavourite(destinationId);
      } else {
        await favouriteService.addFavourite(destinationId);
      }
    } catch (err) {
      // Revert on failure (except 409 "already favourited", which just means we're in sync)
      if (err.response?.status !== 409) {
        setFavouriteIds(favouriteIds);
      }
    }
  }

  return (
    <div>
            {/* Hero */}
      <section
        className="relative bg-cover bg-center min-h-[80vh] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(20,83,45,0.55), rgba(20,83,45,0.75)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Discover Places Worth Remembering
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Explore beautiful destinations, plan your next journey, and reserve unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" onClick={() => navigate("/destinations")}>
              Explore Destinations
            </Button>
            <Button
              variant="outline"
              className="!border-white !text-white hover:!bg-white/10"
              onClick={() => navigate("/destinations")}
            >
              Browse Destinations
            </Button>
          </div>
        </div>
      </section>
            {/* Why book with us */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">Why Travel With Us</h2>
          <p className="text-muted max-w-xl mx-auto">
            A simple, honest way to discover and book your next trip.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="inline-flex bg-primary/10 text-primary p-3 rounded-full mb-4">
              <MapPinned size={22} />
            </div>
            <h3 className="font-semibold text-text mb-1">Curated Destinations</h3>
            <p className="text-sm text-muted">Real places, real details, browsed at your own pace.</p>
          </div>

          <div className="text-center">
            <div className="inline-flex bg-primary/10 text-primary p-3 rounded-full mb-4">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-semibold text-text mb-1">Secure Accounts</h3>
            <p className="text-sm text-muted">Your data is protected with modern authentication.</p>
          </div>

          <div className="text-center">
            <div className="inline-flex bg-primary/10 text-primary p-3 rounded-full mb-4">
              <Heart size={22} />
            </div>
            <h3 className="font-semibold text-text mb-1">Save Favourites</h3>
            <p className="text-sm text-muted">Keep track of destinations you're dreaming about.</p>
          </div>

          <div className="text-center">
            <div className="inline-flex bg-primary/10 text-primary p-3 rounded-full mb-4">
              <Sparkles size={22} />
            </div>
            <h3 className="font-semibold text-text mb-1">Simple Booking</h3>
            <p className="text-sm text-muted">Pick your dates, set your guests, and you're on your way.</p>
          </div>
        </div>
      </section>
              {/* Popular categories */}
      {categories.length > 0 && (
        <section className="bg-surface border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="text-2xl font-bold text-text mb-6 text-center">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate(`/destinations?category=${encodeURIComponent(cat)}`)}
                  className="px-5 py-2 rounded-full border border-border bg-background text-text font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Featured destinations */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text">Featured Destinations</h2>
          <button
            onClick={() => navigate("/destinations")}
            className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
          >
            View all <ArrowRight size={18} />
          </button>
        </div>

        {loading ? (
          <CardSkeletonGrid count={6} />
        ) : destinations.length === 0 ? (
          <p className="text-muted">No destinations available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                isFavourited={favouriteIds.has(dest.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </section>
            {/* CTA for logged-out visitors */}
      {!isAuthenticated && (
        <section className="bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to plan your next trip?
            </h2>
            <p className="text-white/80 mb-8">
              Create an account to save favourites and book destinations in seconds.
            </p>
            <Button variant="accent" onClick={() => navigate("/signup")}>
              Create Free Account
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}