"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { 
  User, Bell, Globe, Search, Settings, HelpCircle, LogIn, Check, 
  ChevronDown, Heart, Phone, MapPin, Trash2, X, Star 
} from "lucide-react";

import { AuthPanel } from "@/components/portal/auth-panel";
import { useAuth } from "@/components/portal/auth-provider";
import { turoCars } from "@/lib/theme4-data";

export function PortalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === "/" || pathname === "/theme4" || pathname === "/theme4/";
  const { user, profile, isLoading, logout } = useAuth();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [shortlist, setShortlist] = useState<string[]>([]);

  // Load and sync shortlist state
  useEffect(() => {
    const saved = localStorage.getItem("shortlisted_cars");
    if (saved) {
      try {
        setShortlist(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    const handleUpdate = () => {
      const current = localStorage.getItem("shortlisted_cars");
      if (current) {
        try {
          setShortlist(JSON.parse(current));
        } catch (e) {
          console.error(e);
        }
      } else {
        setShortlist([]);
      }
    };

    window.addEventListener("shortlistUpdated", handleUpdate);
    return () => window.removeEventListener("shortlistUpdated", handleUpdate);
  }, []);

  const toggleShortlist = (carId: string) => {
    let updated = [...shortlist];
    if (updated.includes(carId)) {
      updated = updated.filter((id) => id !== carId);
    } else {
      updated.push(carId);
    }
    setShortlist(updated);
    localStorage.setItem("shortlisted_cars", JSON.stringify(updated));
    window.dispatchEvent(new Event("shortlistUpdated"));
  };

  const isShortlisted = (carId: string) => shortlist.includes(carId);

  const shortlistedCars = useMemo(() => {
    return turoCars.filter((c) => shortlist.includes(c.id));
  }, [shortlist]);

  // Helper to update a URL search query parameter and redirect to search page
  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Ensure default mode and location are set if not present
    if (!params.has("mode")) {
      params.set("mode", "rent");
    }
    if (!params.has("location")) {
      params.set("location", "Melbourne, VIC");
    }
    // Clear conflicting search parameters
    if (key === "make" || key === "category" || key === "query") {
      params.delete("year");
      params.delete("bodyType");
      params.delete("odometer");
      params.delete("fuel");
      params.delete("transmission");
    }
    
    setActiveDropdown(null);
    router.push(`/search?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      updateQueryParam("query", searchVal.trim());
    }
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white text-turo-dark flex flex-col font-sans antialiased">
      {/* Sticky Two-Tier Custom Header */}
      <header className="z-50 bg-[#300754] text-white sticky top-0 shadow-lg select-none">
        {/* Row 1: Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 relative">
          
          {/* Left section: Logo & Location */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-tr from-[#FF3366] to-[#FF6633] text-white size-8.5 rounded-xl flex items-center justify-center font-black shadow-md shadow-red-500/10 group-hover:scale-105 transition-transform duration-300">
                P
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-black tracking-wider uppercase text-white">
                  PHILLIPS
                </span>
                <span className="text-[9px] font-semibold text-white/50 uppercase tracking-widest mt-0.5">
                  Car Rental
                </span>
              </div>
            </Link>

            {/* City Selector */}
            <div className="relative nav-dropdown-container">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "location" ? null : "location")}
                className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 rounded-full px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer text-white transition-all shadow-sm"
              >
                <MapPin className="size-3.5 text-white/80" />
                <span>{searchParams.get("location") || "Melbourne"}</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "location" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "location" && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-48 z-[60] text-left animate-in fade-in duration-200">
                  <span className="block px-4 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    Select Suburb
                  </span>
                  {["Melbourne CBD", "Keysborough", "St Kilda", "South Melbourne"].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => updateQueryParam("location", loc)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer"
                    >
                      {loc}
                      {(searchParams.get("location") === loc || (loc === "Melbourne CBD" && !searchParams.get("location"))) && (
                        <Check className="size-3.5 text-turo-purple" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Section: Search Bar */}
          <div className="relative w-64 lg:w-96 hidden md:block shrink">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search by brand, fuel or description..."
                className="w-full bg-[#1e0134] text-white placeholder-white/35 border border-white/10 focus:border-[#FF3366]/40 focus:ring-1 focus:ring-[#FF3366]/40 rounded-full pl-10 pr-4 py-2 text-xs font-semibold outline-none transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 size-4" />
            </form>
          </div>

          {/* Right Section: Dropdowns, Shortlist, Profile, Helpline */}
          <div className="flex items-center gap-5 sm:gap-6 shrink-0 relative">
            
            {/* Buy Car Dropdown */}
            <div className="relative nav-dropdown-container hidden lg:block">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "buy" ? null : "buy")}
                className="text-xs font-bold text-white/80 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                Buy car
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "buy" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "buy" && (
                <div className="absolute top-full left-0 mt-2.5 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-48 z-[60] text-left animate-in fade-in duration-200">
                  <button
                    onClick={() => updateQueryParam("mode", "rent")}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                  >
                    Rent a Car
                  </button>
                  <button
                    onClick={() => updateQueryParam("mode", "rto")}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                  >
                    Rent to Own
                  </button>
                  <button
                    onClick={() => updateQueryParam("mode", "sale")}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                  >
                    Buy Direct Sale
                  </button>
                </div>
              )}
            </div>

            {/* Sell Car Dropdown */}
            <div className="relative nav-dropdown-container hidden lg:block">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "sell" ? null : "sell")}
                className="text-xs font-bold text-white/80 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                Sell car
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "sell" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "sell" && (
                <div className="absolute top-full left-0 mt-2.5 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-48 z-[60] text-left animate-in fade-in duration-200">
                  <Link
                    href="/?tab=sell"
                    onClick={() => setActiveDropdown(null)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    Sell your Car (Cash)
                  </Link>
                  <Link
                    href="/?tab=rto"
                    onClick={() => setActiveDropdown(null)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    List Rent to Own
                  </Link>
                  <Link
                    href="/?tab=rent"
                    onClick={() => setActiveDropdown(null)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    Lend your Car (Rent)
                  </Link>
                </div>
              )}
            </div>

            {/* More Dropdown */}
            <div className="relative nav-dropdown-container hidden lg:block">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "more" ? null : "more")}
                className="text-xs font-bold text-white/80 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                More
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "more" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "more" && (
                <div className="absolute top-full left-0 mt-2.5 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-48 z-[60] text-left animate-in fade-in duration-200">
                  <Link
                    href="/policies/terms"
                    onClick={() => setActiveDropdown(null)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    Policies & Terms
                  </Link>
                  <a
                    href="mailto:booking@phillipscarrental.com.au"
                    onClick={() => setActiveDropdown(null)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    Help & Support
                  </a>
                </div>
              )}
            </div>

            {/* Shortlist heart button */}
            <div className="relative nav-dropdown-container">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "shortlisted" ? null : "shortlisted")}
                className="flex flex-col items-center justify-center text-white/85 hover:text-white cursor-pointer relative gap-1 p-1 min-w-[50px]"
                aria-label="Shortlisted"
              >
                <div className="relative">
                  <Heart className={`size-5 text-white ${shortlist.length > 0 ? "fill-white" : ""}`} />
                  {shortlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-black rounded-full size-3.5 flex items-center justify-center ring-1 ring-[#300754]">
                      {shortlist.length}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-white/60">Shortlisted</span>
              </button>

              {activeDropdown === "shortlisted" && (
                <div className="absolute right-0 mt-2.5 w-80 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-3 z-[60] text-left animate-in fade-in duration-200">
                  <div className="px-4 pb-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-black text-xs text-gray-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <Heart className="size-4 fill-red-500 text-red-500 border-none" />
                      Shortlisted Cars
                    </span>
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                      {shortlist.length} items
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto mt-1">
                    {shortlistedCars.length === 0 ? (
                      <div className="px-4 py-8 text-center text-xs font-bold text-gray-400">
                        No shortlisted cars yet
                      </div>
                    ) : (
                      shortlistedCars.map((car) => (
                        <div key={car.id} className="px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 flex gap-3 items-center group/item relative">
                          <Link 
                            href={`/car/${car.id}`}
                            onClick={() => setActiveDropdown(null)}
                            className="flex gap-3 items-center flex-1 min-w-0"
                          >
                            <div className="size-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                              <img src={car.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-black text-gray-900 truncate group-hover/item:text-turo-purple transition-colors">
                                {car.name}
                              </p>
                              <p className="text-[10px] text-gray-400 font-bold mt-0.5">
                                ${car.pricePerDay}/day • {car.transmission}
                              </p>
                            </div>
                          </Link>
                          <button
                            onClick={() => toggleShortlist(car.id)}
                            className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Remove from shortlist"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Account button */}
            <div className="relative nav-dropdown-container">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "account" ? null : "account")}
                className="flex flex-col items-center justify-center text-white/85 hover:text-white cursor-pointer gap-1 p-1 min-w-[50px]"
                aria-label="Account"
              >
                <div className="relative flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 rounded-full size-6.5">
                  <User className="size-4 text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-white/60">Account</span>
              </button>

              {activeDropdown === "account" && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 z-50 text-left animate-in fade-in duration-200">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-black text-gray-900">
                      {isLoading ? "Checking session..." : profile?.full_name || profile?.email || "Guest"}
                    </p>
                    <p className="text-[10px] text-gray-400 font-semibold truncate">
                      {profile?.email || "Log in to list and enquire"}
                    </p>
                  </div>
                  {user ? (
                    <>
                      <Link 
                        href="/search" 
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                      >
                        <Search className="size-4 text-gray-400" />
                        Book a Car
                      </Link>
                      <Link 
                        href="/account"
                        onClick={() => setActiveDropdown(null)}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 text-left transition-colors"
                      >
                        <Settings className="size-4 text-gray-400" />
                        Account Dashboard
                      </Link>
                      {profile?.role === "admin" ? (
                        <Link
                          href="/admin"
                          onClick={() => setActiveDropdown(null)}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-turo-purple text-left transition-colors"
                        >
                          <Settings className="size-4" />
                          Admin Panel
                        </Link>
                      ) : null}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsAuthOpen(true);
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-turo-purple text-left transition-colors cursor-pointer"
                    >
                      <LogIn className="size-4" />
                      Log in or register
                    </button>
                  )}
                  <a 
                    href="mailto:booking@phillipscarrental.com.au"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    <HelpCircle className="size-4 text-gray-400" />
                    Help & Support
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  {user ? (
                    <button 
                      onClick={async () => {
                        await logout();
                        setActiveDropdown(null);
                        router.refresh();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-red-500 text-left transition-colors cursor-pointer"
                    >
                      <LogIn className="size-4" />
                      Log out
                    </button>
                  ) : null}
                </div>
              )}
            </div>

            {/* Helpline contact info */}
            <a 
              href="tel:1300315275"
              className="text-xs font-extrabold text-white/95 hover:text-white transition-colors border-l border-white/15 pl-5 h-7 flex items-center gap-2 hidden xl:flex cursor-pointer"
              title="Call us"
            >
              <Phone className="size-3.5 text-[#FF3366]" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Call us at</span>
                <span className="text-xs font-black mt-0.5">1300 315 275</span>
              </div>
            </a>

          </div>
        </div>

        {/* Row 2: Sub-Navbar Explore Filters */}
        <div className="bg-[#3f1163] border-t border-[#300754]/30 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-hide py-1">
            <span className="text-[10px] font-black text-white/45 uppercase tracking-widest shrink-0 mr-1 sm:mr-3">
              Explore By
            </span>

            {/* Filter 1: Price Range */}
            <div className="relative nav-dropdown-container shrink-0">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "price" ? null : "price")}
                className="text-[11px] font-bold text-white/90 bg-[#300754]/35 hover:bg-[#300754]/75 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <span>Price Range</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "price" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "price" && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-56 z-[60] text-left animate-in fade-in duration-150">
                  <span className="block px-4 py-1 text-[9px] font-black text-gray-400 uppercase tracking-wider">Hourly/Daily Budget</span>
                  {[
                    { label: "< $50 / day", val: "50" },
                    { label: "$50 - $100 / day", val: "100" },
                    { label: "$100 - $200 / day", val: "200" },
                    { label: "$200+ / day", val: "500" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => updateQueryParam("price", item.val)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 my-1"></div>
                  <span className="block px-4 py-1 text-[9px] font-black text-gray-400 uppercase tracking-wider">Rent to Own Budget</span>
                  {[
                    { label: "< $1,000 / month", val: "1000" },
                    { label: "$1,000 - $2,000 / month", val: "2000" },
                    { label: "$2,000+ / month", val: "9999" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("mode", "rto");
                        params.set("price", item.val);
                        setActiveDropdown(null);
                        router.push(`/search?${params.toString()}`);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 2: Make and Model */}
            <div className="relative nav-dropdown-container shrink-0">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "make" ? null : "make")}
                className="text-[11px] font-bold text-white/90 bg-[#300754]/35 hover:bg-[#300754]/75 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <span>Make & Model</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "make" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "make" && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-44 z-[60] text-left animate-in fade-in duration-150">
                  <span className="block px-4 py-1.5 text-[9px] font-black text-gray-400 uppercase tracking-wider">Popular Brands</span>
                  {["Tesla", "Porsche", "BMW", "Jeep", "Mustang", "Mercedes"].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => updateQueryParam("make", brand)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 3: Year */}
            <div className="relative nav-dropdown-container shrink-0">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "year" ? null : "year")}
                className="text-[11px] font-bold text-white/90 bg-[#300754]/35 hover:bg-[#300754]/75 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <span>Year</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "year" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "year" && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-36 z-[60] text-left animate-in fade-in duration-150">
                  {["2024", "2023", "2022", "2021"].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => updateQueryParam("year", yr)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 4: Fuel */}
            <div className="relative nav-dropdown-container shrink-0">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "fuel" ? null : "fuel")}
                className="text-[11px] font-bold text-white/90 bg-[#300754]/35 hover:bg-[#300754]/75 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <span>Fuel</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "fuel" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "fuel" && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-40 z-[60] text-left animate-in fade-in duration-150">
                  {["Electric", "Petrol", "Hybrid", "LPG"].map((f) => (
                    <button
                      key={f}
                      onClick={() => updateQueryParam("fuel", f)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 5: KM Driven */}
            <div className="relative nav-dropdown-container shrink-0">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "km" ? null : "km")}
                className="text-[11px] font-bold text-white/90 bg-[#300754]/35 hover:bg-[#300754]/75 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <span>KM Driven</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "km" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "km" && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-48 z-[60] text-left animate-in fade-in duration-150">
                  {["< 20,000", "20,000 - 50,000", "> 50,000"].map((odo) => (
                    <button
                      key={odo}
                      onClick={() => updateQueryParam("odometer", odo)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                    >
                      {odo} km
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 6: Body Type */}
            <div className="relative nav-dropdown-container shrink-0">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "body" ? null : "body")}
                className="text-[11px] font-bold text-white/90 bg-[#300754]/35 hover:bg-[#300754]/75 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <span>Body Type</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "body" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "body" && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-40 z-[60] text-left animate-in fade-in duration-150">
                  {["Sedan", "SUV", "Hatchback", "Convertible"].map((b) => (
                    <button
                      key={b}
                      onClick={() => updateQueryParam("bodyType", b)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 7: Transmission */}
            <div className="relative nav-dropdown-container shrink-0">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "transmission" ? null : "transmission")}
                className="text-[11px] font-bold text-white/90 bg-[#300754]/35 hover:bg-[#300754]/75 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <span>Transmission</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === "transmission" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "transmission" && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-xl py-2 w-40 z-[60] text-left animate-in fade-in duration-150">
                  {["Automatic", "Manual"].map((t) => (
                    <button
                      key={t}
                      onClick={() => updateQueryParam("transmission", t)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Filters button */}
            {(searchParams.get("make") || searchParams.get("category") || searchParams.get("fuel") || searchParams.get("transmission") || searchParams.get("year") || searchParams.get("bodyType") || searchParams.get("odometer") || searchParams.get("price") || searchParams.get("query")) && (
              <button 
                onClick={() => {
                  setActiveDropdown(null);
                  router.push(`/search?mode=${searchParams.get("mode") || "rent"}&location=${encodeURIComponent(searchParams.get("location") || "Melbourne, VIC")}`);
                }}
                className="text-[10px] font-extrabold text-[#FF3366] hover:underline uppercase tracking-wider cursor-pointer ml-auto shrink-0"
              >
                Reset Filters
              </button>
            )}

          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Turo-style Footer */}
      <footer className="bg-turo-gray border-t border-gray-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Phillips Car Rental
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">About Phillips Car Rental</Link></li>
              <li><Link href="/" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">How it works (Renting)</Link></li>
              <li><Link href="/?tab=rto" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">How it works (Rent to Own)</Link></li>
              <li><Link href="/policies/terms" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Policies & Trust</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/search" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Find a Car</Link></li>
              <li><Link href="/search?category=Electric" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Electric Vehicles</Link></li>
              <li><Link href="/search?category=Sport" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Sports & Exotic</Link></li>
              <li><Link href="/search?category=SUV" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">SUVs & Trucks</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Hosting
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/?tab=sell" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Sell your car</Link></li>
              <li><Link href="/?tab=rto" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Rent to own</Link></li>
              <li><Link href="/search" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Browse cars</Link></li>
              <li><Link href="/account" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Account</Link></li>
              <li><Link href="/policies/terms" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Insurance disclaimers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="font-semibold text-gray-800">Phillips Car Rental</li>
              <li>132 Indian Dr, Keysborough</li>
              <li>Melbourne VIC 3173</li>
              <li>Tel: 1300 315 275</li>
              <li>Email: booking@phillipscarrental.com.au</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Phillips Car Rental. Melbourne peer-to-peer marketplace.
          </p>
          <div className="flex gap-6">
            <Link href="/policies/terms" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Terms of Service</Link>
            <a href="#" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

      {isAuthOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <button
              type="button"
              onClick={() => setIsAuthOpen(false)}
              className="mb-3 ml-auto block rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white"
            >
              Close
            </button>
            <AuthPanel onAuthenticated={() => setIsAuthOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PortalShell;
