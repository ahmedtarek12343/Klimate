import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";
import { useLocationsSearch } from "@/hooks/UseWeather";
import { useNavigate } from "react-router";
const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data: city, isLoading } = useLocationsSearch(query);
  const navigate = useNavigate();

  const handleClick = (city: string) => {
    setOpen(false);
    const [lat, lon, name] = city.split("|");
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 hidden md:flex"
      >
        <Search className="mr-2 h-4 w-4" />
        Search Cities...
      </Button>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden transition-all hover:scale-115 cursor-pointer"
      >
        <Search className="mr-2 h-4 w-4 grid place-items-center" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="bg-background text-background-foreground">
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No Cities Found.</CommandEmpty>
          )}
          <CommandSeparator />
          {city && city.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin"></Loader2>
                </div>
              )}
              {city.map((item) => (
                <CommandItem
                  key={`${item.lat}-${item.lon}`}
                  value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                  onSelect={handleClick}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item.name} </span>
                  {item.state && (
                    <span className="text-muted-foreground">
                      , {item.state}
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    , {item.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
