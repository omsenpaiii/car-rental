"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calendar, Clock, MapPin, Compass, DollarSign, 
  ShieldCheck, HelpCircle, Star, Sparkles, Plus, AlertCircle, Info, ChevronDown 
} from "lucide-react";
import { makeCategories, turoCars, hostFaqs, renterFaqs, TuroCar } from "@/lib/theme4-data";

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

function Theme4HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  
  // Set tab based on URL parameter or default to "rent"
  const [activeTab, setActiveTab] = useState<"rent" | "rto" | "lent">("rent");
  const [cars, setCars] = useState<TuroCar[]>(turoCars);
  const [openRenterFaq, setOpenRenterFaq] = useState<number | null>(null);
  const [openHostFaq, setOpenHostFaq] = useState<number | null>(null);

  // RTO Calculator State
  const [rtoCalcValue, setRtoCalcValue] = useState(40000);
  const [rtoCalcMonths, setRtoCalcMonths] = useState(24);
  
  useEffect(() => {
    if (tabParam === "lent") {
      setActiveTab("lent");
    } else if (tabParam === "rto") {
      setActiveTab("rto");
    } else {
      setActiveTab("rent");
    }
  }, [tabParam]);

  const handleTabChange = (tab: "rent" | "rto" | "lent") => {
    setActiveTab(tab);
    router.push(`/theme4?tab=${tab}`, { scroll: false });
  };

  // Rent Search State
  const [searchLocation, setSearchLocation] = useState("Melbourne, VIC");
  const [pickupDate, setPickupDate] = useState("2026-06-15");
  const [returnDate, setReturnDate] = useState("2026-06-18");

  // Lent Calculator State
  const [carValue, setCarValue] = useState(45000); // Car value in AUD
  const [daysPerMonth, setDaysPerMonth] = useState(12);
  const projectedEarnings = Math.round((carValue * 0.002) * daysPerMonth * 12);

  // Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/theme4/search?location=${encodeURIComponent(searchLocation)}&pickup=${pickupDate}&return=${returnDate}`
    );
  };

  const handleRtoSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/theme4/search?mode=rto&location=${encodeURIComponent(searchLocation)}&pickup=${pickupDate}&return=${returnDate}`
    );
  };

  // Add a Car Mock Form Modal State
  const [isLendModalOpen, setIsLendModalOpen] = useState(false);
  const [lendStep, setLendStep] = useState(1);
  const [newLendCar, setNewLendCar] = useState({
    make: "",
    model: "",
    year: "2023",
    price: "80",
    location: "Melbourne, VIC",
    enableRentToOwn: false,
    rentToOwnPrice: "35000",
    rentToOwnMonths: "24",
  });

  const renderSwitcher = () => (
    <div className="flex justify-center pb-8 max-w-full px-4 w-full z-20">
      <div className="inline-flex bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 max-w-full overflow-x-auto scrollbar-hide shadow-lg">
        <button
          onClick={() => handleTabChange("rent")}
          className={`px-4 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
            activeTab === "rent"
              ? "bg-turo-purple text-white shadow-md scale-105"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          Rent a Car
        </button>
        <button
          onClick={() => handleTabChange("rto")}
          className={`px-4 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
            activeTab === "rto"
              ? "bg-turo-purple text-white shadow-md scale-105"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          Rent to Own
        </button>
        <button
          onClick={() => handleTabChange("lent")}
          className={`px-4 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
            activeTab === "lent"
              ? "bg-turo-purple text-white shadow-md scale-105"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          Lend your Car
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20">
      <AnimatePresence mode="wait">
        {activeTab === "rent" ? (
          <motion.div
            key="rent-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Rent Hero Section */}
            <section className="relative h-screen min-h-[620px] md:min-h-[720px] lg:h-[100dvh] flex items-center justify-center bg-gray-900 overflow-hidden pt-24 pb-12">
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-50"
                  src="/hero.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75" />
              </div>

              <motion.div 
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto px-4 text-center w-full flex flex-col items-center"
              >
                <motion.div variants={heroItemVariants} className="w-full">
                  {renderSwitcher()}
                </motion.div>

                <motion.h1 variants={heroItemVariants} className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none mb-6">
                  Find the perfect car to <span className="text-turo-light text-turo-purple underline decoration-turo-purple underline-offset-4">rent</span> in Melbourne
                </motion.h1>
                <motion.p variants={heroItemVariants} className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-10">
                  Skip the rental counter. Rent unique cars from local hosts, with custom delivery options.
                </motion.p>

                {/* Turo-style Search Widget */}
                <motion.div variants={heroItemVariants} className="w-full max-w-3xl mx-auto">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="w-full bg-white rounded-3xl md:rounded-full shadow-2xl p-4 md:py-2 md:px-3 flex flex-col md:flex-row items-center gap-3 border border-gray-100"
                  >
                    {/* Location Input */}
                    <div className="flex items-center gap-3 px-4 py-2 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 focus-within:bg-gray-50/80 hover:bg-gray-50/40 rounded-2xl md:rounded-l-full md:rounded-r-none transition-all duration-300">
                      <MapPin className="text-turo-purple size-5 shrink-0" />
                      <div className="text-left w-full">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                          Where
                        </label>
                        <input
                          type="text"
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                          placeholder="City, airport, or hotel"
                          className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Dates Pickers */}
                    <div className="flex items-center gap-3 px-4 py-2 w-full md:w-1/2 focus-within:bg-gray-50/80 hover:bg-gray-50/40 rounded-2xl md:rounded-r-full md:rounded-l-none transition-all duration-300">
                      <Calendar className="text-turo-purple size-5 shrink-0" />
                      <div className="flex gap-4 w-full justify-between">
                        <div className="text-left w-1/2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            From
                          </label>
                          <input
                            type="date"
                            value={pickupDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent cursor-pointer focus:text-turo-purple transition-colors"
                          />
                        </div>
                        <div className="h-8 w-px bg-gray-200 self-center hidden sm:block"></div>
                        <div className="text-left w-1/2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Until
                          </label>
                          <input
                            type="date"
                            value={returnDate}
                            min={pickupDate || new Date().toISOString().split('T')[0]}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent cursor-pointer focus:text-turo-purple transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-turo-purple hover:bg-turo-hover text-white font-bold px-8 py-4 md:py-3.5 rounded-2xl md:rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-turo-purple/20 cursor-pointer"
                    >
                      <Search className="size-4" />
                      Search Cars
                    </button>
                  </form>
                </motion.div>
              </motion.div>

              {/* Scroll Down Indicator */}
              <div 
                onClick={() => {
                  document.getElementById("browse-brands-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <span className="text-[10px] font-black text-white/50 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                  Scroll to explore
                </span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="p-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-white/45 group-hover:bg-white/10 transition-colors duration-300"
                >
                  <ChevronDown className="size-4 text-white" />
                </motion.div>
              </div>
            </section>

            {/* Browse by Category (Turo Brand Carousel) */}
            <section id="browse-brands-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                  Browse by brand
                </h2>
                <p className="text-sm font-medium text-gray-500 mb-8">
                  Drive your dream car. Filter by popular makes in Melbourne.
                </p>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08 }
                    }
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-1"
                >
                  {makeCategories.map((make) => (
                    <motion.div
                      key={make.name}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 20 },
                        show: { opacity: 1, scale: 1, y: 0 }
                      }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                      <Link
                        href={`/theme4/search?make=${make.name}`}
                        className="flex flex-col items-center gap-3 shrink-0 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-turo-purple/30 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="size-20 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={make.logo}
                            alt={make.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-800 group-hover:text-turo-purple transition-colors">
                          {make.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* Featured marketplace cars */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                      Find the perfect match
                    </h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                      Explore highly rated cars shared by Phillip Cars hosts.
                    </p>
                  </div>
                  <Link
                    href="/theme4/search"
                    className="text-sm font-bold text-turo-purple hover:underline"
                  >
                    View all cars →
                  </Link>
                </div>
  
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <Link
                        href={`/theme4/car/${car.id}`}
                        className="flex flex-col h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      >
                        {/* Car Image container */}
                        <div className="relative h-48 sm:h-52 bg-gray-50 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {car.isAllStarHost && (
                            <span className="absolute top-4 left-4 bg-turo-purple text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                              All-Star Host
                            </span>
                          )}
                          <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1 rounded-lg shadow-sm">
                            ${car.pricePerDay} <span className="text-xs font-normal text-gray-500">/day</span>
                          </span>
                        </div>
    
                        {/* Car details */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                              <span className="font-semibold px-2 py-0.5 bg-gray-100 rounded-md">
                                {car.category}
                              </span>
                              <span>•</span>
                              <span>{car.transmission}</span>
                              <span>•</span>
                              <span>{car.fuelType}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-turo-purple transition-colors mb-2">
                              {car.name}
                            </h3>
                            <p className="text-xs text-gray-400 font-medium mb-3">
                              {car.location}
                            </p>
                          </div>
    
                          <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-2">
                            <div className="flex items-center text-amber-500 font-bold text-sm gap-0.5">
                              <Star className="size-4 fill-current" />
                              <span>{car.rating.toFixed(2)}</span>
                            </div>
                            <span className="text-xs text-gray-400">
                              ({car.tripsCount} trips)
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Value Proposition */}
            <section className="bg-turo-gray mt-24 py-20 border-y border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-xs font-black text-turo-purple uppercase tracking-widest bg-turo-light px-3 py-1.5 rounded-full">
                  Why Phillip Cars
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-6 mb-16">
                  P2P car sharing, redesigned for people
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    { icon: <Compass className="size-8" />, title: "Endless Choice", desc: "Choose from electric sedans, muscular sports convertibles, clean family SUVs, or rugged 4x4s." },
                    { icon: <ShieldCheck className="size-8" />, title: "Total Safety", desc: "Rent confidently knowing every trip includes comprehensive third-party insurance and 24/7 roadside assist." },
                    { icon: <DollarSign className="size-8" />, title: "Locally Owned", desc: "Skip rental corporation counters. Support local Melbourne car owners and get a more customized experience." }
                  ].map((prop, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="bg-white p-5 rounded-3xl shadow-md text-turo-purple mb-6 border border-gray-100">
                        {prop.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{prop.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                        {prop.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQs for Renters */}
            <section className="max-w-3xl mx-auto px-4 mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-10">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {renterFaqs.map((faq, index) => {
                  const isOpen = openRenterFaq === index;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm overflow-hidden transition-all duration-300"
                    >
                      <button 
                        type="button"
                        onClick={() => setOpenRenterFaq(isOpen ? null : index)}
                        className="w-full text-left font-bold text-gray-900 flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <span className="flex items-center gap-3">
                          <HelpCircle className="text-turo-purple size-5 shrink-0 group-hover:scale-110 transition-transform" />
                          {faq.question}
                        </span>
                        <ChevronDown className={`size-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-turo-purple" : ""}`} />
                      </button>
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                        <p className="text-sm text-gray-600 pl-8 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </motion.div>
        ) : activeTab === "rto" ? (
          <motion.div
            key="rto-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Rent to Own Hero Section */}
            <section className="relative h-screen min-h-[620px] md:min-h-[720px] lg:h-[100dvh] flex items-center justify-center bg-gray-900 overflow-hidden pt-24 pb-12">
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-50"
                  src="/hero.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75" />
              </div>

              <motion.div 
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto px-4 text-center w-full flex flex-col items-center"
              >
                <motion.div variants={heroItemVariants} className="w-full">
                  {renderSwitcher()}
                </motion.div>

                <motion.span variants={heroItemVariants} className="text-xs font-black text-white uppercase tracking-widest bg-turo-purple px-4 py-2 rounded-full shadow-md mb-6">
                  Rent to Own Program
                </motion.span>
                <motion.h1 variants={heroItemVariants} className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none mb-6">
                  Own the car you <span className="text-turo-light text-turo-purple underline decoration-turo-purple underline-offset-4">drive</span>
                </motion.h1>
                <motion.p variants={heroItemVariants} className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-10">
                  Drive your dream car today with flexible monthly payments, 10% downpayment, and guaranteed title transfer upon completion.
                </motion.p>

                {/* Turo-style Search Widget for RTO */}
                <motion.div variants={heroItemVariants} className="w-full max-w-3xl mx-auto">
                  <form
                    onSubmit={handleRtoSearchSubmit}
                    className="bg-white rounded-3xl md:rounded-full shadow-2xl p-4 md:py-2 md:px-3 flex flex-col md:flex-row items-center gap-3 border border-gray-100"
                  >
                    {/* Location Input */}
                    <div className="flex items-center gap-3 px-4 py-2 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 focus-within:bg-gray-50/80 hover:bg-gray-50/40 rounded-2xl md:rounded-l-full md:rounded-r-none transition-all duration-300">
                      <MapPin className="text-turo-purple size-5 shrink-0" />
                      <div className="text-left w-full">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                          Where
                        </label>
                        <input
                          type="text"
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                          placeholder="City, airport, or hotel"
                          className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Dates Pickers */}
                    <div className="flex items-center gap-3 px-4 py-2 w-full md:w-1/2 focus-within:bg-gray-50/80 hover:bg-gray-50/40 rounded-2xl md:rounded-r-full md:rounded-l-none transition-all duration-300">
                      <Calendar className="text-turo-purple size-5 shrink-0" />
                      <div className="flex gap-4 w-full justify-between">
                        <div className="text-left w-1/2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            From
                          </label>
                          <input
                            type="date"
                            value={pickupDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent cursor-pointer focus:text-turo-purple transition-colors"
                          />
                        </div>
                        <div className="h-8 w-px bg-gray-200 self-center hidden sm:block"></div>
                        <div className="text-left w-1/2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Until
                          </label>
                          <input
                            type="date"
                            value={returnDate}
                            min={pickupDate || new Date().toISOString().split('T')[0]}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent cursor-pointer focus:text-turo-purple transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-turo-purple hover:bg-turo-hover text-white font-bold px-8 py-4 md:py-3.5 rounded-2xl md:rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-turo-purple/20 cursor-pointer"
                    >
                      <Search className="size-4" />
                      Find RTO Cars
                    </button>
                  </form>
                </motion.div>
              </motion.div>

              {/* Scroll Down Indicator */}
              <div 
                onClick={() => {
                  document.getElementById("rto-estimator-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <span className="text-[10px] font-black text-white/50 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                  Scroll to explore
                </span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="p-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-white/45 group-hover:bg-white/10 transition-colors duration-300"
                >
                  <ChevronDown className="size-4 text-white" />
                </motion.div>
              </div>
            </section>

            {/* RTO Path to Ownership Estimator */}
            <section id="rto-estimator-section" className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
              <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 sm:p-10 relative -mt-24 z-20">
                <div className="text-center mb-8">
                  <span className="text-xs font-bold text-turo-purple uppercase tracking-wider">
                    Program Estimator
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                    Estimate your monthly payments
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Calculate monthly lease buyout metrics based on target car value and contract duration.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Slider 1: Target Car Buyout Price */}
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                      <span>Target Vehicle Buyout Price</span>
                      <span className="text-turo-purple">${rtoCalcValue.toLocaleString()} AUD</span>
                    </div>
                    <input
                      type="range"
                      min="20000"
                      max="120000"
                      step="5000"
                      value={rtoCalcValue}
                      onChange={(e) => setRtoCalcValue(Number(e.target.value))}
                      className="w-full accent-turo-purple h-2 bg-gray-100 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1.5 uppercase">
                      <span>$20k (Entry Sedan)</span>
                      <span>$70k (Premium EV)</span>
                      <span>$120k (Sports Performance)</span>
                    </div>
                  </div>

                  {/* Slider 2: Duration */}
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                      <span>Option Payout Term</span>
                      <span className="text-turo-purple">{rtoCalcMonths} Months</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[12, 24, 36].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setRtoCalcMonths(m)}
                          className={`py-3 rounded-2xl text-sm font-black border transition-all cursor-pointer ${
                            rtoCalcMonths === m
                              ? "bg-turo-purple border-turo-purple text-white shadow-md"
                              : "bg-white border-gray-200 text-gray-700 hover:border-turo-purple/30"
                          }`}
                        >
                          {m} Months ({m/12} yr)
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculations Details Card */}
                  <div className="bg-turo-gray rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-100">
                    <div className="text-left">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                        Upfront Downpayment (10%)
                      </span>
                      <p className="text-2xl font-black text-gray-900 mt-1">
                        ${Math.round(rtoCalcValue * 0.1).toLocaleString()} <span className="text-xs font-normal text-gray-500">AUD</span>
                      </p>
                    </div>
                    <div className="text-left border-y md:border-y-0 md:border-x border-gray-200 py-4 md:py-0 md:px-6">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                        Monthly Payment (Includes markup)
                      </span>
                      <p className="text-2xl font-black text-turo-purple mt-1">
                        ${Math.round((rtoCalcValue - (rtoCalcValue * 0.1)) / rtoCalcMonths * 1.25).toLocaleString()} <span className="text-xs font-normal text-gray-500">/mo</span>
                      </p>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                        Total Payout Value
                      </span>
                      <p className="text-2xl font-black text-gray-900 mt-1">
                        ${(Math.round(rtoCalcValue * 0.1) + Math.round((rtoCalcValue - (rtoCalcValue * 0.1)) / rtoCalcMonths * 1.25) * rtoCalcMonths).toLocaleString()} <span className="text-xs font-normal text-gray-500">AUD</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RTO Catalog Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    Browse Rent-to-Own vehicles
                  </h2>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    Select a vehicle, pay the downpayment, sign the contract, and start driving toward ownership.
                  </p>
                </div>
                <Link
                  href="/theme4/search?mode=rto"
                  className="text-sm font-bold text-turo-purple hover:underline"
                >
                  View RTO Catalog →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.filter(c => c.rentToOwnAvailable).map((car, index) => {
                  const monthlyRto = Math.round((car.rentToOwnPrice! - car.downPayment!) / car.rentToOwnMonths! * 1.25);
                  return (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <Link
                        href={`/theme4/car/${car.id}?mode=rto`}
                        className="flex flex-col h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      >
                        {/* Image */}
                        <div className="relative h-48 sm:h-52 bg-gray-50 overflow-hidden">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-4 left-4 bg-turo-purple text-white text-[9px] font-black px-2.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                            Rent to Own
                          </span>
                          <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1 rounded-lg shadow-sm">
                            ${monthlyRto} <span className="text-xs font-normal text-gray-500">/month</span>
                          </span>
                        </div>

                        {/* Info */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                              <span className="font-semibold px-2 py-0.5 bg-turo-light text-turo-purple rounded-md">
                                Downpayment: ${car.downPayment}
                              </span>
                              <span>•</span>
                              <span>{car.rentToOwnMonths} mo term</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-turo-purple transition-colors mb-2">
                              {car.name}
                            </h3>
                            <p className="text-xs text-gray-400 font-medium mb-3">
                              {car.location}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center text-amber-500 font-bold text-sm gap-0.5">
                                <Star className="size-4 fill-current" />
                                <span>{car.rating.toFixed(2)}</span>
                              </div>
                              <span className="text-xs text-gray-400">({car.tripsCount} trips)</span>
                            </div>
                            <span className="text-xs font-bold text-turo-purple hover:underline">Calculate Payout →</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="lent-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Lent Hero Section */}
            <section className="relative h-screen min-h-[620px] md:min-h-[720px] lg:h-[100dvh] flex items-center justify-center bg-gray-900 overflow-hidden pt-24 pb-12">
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1800&q=80"
                  alt="Modern garage"
                  className="w-full h-full object-cover opacity-50 filter saturate-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/65" />
              </div>

              <motion.div 
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto px-4 text-center w-full flex flex-col items-center"
              >
                <motion.div variants={heroItemVariants} className="w-full">
                  {renderSwitcher()}
                </motion.div>

                <motion.span variants={heroItemVariants} className="text-xs font-black text-white uppercase tracking-widest bg-turo-purple px-4 py-2 rounded-full shadow-md mb-6">
                  Phillip Cars Host Network
                </motion.span>
                <motion.h1 variants={heroItemVariants} className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none mt-6 mb-6">
                  Let your car work for you
                </motion.h1>
                <motion.p variants={heroItemVariants} className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-10">
                  Lend your vehicle, cover your car payments, and build a scalable car sharing business on Melbourne&apos;s premium P2P platform.
                </motion.p>

                <motion.div variants={heroItemVariants}>
                  <button
                    onClick={() => {
                      setIsLendModalOpen(true);
                      setLendStep(1);
                    }}
                    className="bg-turo-purple hover:bg-turo-hover text-white font-black px-10 py-5 rounded-full transition-colors flex items-center justify-center gap-2 mx-auto shadow-xl shadow-turo-purple/35 cursor-pointer text-base uppercase tracking-wider"
                  >
                    <Plus className="size-5" />
                    List your car now
                  </button>
                </motion.div>
              </motion.div>

              {/* Scroll Down Indicator */}
              <div 
                onClick={() => {
                  document.getElementById("lent-calculator-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <span className="text-[10px] font-black text-white/50 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                  Scroll to explore
                </span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="p-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-white/45 group-hover:bg-white/10 transition-colors duration-300"
                >
                  <ChevronDown className="size-4 text-white" />
                </motion.div>
              </div>
            </section>

            {/* Earnings Calculator */}
            <section id="lent-calculator-section" className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
              <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 sm:p-10 relative -mt-24 z-20">
                <div className="text-center mb-8">
                  <span className="text-xs font-bold text-turo-purple uppercase tracking-wider">
                    Earnings Calculator
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                    How much can you earn?
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Adjust vehicle value and active rental days to project your extra income.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Slider 1: Car Value */}
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                      <span>Vehicle Market Value</span>
                      <span className="text-turo-purple">${carValue.toLocaleString()} AUD</span>
                    </div>
                    <input
                      type="range"
                      min="15000"
                      max="150000"
                      step="5000"
                      value={carValue}
                      onChange={(e) => setCarValue(Number(e.target.value))}
                      className="w-full accent-turo-purple h-2 bg-gray-100 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1.5 uppercase">
                      <span>$15k (Hatchback)</span>
                      <span>$75k (Premium SUV)</span>
                      <span>$150k (Luxury Sport)</span>
                    </div>
                  </div>

                  {/* Slider 2: Rental Days */}
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                      <span>Days Shared Per Month</span>
                      <span className="text-turo-purple">{daysPerMonth} Days</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="30"
                      step="1"
                      value={daysPerMonth}
                      onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                      className="w-full accent-turo-purple h-2 bg-gray-100 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1.5 uppercase">
                      <span>3 Days (Weekend)</span>
                      <span>15 Days (Half month)</span>
                      <span>30 Days (Full time)</span>
                    </div>
                  </div>

                  {/* Projected Output */}
                  <div className="bg-turo-gray rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-100">
                    <div className="text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Projected Annual Earnings
                      </span>
                      <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
                        ${projectedEarnings.toLocaleString()}{" "}
                        <span className="text-sm font-bold text-gray-500">AUD/yr</span>
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 max-w-xs leading-relaxed text-left sm:text-right">
                      *Based on Melbourne historical averages. Renting out standard vehicles at a daily average rate of 0.2% of market value.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How hosting works */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
              <h2 className="text-3xl font-black text-gray-900 text-center mb-16">
                How hosting works in 4 easy steps
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { step: 1, title: "Create your listing", desc: "Provide your car details, snap a few high-quality photos, write a friendly bio, and set calendar availability." },
                  { step: 2, title: "Set your rules", desc: "Adjust daily price guidelines, set mileage limits, choose pickup rules, and approve/reject bookings manually or set Auto-Book." },
                  { step: 3, title: "Check-in and hand keys", desc: "Review renter details, document fuel and vehicle cleanliness photo checks in-app, and hand keys to the verified guest." },
                  { step: 4, title: "Get paid securely", desc: "Earn up to 75% of the trip price. Your earnings are securely deposited directly to your bank account after every booking." }
                ].map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative"
                  >
                    <div className="size-10 rounded-full bg-turo-light text-turo-purple font-black flex items-center justify-center text-lg mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Insurance details */}
            <section className="bg-turo-purple text-white mt-24 py-20">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <ShieldCheck className="size-16 text-white mb-6 mx-auto" />
                <h2 className="text-3xl sm:text-4xl font-black mb-6">
                  You are backed by comprehensive host protection
                </h2>
                <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-10">
                  Every P2P listing at Phillip Cars is backed by $20 Million in comprehensive damage liability coverage, roadside assistance, and renter screening.
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm font-bold uppercase tracking-wider">
                  <span className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                    $20M Liability Cover
                  </span>
                  <span className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                    24/7 Roadside Assist
                  </span>
                  <span className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                    Prequalified Guests
                  </span>
                </div>
              </div>
            </section>

            {/* FAQs for Hosts */}
            <section className="max-w-3xl mx-auto px-4 mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-10">
                Frequently asked host questions
              </h2>
              <div className="space-y-6">
                {hostFaqs.map((faq, index) => {
                  const isOpen = openHostFaq === index;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm overflow-hidden transition-all duration-300"
                    >
                      <button 
                        type="button"
                        onClick={() => setOpenHostFaq(isOpen ? null : index)}
                        className="w-full text-left font-bold text-gray-900 flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <span className="flex items-center gap-3">
                          <HelpCircle className="text-turo-purple size-5 shrink-0 group-hover:scale-110 transition-transform" />
                          {faq.question}
                        </span>
                        <ChevronDown className={`size-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-turo-purple" : ""}`} />
                      </button>
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                        <p className="text-sm text-gray-600 pl-8 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multi-step list car Modal */}
      <AnimatePresence>
        {isLendModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="font-black text-lg text-gray-900">
                    List Your Personal Car
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Step {lendStep} of 3
                  </p>
                </div>
                <button
                  onClick={() => setIsLendModalOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex-1">
                {lendStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 text-sm mb-2">
                      Tell us about your vehicle
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        Car Make (Brand)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tesla, Porsche, Toyota"
                        value={newLendCar.make}
                        onChange={(e) => setNewLendCar({ ...newLendCar, make: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold text-gray-800 outline-none focus:border-turo-purple transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        Model
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Model 3, 911, Camry"
                        value={newLendCar.model}
                        onChange={(e) => setNewLendCar({ ...newLendCar, model: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold text-gray-800 outline-none focus:border-turo-purple transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                          Year
                        </label>
                        <select
                          value={newLendCar.year}
                          onChange={(e) => setNewLendCar({ ...newLendCar, year: e.target.value })}
                          className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold text-gray-800 outline-none focus:border-turo-purple transition-colors"
                        >
                          {["2025", "2024", "2023", "2022", "2021", "2020"].map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                          Location
                        </label>
                        <input
                          type="text"
                          value={newLendCar.location}
                          onChange={(e) => setNewLendCar({ ...newLendCar, location: e.target.value })}
                          className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold text-gray-800 outline-none focus:border-turo-purple transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {lendStep === 2 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 text-sm mb-2">
                      Set pricing & settings
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        Daily Rental Rate (AUD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">
                          $
                        </span>
                        <input
                          type="number"
                          value={newLendCar.price}
                          onChange={(e) => setNewLendCar({ ...newLendCar, price: e.target.value })}
                          className="w-full border border-gray-200 pl-8 pr-4 py-3 rounded-xl text-sm font-semibold text-gray-800 outline-none focus:border-turo-purple transition-colors"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 uppercase">
                          /day
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 font-medium">
                        Based on similar vehicles, we suggest $65 - $90/day. You receive up to 75%.
                      </p>
                    </div>

                    <div className="flex gap-4 p-4 border border-turo-purple/20 bg-turo-light rounded-2xl text-turo-purple items-start">
                      <Info className="size-5 shrink-0 mt-0.5" />
                      <div className="text-xs font-medium leading-relaxed text-left">
                        <strong className="font-bold">Insurance & Protection:</strong> You are protected by our $20M third-party property cover. Renter pays direct insurance fee during booking.
                      </div>
                    </div>

                    {/* Rent-to-Own Checkbox & Settings */}
                    <div className="pt-4 border-t border-gray-100">
                      <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-2xl border border-gray-200/60 hover:border-turo-purple/20 transition-all">
                        <input
                          type="checkbox"
                          checked={newLendCar.enableRentToOwn}
                          onChange={(e) => setNewLendCar({ ...newLendCar, enableRentToOwn: e.target.checked })}
                          className="accent-turo-purple size-4 shrink-0"
                        />
                        <div className="text-left">
                          <span className="text-xs font-bold text-gray-800">Enable Rent-to-Own</span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">Let renters buy this car over periodic payments.</span>
                        </div>
                      </label>
                    </div>

                    {newLendCar.enableRentToOwn && (
                      <div className="space-y-4 p-4 bg-turo-light/30 border border-turo-purple/15 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 text-left">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                              Buyout Price (AUD)
                            </label>
                            <input
                              type="number"
                              value={newLendCar.rentToOwnPrice}
                              onChange={(e) => setNewLendCar({ ...newLendCar, rentToOwnPrice: e.target.value })}
                              className="w-full border border-gray-200 px-3 py-2 bg-white rounded-xl text-xs font-semibold text-gray-800 outline-none focus:border-turo-purple"
                              placeholder="e.g. 35000"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                              Buyout Term
                            </label>
                            <select
                              value={newLendCar.rentToOwnMonths}
                              onChange={(e) => setNewLendCar({ ...newLendCar, rentToOwnMonths: e.target.value })}
                              className="w-full border border-gray-200 px-3 py-2 bg-white rounded-xl text-xs font-semibold text-gray-800 outline-none focus:border-turo-purple"
                            >
                              <option value="12">12 Months (1 yr)</option>
                              <option value="24">24 Months (2 yrs)</option>
                              <option value="36">36 Months (3 yrs)</option>
                            </select>
                          </div>
                        </div>

                        {/* Calculated Summary */}
                        <div className="bg-white p-3 rounded-xl border border-gray-200/60 text-xs space-y-1.5 text-gray-600">
                          <div className="flex justify-between font-medium">
                            <span>Downpayment (10%):</span>
                            <span className="text-gray-900 font-bold">${Math.round((parseInt(newLendCar.rentToOwnPrice) || 0) * 0.1).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Monthly Payment:</span>
                            <span className="text-gray-900 font-bold">${Math.round(((parseInt(newLendCar.rentToOwnPrice) || 0) * 0.9) / (parseInt(newLendCar.rentToOwnMonths) || 12) * 1.25).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-bold text-turo-purple border-t border-dashed border-gray-100 pt-1.5">
                            <span>Seller Payout (Net 90%):</span>
                            <span>${Math.round((((parseInt(newLendCar.rentToOwnPrice) || 0) * 0.9) / (parseInt(newLendCar.rentToOwnMonths) || 12) * 1.25) * 0.9).toLocaleString()}/mo</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {lendStep === 3 && (
                  <div className="text-center py-6 space-y-4">
                    <div className="size-16 bg-turo-light text-turo-purple rounded-full flex items-center justify-center mx-auto shadow-md">
                      <Sparkles className="size-8" />
                    </div>
                    <div>
                      <h4 className="font-black text-xl text-gray-900">
                        Listing Submitted!
                      </h4>
                      <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                        Congratulations! Your <strong>{newLendCar.year} {newLendCar.make} {newLendCar.model}</strong> has been submitted. Our team will verify your vehicle details within 24 hours.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                {lendStep > 1 && lendStep < 3 ? (
                  <button
                    onClick={() => setLendStep(lendStep - 1)}
                    className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {lendStep < 3 ? (
                  <button
                    onClick={() => {
                      if (!newLendCar.make || !newLendCar.model) {
                        alert("Please fill in the make and model fields.");
                        return;
                      }
                      if (lendStep === 2) {
                        const newCarObj: TuroCar = {
                          id: `${newLendCar.make.toLowerCase()}-${newLendCar.model.toLowerCase()}-${Date.now()}`,
                          name: `${newLendCar.make} ${newLendCar.model} ${newLendCar.year}`,
                          make: newLendCar.make,
                          model: newLendCar.model,
                          year: parseInt(newLendCar.year),
                          category: "Sport",
                          pricePerDay: parseInt(newLendCar.price) || 80,
                          rating: 5.0,
                          tripsCount: 0,
                          isAllStarHost: true,
                          hostName: "You (Host)",
                          hostAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
                          image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
                          location: newLendCar.location,
                          transmission: "Automatic",
                          fuelType: "Petrol",
                          seats: 5,
                          description: "Listed by you. Feel the difference driving this personal vehicle.",
                          features: ["Bluetooth", "USB Charger", "GPS"],
                          ...(newLendCar.enableRentToOwn ? {
                            rentToOwnAvailable: true,
                            rentToOwnPrice: parseInt(newLendCar.rentToOwnPrice) || 35000,
                            rentToOwnMonths: parseInt(newLendCar.rentToOwnMonths) || 24,
                            downPayment: Math.round((parseInt(newLendCar.rentToOwnPrice) || 35000) * 0.1),
                          } : {})
                        };
                        setCars([newCarObj, ...cars]);
                      }
                      setLendStep(lendStep + 1);
                    }}
                    className="bg-turo-purple hover:bg-turo-hover text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    {lendStep === 2 ? "Finish Listing" : "Next Step"}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsLendModalOpen(false)}
                    className="bg-turo-purple hover:bg-turo-hover text-white text-sm font-bold px-8 py-2.5 rounded-full transition-colors mx-auto cursor-pointer"
                  >
                    Done
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Theme4HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-turo-purple font-bold">Loading Phillip Cars...</div>}>
      <Theme4HomePageContent />
    </Suspense>
  );
}
