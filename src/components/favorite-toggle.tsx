import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WeatherData } from "@/api/types";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

export function FavoriteToggle({ data }: { data: WeatherData }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const isCurrentlyFavorite = isFavorite(
    data.coord.latitude,
    data.coord.longitude
  );

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.latitude}-${data.coord.longitude}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        latitude: data.coord.latitude,
        longitude: data.coord.longitude,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={"ghost"}
      size="icon"
      onClick={handleToggleFavorite}
      className="rounded-full"
      data-testid="add-to-favorites"
    >
      <Star className={`size-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
    </Button>
  );
}
