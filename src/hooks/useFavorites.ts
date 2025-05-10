import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

export interface FavoriteCity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  );
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  });

  const addFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.latitude}-${city.longitude}`,
        addedAt: Date.now(),
      };

      const exists = favorites.some(
        (fav: FavoriteCity) => fav.id === newFavorite.id
      );
      if (exists) return favorites;

      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter(
        (city: FavoriteCity) => city.id !== cityId
      );
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favorites: favoritesQuery.data,
    addFavorite,
    removeFavorite,
    isFavorite: (latitude: number, longitude: number) =>
      favorites.some(
        (city: FavoriteCity) =>
          city.latitude === latitude && city.longitude === longitude
      ),
  };
}
