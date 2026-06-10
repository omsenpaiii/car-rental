"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Star, Shield, Calendar, Clock, MapPin, 
  HelpCircle, CheckCircle2, Heart, Share2, Info, ChevronRight, Award, MessageSquare 
} from "lucide-react";
import { turoCars, TuroCar } from "@/lib/theme4-data";

export default function Theme4CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Find car by ID
  const car = useMemo(() => {
    return turoCars.find((c) => c.id === id) || turoCars[0];
  }, [id]);

  // Gallery slider state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Complementary mock photos for carousel
  const carImages = useMemo(() => {
    return [
      car.image,
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80", // details
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80", // interior
    ];
  }, [car]);

  // Booking details state
  const [pickupDate, setPickupDate] = useState("2026-06-15");
  const [returnDate, setReturnDate] = useState("2026-06-18");
  const [deliveryLocation, setDeliveryLocation] = useState("Melbourne Airport");
  const [protectionPlan, setProtectionPlan] = useState<"standard" | "minimum" | "none">("standard");

  // Calculate days count
  const daysCount = useMemo(() => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  }, [pickupDate, returnDate]);

  // Calculate pricing
  const pricing = useMemo(() => {
    const tripPrice = car.pricePerDay * daysCount;
    const deliveryFee = deliveryLocation === "Host Location" ? 0 : 40;
    
    let protectionFee = 0;
    if (protectionPlan === "standard") protectionFee = 25 * daysCount;
    if (protectionPlan === "minimum") protectionFee = 12 * daysCount;

    const serviceFee = Math.round(tripPrice * 0.08);
    const total = tripPrice + deliveryFee + protectionFee + serviceFee;

    return {
      tripPrice,
      deliveryFee,
      protectionFee,
      serviceFee,
      total,
    };
  }, [car, daysCount, deliveryLocation, protectionPlan]);

  // Handle Checkout Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Top Banner details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-turo-purple transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Back to Search
        </button>
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-turo-purple transition-colors p-1.5 rounded-full hover:bg-gray-50" aria-label="Share">
            <Share2 className="size-4.5" />
          </button>
          <button className="text-gray-500 hover:text-turo-purple transition-colors p-1.5 rounded-full hover:bg-gray-50" aria-label="Favorite">
            <Heart className="size-4.5" />
          </button>
        </div>
      </div>

      {/* Large Image Showcase Carousel */}
      <section className="bg-gray-100 py-2 sm:py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative h-[280px] sm:h-[450px] rounded-3xl overflow-hidden shadow-md bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={carImages[activeImageIndex]}
              alt={car.name}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Carousel dots indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full flex gap-2">
              {carImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`size-2 rounded-full transition-all ${
                    idx === activeImageIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column: Car Specifications & Details */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500 mb-3">
              <span className="font-bold px-2.5 py-1 bg-turo-light text-turo-purple rounded-md uppercase tracking-wider">
                {car.category}
              </span>
              <span>•</span>
              <span className="font-semibold">{car.transmission}</span>
              <span>•</span>
              <span className="font-semibold">{car.fuelType}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              {car.name}
            </h1>
            <p className="text-sm text-gray-500 font-semibold mt-1 flex items-center gap-1">
              <MapPin className="size-4 text-turo-purple" />
              {car.location}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-6 pb-6 border-b border-gray-100">
              <div className="flex items-center text-amber-500 font-bold gap-1 text-sm">
                <Star className="size-4.5 fill-current" />
                <span>{car.rating.toFixed(2)}</span>
                <span className="text-gray-400 font-normal">({car.tripsCount} trips)</span>
              </div>
              {car.isAllStarHost && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-turo-purple">
                  <Award className="size-4.5" />
                  <span>All-Star Host</span>
                </div>
              )}
            </div>
          </div>

          {/* Host Card Profile */}
          <div className="flex items-center gap-4 p-5 border border-gray-200 rounded-2xl bg-gray-50/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={car.hostAvatar}
              alt={car.hostName}
              className="size-14 rounded-full object-cover border-2 border-turo-purple"
            />
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                Hosted by
              </span>
              <h3 className="font-bold text-base text-gray-900 mt-0.5">
                {car.hostName}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {car.isAllStarHost ? "All-Star Hosts are experienced, highly rated, and committed to providing great trips." : "Local Melbourne P2P Host."}
              </p>
            </div>
          </div>

          {/* Specs Details Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-gray-900">Specs & Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="border border-gray-100 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Seats</span>
                <span className="font-bold text-sm text-gray-800 mt-1 block">{car.seats} Seats</span>
              </div>
              <div className="border border-gray-100 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Transmission</span>
                <span className="font-bold text-sm text-gray-800 mt-1 block">{car.transmission}</span>
              </div>
              <div className="border border-gray-100 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Fuel/Battery</span>
                <span className="font-bold text-sm text-gray-800 mt-1 block">{car.fuelType}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-black text-gray-900">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              {car.description}
            </p>
          </div>

          {/* Features Checklist */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-xl font-black text-gray-900">Features checklist</h2>
            <div className="grid grid-cols-2 gap-3.5">
              {car.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                  <CheckCircle2 className="size-4 text-turo-purple shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Host guidelines */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-black text-gray-900">Guidelines & Policies</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-3 items-start">
                <Info className="size-5 text-turo-purple shrink-0 mt-0.5" />
                <div className="font-semibold text-gray-700">
                  Fuel/Charge Policy:
                  <span className="font-normal text-gray-500 block mt-0.5">
                    Return the vehicle with the same level of fuel or battery charge as received. Refuel/recharge fees plus admin charge will apply otherwise.
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Info className="size-5 text-turo-purple shrink-0 mt-0.5" />
                <div className="font-semibold text-gray-700">
                  Cleanliness Policy:
                  <span className="font-normal text-gray-500 block mt-0.5">
                    Return the car in clean condition. Cleaning fees will apply for excessive mud, pet hair, food spills, or smoke odors.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Sticky Booking Form widget */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  ${car.pricePerDay}
                </span>
                <span className="text-xs font-normal text-gray-500"> /day</span>
              </div>
              <span className="text-xs text-turo-purple font-bold flex items-center gap-0.5">
                <Shield className="size-3.5" />
                Free cancellation
              </span>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* Pickup / Return Dates */}
              <div className="border border-gray-200 rounded-2xl p-4 space-y-3 bg-gray-50/50">
                <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span>Trip Dates</span>
                  <span>{daysCount} {daysCount === 1 ? "day" : "days"}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase">Pickup</label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase">Return</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Hub Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Pickup & Return Location
                </label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-800 outline-none focus:border-turo-purple bg-white cursor-pointer"
                >
                  <option value="Host Location">Meet at Host location (Free)</option>
                  <option value="Melbourne Airport">Melbourne Airport delivery (+$40)</option>
                  <option value="Melbourne CBD Hotel">Melbourne CBD Hotel delivery (+$40)</option>
                </select>
              </div>

              {/* Protection Plan Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Protection Plan
                </label>
                <div className="space-y-2.5">
                  <label className={`flex items-start gap-3 border p-3 rounded-xl cursor-pointer transition-colors ${
                    protectionPlan === "standard" ? "border-turo-purple bg-turo-light text-turo-purple" : "border-gray-200"
                  }`}>
                    <input
                      type="radio"
                      name="protection"
                      checked={protectionPlan === "standard"}
                      onChange={() => setProtectionPlan("standard")}
                      className="mt-0.5 accent-turo-purple"
                    />
                    <div className="text-xs">
                      <span className="font-bold block text-gray-800">Standard Protection (+$25/day)</span>
                      <span className="text-gray-500 block mt-0.5">Reduces physical damage out-of-pocket maximum to $500.</span>
                    </div>
                  </label>
                  <label className={`flex items-start gap-3 border p-3 rounded-xl cursor-pointer transition-colors ${
                    protectionPlan === "minimum" ? "border-turo-purple bg-turo-light text-turo-purple" : "border-gray-200"
                  }`}>
                    <input
                      type="radio"
                      name="protection"
                      checked={protectionPlan === "minimum"}
                      onChange={() => setProtectionPlan("minimum")}
                      className="mt-0.5 accent-turo-purple"
                    />
                    <div className="text-xs">
                      <span className="font-bold block text-gray-800">Minimum Protection (+$12/day)</span>
                      <span className="text-gray-500 block mt-0.5">Reduces physical damage out-of-pocket maximum to $3,000.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs text-gray-600 font-medium">
                <div className="flex justify-between">
                  <span>${car.pricePerDay} x {daysCount} days</span>
                  <span className="text-gray-800">${pricing.tripPrice}</span>
                </div>
                {pricing.deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery fee</span>
                    <span className="text-gray-800">${pricing.deliveryFee}</span>
                  </div>
                )}
                {pricing.protectionFee > 0 && (
                  <div className="flex justify-between">
                    <span>Protection plan fee</span>
                    <span className="text-gray-800">${pricing.protectionFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phillips Service fee</span>
                  <span className="text-gray-800">${pricing.serviceFee}</span>
                </div>
                
                <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-black text-gray-900">
                  <span>Estimated Total</span>
                  <span>${pricing.total} AUD</span>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-turo-purple hover:bg-turo-hover text-white font-black py-4 rounded-2xl transition-colors cursor-pointer text-sm uppercase tracking-wider shadow-lg shadow-turo-purple/20"
              >
                Book Instantly
              </button>
            </form>

            <div className="text-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                Free cancellation
              </span>
              <p className="text-[10px] text-gray-400 mt-1 max-w-[240px] mx-auto leading-relaxed">
                Full refund up to 24 hours before your trip starts. 24/7 support is available.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Success Modal Popup */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl border border-gray-100 space-y-5">
            <div className="size-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="size-8" />
            </div>
            <div>
              <h3 className="font-black text-xl text-gray-900">
                Booking Confirmed!
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Your request has been approved. You are set to rent the <strong>{car.name}</strong> from <strong>{pickupDate}</strong> to <strong>{returnDate}</strong>.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl text-left border border-gray-100 text-xs text-gray-600 space-y-1.5">
              <div><strong>Pickup:</strong> {pickupDate} at 10:00 AM</div>
              <div><strong>Delivery Location:</strong> {deliveryLocation}</div>
              <div><strong>Host Contact:</strong> {car.hostName} (melbourne-p2p@phillips.com)</div>
            </div>
            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                router.push("/theme4");
              }}
              className="w-full bg-turo-purple hover:bg-turo-hover text-white text-xs font-bold py-3 rounded-full transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
