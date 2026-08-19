import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import * as destinationService from "../../services/destinationService";
import * as favouriteService from "../../services/favouriteService";
import { DestinationCard } from "../../components/destinations/DestinationCard";
import { CardSkeletonGrid } from "../../components/shared/LoadingSkeleton";
import { EmptyState } from "../../components/shared/EmptyState";
import { useAuth } from "../../context/AuthContext";

export default function Destinations() {
  const { isAuthenticated } = useAuth();

  const [destinations, setDestinations] = useState([]);
  const [favouriteIds, setFavouriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "All");  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    async function load() {
      try {
        const data = await destinationService.getAllDestinations();
        setDestinations(data);

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

  async function handleToggleFavourite(destinationId) {
    const wasFavourited = favouriteIds.has(destinationId);
    const next = new Set(favouriteIds);
    wasFavourited ? next.delete(destinationId) : next.add(destinationId);
    setFavouriteIds(next);

    try {
      wasFavourited
        ? await favouriteService.removeFavourite(destinationId)
        : await favouriteService.addFavourite(destinationId);
    } catch (err) {
      if (err.response?.status !== 409) setFavouriteIds(favouriteIds);
    }
  }

  const categories = useMemo(() => {
    const unique = new Set(destinations.map((d) => d.category));
    return ["All", ...unique];
  }, [destinations]);

  const filtered = useMemo(() => {
    let result = destinations.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || d.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [destinations, search, category, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text mb-6">All Destinations</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-surface"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-surface"
        >
          <option value="none">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        {(search || category !== "All" || sortBy !== "none") && (
          <button
            onClick={() => { setSearch(""); setCategory("All"); setSortBy("none"); }}
            className="text-sm text-muted hover:text-text px-3"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <CardSkeletonGrid count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No destinations found"
          description="Try adjusting your filters."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isFavourited={favouriteIds.has(dest.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
}