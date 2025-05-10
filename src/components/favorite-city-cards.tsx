import { useWeatherQuery } from "@/hooks/useWeather";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Image from "next/image";

export default function FavoriteCityCards({
  id,
  name,
  latitude,
  longitude,
  onRemove,
}: {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  onRemove: (id: string) => void;
}) {
  const router = useRouter();
  const { data: weather, isLoading } = useWeatherQuery({ latitude, longitude });

  const handleClick = () => {
    router.push(`/city/${name}?latitude=${latitude}&longitude=${longitude}`);
  };

  return (
    <div
      data-testid="favorite-city-card"
      onClick={handleClick}
      className="relative flex min-w-[250px] cursor-pointer  hover:bg-violet-800/20 duration-300 items-center gap-3 rounded-sm border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
      role="button"
      tabIndex={0}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6 rounded-full p-0  hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
        hidden={isLoading}
      >
        <X className="size-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-start justify-center">
          <Loader2 className="size-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-8 w-8"
              width={32}
              height={32}
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
