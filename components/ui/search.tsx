"use client";

import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useDebouncedCallback } from "@/lib/hooks";
import { Event, searchEvents } from "@/lib/api";
import Loader from "@/components/ui/loader";
import Link from "next/link";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebouncedCallback((value) => {
    if (value) {
      setIsLoading(true);
      searchEvents(value).then((data) => {
        setResults(data);
        setIsLoading(false);
      });
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (searchTerm) {
      setShowResults(true);
      debouncedSearch(searchTerm);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEventClick = () => {
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-700" />
        <Input
          type="search"
          placeholder="Поиск мероприятий..."
          className="w-full bg-white/80 text-gray-800 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {showResults && (
        <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-4">
              <Loader />
            </div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {results.map((event) => (
                <li key={event.id} className="p-4 hover:bg-gray-50">
                  <Link
                    href={`/event/${event.id}`}
                    className="block"
                    onClick={handleEventClick}
                  >
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    {event.price && (
                      <p className="text-sm text-gray-600">{event.price}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-center text-gray-500">Ничего не найдено</p>
          )}
        </Card>
      )}
    </div>
  );
}
