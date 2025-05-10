"use client";

import { ScrollBar } from "./ui/scroll-area";
import FavoriteCityCards from "./favorite-city-cards";
import { ScrollArea } from "./ui/scroll-area";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";
import { useEffect } from "react";

export default function FavoriteCitiesList() {
  const { favorites, removeFavorite } = useFavorites();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);  

  if (!hasMounted || favorites.length === 0) return null;

  return (
    <>
      <h2 className="text-xl font-bold tracking-tight">Favorites</h2>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((city) => (
            <FavoriteCityCards
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}
