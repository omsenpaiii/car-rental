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
  const initMode = searchParams.get("mode") || "rent";

  // Filter States
  const [location, setLocation] = useState(initLocation);
  const [pickupDate, setPickupDate] = useState(initPickup);
  const [returnDate, setReturnDate] = useState(initReturn);
  const [searchMode, setSearchMode] = useState<"rent" | "rto">(initMode === "rto" ? "rto" : "rent");

  // Active filters
  const [sortBy, setSortBy] = useState<"relevance" | "priceLow" | "priceHigh" | "rating">("relevance");
  const [selectedCategory, setSelectedCategory] = useState<string>(initCategory);
  const [maxPrice, setMaxPrice] = useState<number>(initMode === "rto" ? 2500 : 300);
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  const [showMap, setShowMap] = useState<boolean>(true);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [hoveredCarId, setHoveredCarId] = useState<string | null>(null);

  // Sync state with URL params on load
  useEffect(() => {
    if (initCategory) setSelectedCategory(initCategory);
  }, [initCategory]);

  useEffect(() => {
    if (initMode === "rto") {
      setSearchMode("rto");
      setMaxPrice(2500);
    } else {
      setSearchMode("rent");
      setMaxPrice(300);
    }
  }, [initMode]);

  // Handle Location/Date Search Bar submit
  const handleSearchBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/theme4/search?mode=${searchMode}&location=${encodeURIComponent(location)}&pickup=${pickupDate}&return=${returnDate}`
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategory("");
    setMaxPrice(searchMode === "rto" ? 2500 : 300);
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

    // Filter by Rent-to-Own mode
    if (searchMode === "rto") {
      result = result.filter((car) => car.rentToOwnAvailable);
    }

    // Filter by Max Price
    if (searchMode === "rto") {
      result = result.filter((car) => {
        const monthlyRto = Math.round((car.rentToOwnPrice! - car.downPayment!) / car.rentToOwnMonths! * 1.25);
        return monthlyRto <= maxPrice;
      });
    } else {
      result = result.filter((car) => car.pricePerDay <= maxPrice);
    }

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
      if (searchMode === "rto") {
        result.sort((a, b) => {
          const priceA = Math.round((a.rentToOwnPrice! - a.downPayment!) / a.rentToOwnMonths! * 1.25);
          const priceB = Math.round((b.rentToOwnPrice! - b.downPayment!) / b.rentToOwnMonths! * 1.25);
          return priceA - priceB;
        });
      } else {
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
      }
    } else if (sortBy === "priceHigh") {
      if (searchMode === "rto") {
        result.sort((a, b) => {
          const priceA = Math.round((a.rentToOwnPrice! - a.downPayment!) / a.rentToOwnMonths! * 1.25);
          const priceB = Math.round((b.rentToOwnPrice! - b.downPayment!) / b.rentToOwnMonths! * 1.25);
          return priceB - priceA;
        });
      } else {
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
      }
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [initMake, selectedCategory, searchMode, maxPrice, selectedTransmission, selectedFuelType, sortBy]);

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
          
          {/* Rent vs Rent-to-Own Tab Switcher */}
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-6 w-full sm:w-fit border border-gray-200/50">
            <button
              onClick={() => {
                setSearchMode("rent");
                setMaxPrice(300);
              }}
              className={`flex-1 sm:flex-initial text-center px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                searchMode === "rent"
                  ? "bg-white text-gray-950 shadow-sm border border-gray-200/30"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Rent standard ($/day)
            </button>
            <button
              onClick={() => {
                setSearchMode("rto");
                setMaxPrice(2500);
              }}
              className={`flex-1 sm:flex-initial text-center px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                searchMode === "rto"
                  ? "bg-turo-purple text-white shadow-sm"
                  : "text-gray-500 hover:text-turo-purple"
              }`}
            >
              Rent to Own ($/month)
            </button>
          </div>

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
                <span>Max: ${maxPrice.toLocaleString()}/{searchMode === "rto" ? "mo" : "day"}</span>
                <input
                  type="range"
                  min={searchMode === "rto" ? 500 : 50}
                  max={searchMode === "rto" ? 5000 : 500}
                  step={searchMode === "rto" ? 100 : 10}
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
              {(selectedCategory || (searchMode === "rent" ? maxPrice < 300 : maxPrice < 2500) || selectedTransmission || selectedFuelType || sortBy !== "relevance") && (
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

          {/* More Filters Panel (Interactive Pill Buttons) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5 bg-turo-gray rounded-3xl mb-8 border border-gray-100 items-center">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Transmission
              </label>
              <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-gray-200">
                {["", "Automatic", "Manual"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTransmission(t)}
                    className={`flex-1 text-center py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedTransmission === t
                        ? "bg-turo-purple text-white shadow-sm"
                        : "text-gray-600 hover:text-turo-purple hover:bg-gray-50"
                    }`}
                  >
                    {t || "Any"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Fuel Type
              </label>
              <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto scrollbar-hide">
                {["", "Electric", "Petrol", "Hybrid"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFuelType(f)}
                    className={`flex-1 text-center py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedFuelType === f
                        ? "bg-turo-purple text-white shadow-sm"
                        : "text-gray-600 hover:text-turo-purple hover:bg-gray-50"
                    }`}
                  >
                    {f || "Any"}
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 flex items-center justify-between sm:justify-end gap-4 self-end h-full pt-4 sm:pt-0">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Active Match Count
              </span>
              <span className="bg-turo-purple/10 text-turo-purple text-xs font-black px-3 py-1.5 rounded-full border border-turo-purple/10">
                {filteredCars.length} Cars Available
              </span>
            </div>
          </div>

          {/* Search Listings Grid */}
          {filteredCars.length > 0 ? (
            <div className="space-y-6">
              {filteredCars.map((car) => {
                const monthlyRto = car.rentToOwnAvailable
                  ? Math.round((car.rentToOwnPrice! - car.downPayment!) / car.rentToOwnMonths! * 1.25)
                  : 0;

                return (
                  <Link
                    key={car.id}
                    href={`/theme4/car/${car.id}${searchMode === "rto" ? "?mode=rto" : ""}`}
                    onMouseEnter={() => setHoveredCarId(car.id)}
                    onMouseLeave={() => setHoveredCarId(null)}
                    className={`flex flex-col sm:flex-row border rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer ${
                      hoveredCarId === car.id || selectedCarId === car.id
                        ? "border-turo-purple ring-2 ring-turo-purple/10 scale-[1.01]"
                        : "border-gray-200"
                    }`}
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
                      {searchMode === "rto" && (
                        <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                          Rent to Own
                        </span>
                      )}
                    </div>

                    {/* Right Column - Car Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                          <span className="text-turo-purple">{car.category}</span>
                          <span>•</span>
                          <span>{car.transmission}</span>
                          <span>•</span>
                          <span>{car.fuelType}</span>
                          {searchMode === "rto" && car.rentToOwnMonths && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded text-[9px]">
                                {car.rentToOwnMonths} mo term
                              </span>
                            </>
                          )}
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
                          {searchMode === "rto" ? (
                            <>
                              <span className="text-xl font-black text-emerald-600">
                                ${monthlyRto.toLocaleString()}
                              </span>
                              <span className="text-xs font-normal text-gray-500"> /mo</span>
                              <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                                Down: ${car.downPayment?.toLocaleString()}
                              </div>
                            </>
                          ) : (
                            <>
                              <span className="text-xl font-black text-gray-900">
                                ${car.pricePerDay}
                              </span>
                              <span className="text-xs font-normal text-gray-500"> /day</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
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
                const isHovered = hoveredCarId === car.id;
                const isSelected = selectedCarId === car.id;
                
                const price = searchMode === "rto"
                  ? Math.round((car.rentToOwnPrice! - car.downPayment!) / car.rentToOwnMonths! * 1.25)
                  : car.pricePerDay;

                return (
                  <button
                    key={car.id}
                    type="button"
                    onClick={() => setSelectedCarId(isSelected ? null : car.id)}
                    className={`absolute z-10 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-md px-2.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1 ${
                      isHovered || isSelected 
                        ? "bg-turo-purple text-white scale-110 border-2 border-white ring-2 ring-turo-purple" 
                        : "bg-white text-gray-900 border border-turo-purple"
                    }`}
                    style={positions[index % positions.length]}
                  >
                    <Star className={`size-3 ${isHovered || isSelected ? "fill-white text-white" : "fill-amber-500 text-amber-500"}`} />
                    ${price.toLocaleString()}{searchMode === "rto" ? "/mo" : ""}
                  </button>
                );
              })}

              {selectedCarId ? (() => {
                const selectedCar = filteredCars.find(c => c.id === selectedCarId);
                if (!selectedCar) return null;
                const monthlyPrice = selectedCar.rentToOwnAvailable
                  ? Math.round((selectedCar.rentToOwnPrice! - selectedCar.downPayment!) / selectedCar.rentToOwnMonths! * 1.25)
                  : 0;

                return (
                  <div className="absolute bottom-6 left-6 right-6 bg-white p-3.5 rounded-2xl shadow-2xl border border-gray-100 text-left flex gap-3 animate-in slide-in-from-bottom-3 duration-300 z-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={selectedCar.image} 
                      alt={selectedCar.name} 
                      className="size-16 rounded-xl object-cover shrink-0 bg-gray-50 border border-gray-100"
                    />
                    <div className="flex-1 min-w-0 relative">
                      <button 
                        onClick={() => setSelectedCarId(null)}
                        className="absolute -top-1.5 right-0 text-gray-400 hover:text-gray-700 font-bold text-xs p-1"
                      >
                        ✕
                      </button>
                      <h4 className="font-bold text-xs text-gray-950 truncate pr-5 mt-0.5">
                        {selectedCar.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1 text-[9px] font-bold text-gray-400 uppercase">
                        <span className="text-turo-purple">{selectedCar.category}</span>
                        <span>•</span>
                        <span>{selectedCar.transmission}</span>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center text-amber-500 font-bold text-[10px] gap-0.5">
                          <Star className="size-3 fill-current" />
                          <span>{selectedCar.rating.toFixed(2)}</span>
                        </div>
                        <Link 
                          href={`/theme4/car/${selectedCar.id}${searchMode === "rto" ? "?mode=rto" : ""}`}
                          className="bg-turo-purple hover:bg-turo-hover text-white text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                        >
                          View Details ({searchMode === "rto" ? `$${monthlyPrice.toLocaleString()}/mo` : `$${selectedCar.pricePerDay}/day`})
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })() : (
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
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function Theme4SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-turo-purple font-bold">Searching Phillip Cars...</div>}>
      <Theme4SearchPageContent />
    </Suspense>
  );
}
