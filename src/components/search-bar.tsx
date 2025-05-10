"use client";

import { Search, Star, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandSeparator,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
} from "./ui/command";
import { useState } from "react";
import { useLocationSearch } from "@/hooks/useWeather";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { favorites } = useFavorites();

  const handleSelect = (cityData: string) => {
    const [latitude, longitude, name] = cityData.split("|");

    setOpen(false);

    router.push(
      `/city/${encodeURIComponent(
        name
      )}?latitude=${latitude}&longitude=${longitude}`
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        className="relative w-fit justify-between gap-2 text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 rounded-full"
        onClick={() => setOpen(true)}
        data-testid="search-button"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search cities...</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Search cities..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.length > 2 && !isLoading && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {favorites.length > 0 && (
              <CommandGroup heading="Favorites" className="space-y-2">
                {favorites.map((city) => (
                  <CommandItem
                    data-testid="command-item"
                    key={city.id}
                    value={`${city.latitude}|${city.longitude}|${city.name}|${city.country}`}
                    onSelect={handleSelect}
                    className="mb-2"
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>{city.name}</span>
                    {city.state && (
                      <span className="text-sm text-muted-foreground">
                        , {city.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {city.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {locations && locations.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Suggestions" className="space-y-2">
                  {isLoading && (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {locations?.map((location) => (
                    <CommandItem
                      key={
                        location.name &&
                        location.country &&
                        location.lat !== undefined
                          ? `${location.name}-${location.country}-${location.lat}`
                          : Math.random().toString()
                      }
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                      className="mb-2"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {location.country}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
