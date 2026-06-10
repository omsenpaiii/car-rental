"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Search, SlidersHorizontal, Map, Grid, List, Star, 
  MapPin, Calendar, Check, Compass, ChevronDown, RefreshCw 
} from "lucide-react";
import { turoCars, TuroCar } from "@/lib/theme4-data";

function Theme4SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters from URL
  const initLocation = searchParams.get("location") || "Melbourne, VIC";
  const initPickup = searchParams.get("pickup") || "2026-06-15";
  const initReturn = searchParams.get("return") || "2026-06-18";
  const initMake = searchParams.get("make") || "";
  const initCategory = searchParams.get("category") || "";

  // Filter States
  const [location, setLocation] = useState(initLocation);
  const [pickupDate, setPickupDate] = useState(initPickup);
  const [returnDate, setReturnDate] = useState(initReturn);

  // Active filters
  const [sortBy, setSortBy] = useState<"relevance" | "priceLow" | "priceHigh" | "rating">("relevance");
  const [selectedCategory, setSelectedCategory] = useState<string>(initCategory);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  const [showMap, setShowMap] = useState<boolean>(true);

  // Sync state with URL params on load
  useEffect(() => {
    if (initCategory) setSelectedCategory(initCategory);
  }, [initCategory]);

  // Handle Location/Date Search Bar submit
  const handleSearchBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/theme4/search?location=${encodeURIComponent(location)}&pickup=${pickupDate}&return=${returnDate}`
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategory("");
    setMaxPrice(300);
    setSelectedTransmission("");
    setSelectedFuelType("");
    setSortBy("relevance");
  };

  // Filter & Sort Logic
  const filteredCars = useMemo(() => {
    let result = [...turoCars];

    // Filter by Brand/Make (if search came from home make categories)
    if (initMake) {
      result = result.filter(
        (car) => car.make.toLowerCase() === initMake.toLowerCase()
      );
    }

    // Filter by Category
    if (selectedCategory) {
      result = result.filter(
        (car) => car.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Max Price
    result = result.filter((car) => car.pricePerDay <= maxPrice);

    // Filter by Transmission
    if (selectedTransmission) {
      result = result.filter(
        (car) => car.transmission.toLowerCase() === selectedTransmission.toLowerCase()
      );
    }

    // Filter by Fuel Type
    if (selectedFuelType) {
      result = result.filter(
        (car) => car.fuelType.toLowerCase() === selectedFuelType.toLowerCase()
      );
    }

    // Sorting
    if (sortBy === "priceLow") {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [initMake, selectedCategory, maxPrice, selectedTransmission, selectedFuelType, sortBy]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Top Search Bar (Compact styling) */}
      <section className="border-b border-gray-200 bg-white py-4 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSearchBarSubmit}
            className="flex flex-col md:flex-row items-center gap-3 w-full"
          >
            {/* Location */}
            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-xl bg-gray-50 flex-1 w-full">
              <MapPin className="text-turo-purple size-4 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where to?"
                className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent"
              />
            </div>

            {/* Dates */}
            <div className="flex items-center gap-3 px-3 py-1.5 border border-gray-200 rounded-xl bg-gray-50 w-full md:w-auto">
              <Calendar className="text-turo-purple size-4 shrink-0" />
              <div className="flex gap-2 text-xs font-semibold text-gray-700">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer"
                />
                <span className="text-gray-300">to</span>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-turo-purple hover:bg-turo-hover text-white px-6 py-2 rounded-xl text-sm font-bold transition-colors w-full md:w-auto flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search className="size-4" />
              Update Search
            </button>
          </form>
        </div>
      </section>

      {/* Main search body: Split View Map/List */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        {/* Left column: Filters & Listings */}
        <div className={`flex-1 flex flex-col ${showMap ? "lg:w-7/12" : "w-full"}`}>
          
          {/* Quick Filters / Top Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-bold border border-gray-200 px-3 py-2 rounded-full outline-none bg-white text-gray-700 hover:border-turo-purple cursor-pointer transition-colors"
              >
                <option value="">All Categories</option>
                <option value="Electric">Electric</option>
                <option value="Sport">Sport</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
              </select>

              {/* Price filter indicator */}
              <div className="flex items-center gap-2 text-xs font-bold border border-gray-200 px-3 py-2 rounded-full bg-white text-gray-700">
                <span>Max: ${maxPrice}/day</span>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-16 h-1 bg-gray-200 rounded-lg accent-turo-purple cursor-pointer"
                />
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold border border-gray-200 px-3 py-2 rounded-full outline-none bg-white text-gray-700 hover:border-turo-purple cursor-pointer transition-colors"
              >
                <option value="relevance">Relevance</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>

              {/* Reset */}
              {(selectedCategory || maxPrice < 300 || selectedTransmission || selectedFuelType || sortBy !== "relevance") && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-turo-purple hover:text-turo-hover flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="size-3" />
                  Clear all
                </button>
              )}
            </div>

            {/* Map Toggle Switch */}
            <button
              onClick={() => setShowMap(!showMap)}
              className="hidden lg:flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
            >
              <Map className="size-3.5 text-turo-purple" />
              {showMap ? "Hide Map" : "Show Map"}
            </button>
          </div>

          {/* More Filters Panel (Inline Collapse) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-turo-gray rounded-2xl mb-8 border border-gray-100">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">
                Transmission
              </label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-gray-700 outline-none"
              >
                <option value="">Any</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">
                Fuel Type
              </label>
              <select
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
                className="w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-gray-700 outline-none"
              >
                <option value="">Any</option>
                <option value="Electric">Electric</option>
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="col-span-2 flex items-end justify-end">
              <span className="text-xs text-gray-400 font-semibold mb-1">
                Showing {filteredCars.length} vehicles in Melbourne
              </span>
            </div>
          </div>

          {/* Search Listings Grid */}
          {filteredCars.length > 0 ? (
            <div className="space-y-6">
              {filteredCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/theme4/car/${car.id}`}
                  className="flex flex-col sm:flex-row border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-turo-purple/20 transition-all duration-300 group cursor-pointer"
                >
                  {/* Left Column - Car Image */}
                  <div className="relative w-full sm:w-2/5 h-48 sm:h-auto min-h-[180px] bg-gray-50 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    {car.isAllStarHost && (
                      <span className="absolute top-4 left-4 bg-turo-purple text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                        All-Star Host
                      </span>
                    )}
                  </div>

                  {/* Right Column - Car Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                        <span className="text-turo-purple">{car.category}</span>
                        <span>•</span>
                        <span>{car.transmission}</span>
                        <span>•</span>
                        <span>{car.fuelType}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-turo-purple transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold mt-1">
                        {car.location}
                      </p>
                      <p className="text-xs text-gray-400 font-medium line-clamp-2 mt-2 leading-relaxed">
                        {car.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-amber-500 font-bold text-xs gap-0.5">
                          <Star className="size-3.5 fill-current" />
                          <span>{car.rating.toFixed(2)}</span>
                        </div>
                        <span className="text-[11px] text-gray-400">
                          ({car.tripsCount} trips)
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black text-gray-900">
                          ${car.pricePerDay}
                        </span>
                        <span className="text-xs font-normal text-gray-500"> /day</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-turo-gray rounded-3xl border border-dashed border-gray-300">
              <Compass className="size-12 text-gray-400 mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">No cars found</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2 leading-relaxed">
                We couldn&apos;t find any vehicles matching your active filters. Try expanding your price limit or clearing category choices.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 bg-turo-purple hover:bg-turo-hover text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Right column: Sticky Map Placeholder */}
        {showMap && (
          <div className="hidden lg:block w-5/12 sticky top-48 h-[calc(100vh-14rem)] bg-turo-gray border border-gray-200 rounded-3xl overflow-hidden shadow-inner">
            {/* Mock map graphic styling */}
            <div className="absolute inset-0 bg-blue-50/40 relative">
              {/* Fake road paths */}
              <div className="absolute inset-x-0 top-1/4 h-8 bg-white border-y border-gray-200/50 transform -rotate-6"></div>
              <div className="absolute inset-y-0 left-1/3 w-8 bg-white border-x border-gray-200/50 transform rotate-12"></div>
              <div className="absolute top-1/2 left-1/4 size-64 rounded-full border border-green-200/50 bg-green-50/20"></div>

              {/* Pin overlays with daily prices */}
              {filteredCars.slice(0, 5).map((car, index) => {
                const positions = [
                  { top: "25%", left: "45%" },
                  { top: "45%", left: "20%" },
                  { top: "60%", left: "60%" },
                  { top: "35%", left: "70%" },
                  { top: "75%", left: "35%" },
                ];
                return (
                  <div
                    key={car.id}
                    className="absolute z-10 transition-transform hover:scale-110 cursor-pointer shadow-md bg-white border border-turo-purple px-2 py-1 rounded-full text-xs font-black text-gray-900 flex items-center gap-0.5"
                    style={positions[index % positions.length]}
                  >
                    <Star className="size-2.5 fill-amber-500 text-amber-500" />
                    ${car.pricePerDay}
                  </div>
                );
              })}

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 text-left">
                <span className="text-[10px] font-black text-turo-purple uppercase tracking-wider">
                  Interactive Map View
                </span>
                <h4 className="font-bold text-sm text-gray-900 mt-1">
                  Melbourne Rental Zones
                </h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Pins show general neighborhood hubs. Click any pin to zoom or select specific pick-up locations.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function Theme4SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-turo-purple font-bold">Searching Phillips P2P...</div>}>
      <Theme4SearchPageContent />
    </Suspense>
  );
}
