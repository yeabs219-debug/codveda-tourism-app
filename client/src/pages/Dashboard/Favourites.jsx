import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as favouriteService from "../../services/favouriteService";
import { DestinationCard } from "../../components/destinations/DestinationCard";
import { EmptyState } from "../../components/shared/EmptyState";
import { CardSkeletonGrid } from "../../components/shared/LoadingSkeleton";

export default function Favourites() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await favouriteService.getMyFavourites();
      setFavourites(data);
    } catch (err) {
      console.error("Failed to load favourites:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleFavourite(destinationId) {
    // On this page, toggling always means removing (everything shown is already favourited)
    setFavourites((prev) => prev.filter((f) => f.destinationId !== destinationId));

    try {
      await favouriteService.removeFavourite(destinationId);
    } catch (err) {
      // Revert on genuine failure
      load();
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-text mb-6">My Favourites</h1>
        <CardSkeletonGrid count={3} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-text mb-6">My Favourites</h1>

      {favourites.length === 0 ? (
        <EmptyState
          title="You haven't saved any destinations yet"
          actionLabel="Explore Destinations"
          onAction={() => navigate("/destinations")}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((fav) => (
            <DestinationCard
              key={fav.id}
              destination={fav.destination}
              isFavourited={true}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
}