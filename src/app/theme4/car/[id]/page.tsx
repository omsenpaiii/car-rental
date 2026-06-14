"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, Star, Shield, Calendar, Clock, MapPin, 
  HelpCircle, CheckCircle2, Heart, Share2, Info, ChevronRight, Award, MessageSquare,
  FileText, PenTool
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

  // Favorite state
  const [isFavorite, setIsFavorite] = useState(false);

  // Booking details state
  const [pickupDate, setPickupDate] = useState("2026-06-15");
  const [returnDate, setReturnDate] = useState("2026-06-18");
  const [deliveryLocation, setDeliveryLocation] = useState("Melbourne Airport");
  const [protectionPlan, setProtectionPlan] = useState<"standard" | "minimum" | "none">("standard");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Share link copied to clipboard!");
  };

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

  // Rent-to-Own States
  const searchParams = useSearchParams();
  const initMode = searchParams.get("mode") || "rent";
  const [bookingMode, setBookingMode] = useState<"rent" | "rto">(
    initMode === "rto" && car.rentToOwnAvailable ? "rto" : "rent"
  );
  const [rtoMonths, setRtoMonths] = useState<number>(car.rentToOwnMonths || 24);
  const [typedSignature, setTypedSignature] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signatureTimestamp, setSignatureTimestamp] = useState("");
  const [signatureError, setSignatureError] = useState("");
  const [isRtoModalOpen, setIsRtoModalOpen] = useState(false);
  const [isRtoSuccess, setIsRtoSuccess] = useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#593CFB";

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Rent to Own Calculations
  const rtoMetrics = useMemo(() => {
    const buyout = car.rentToOwnPrice || 35000;
    const down = car.downPayment || Math.round(buyout * 0.1);
    const monthlyRate = Math.round((buyout - down) / rtoMonths * 1.25);
    const totalPayments = down + (monthlyRate * rtoMonths);
    const commission = Math.round(monthlyRate * 0.1);
    const hostPayout = Math.round(monthlyRate * 0.9);
    const upfrontTotal = down + monthlyRate;

    return {
      buyout,
      down,
      monthlyRate,
      totalPayments,
      commission,
      hostPayout,
      upfrontTotal,
    };
  }, [car, rtoMonths]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingMode === "rto") {
      setTypedSignature("");
      setAgreedToTerms(false);
      setSignatureError("");
      setIsRtoModalOpen(true);
    } else {
      setIsSuccessModalOpen(true);
    }
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
          <button 
            onClick={handleShare}
            className="text-gray-500 hover:text-turo-purple transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer" 
            aria-label="Share"
          >
            <Share2 className="size-4.5" />
          </button>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer ${
              isFavorite ? "text-red-500" : "text-gray-500 hover:text-turo-purple"
            }`} 
            aria-label="Favorite"
          >
            <Heart className={`size-4.5 ${isFavorite ? "fill-current" : ""}`} />
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

          {/* Reviews Section */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">Reviews ({car.tripsCount > 5 ? 3 : car.tripsCount})</h2>
              <div className="flex items-center text-amber-500 font-bold gap-1 text-sm">
                <Star className="size-4.5 fill-current" />
                <span>{car.rating.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { name: "Sarah L.", rating: 5, date: "June 2026", text: `This ${car.model} was absolutely pristine and fully charged when picked up. The host ${car.hostName} was super communicative and pick up was a breeze. Highly recommended!` },
                { name: "James D.", rating: 5, date: "May 2026", text: "Incredible car, very fun to drive. Transaction was seamless. Will definitely book again next time I'm in Melbourne." },
                { name: "Michael K.", rating: 4, date: "April 2026", text: "Great experience overall. Clean interior, smooth ride. Drop off was quick and easy." }
              ].map((review, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-turo-purple/10 text-turo-purple font-black flex items-center justify-center text-xs">
                      {review.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex text-amber-500">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="size-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed pl-12 font-medium">
                    {review.text}
                  </p>
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
            
            {/* Rent vs Rent-to-Own Tab Switcher */}
            {car.rentToOwnAvailable && (
              <div className="flex bg-gray-100 p-1 rounded-2xl mb-4 border border-gray-200/50">
                <button
                  type="button"
                  onClick={() => setBookingMode("rent")}
                  className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    bookingMode === "rent"
                      ? "bg-white text-gray-950 shadow-sm border border-gray-200/30"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Standard Rent
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode("rto")}
                  className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    bookingMode === "rto"
                      ? "bg-turo-purple text-white shadow-sm"
                      : "text-gray-500 hover:text-turo-purple"
                  }`}
                >
                  Rent to Own
                </button>
              </div>
            )}

            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {bookingMode === "rto" ? `$${rtoMetrics.monthlyRate.toLocaleString()}` : `$${car.pricePerDay}`}
                </span>
                <span className="text-xs font-normal text-gray-500"> {bookingMode === "rto" ? "/mo" : "/day"}</span>
              </div>
              <span className="text-xs text-turo-purple font-bold flex items-center gap-0.5">
                <Shield className="size-3.5" />
                {bookingMode === "rto" ? "Escrow Protected" : "Free cancellation"}
              </span>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {bookingMode === "rent" ? (
                <>
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
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none cursor-pointer mt-0.5 focus:text-turo-purple transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-gray-400 uppercase">Return</label>
                        <input
                          type="date"
                          value={returnDate}
                          min={pickupDate || new Date().toISOString().split('T')[0]}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none cursor-pointer mt-0.5 focus:text-turo-purple transition-colors"
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
                      <span>Phillip Cars Service fee</span>
                      <span className="text-gray-800">${pricing.serviceFee}</span>
                    </div>
                    
                    <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-black text-gray-900">
                      <span>Estimated Total</span>
                      <span>${pricing.total} AUD</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Buyout Period Selection */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Contract Term Duration
                    </label>
                    <select
                      value={rtoMonths}
                      onChange={(e) => setRtoMonths(Number(e.target.value))}
                      className="w-full border border-gray-200 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-800 outline-none focus:border-turo-purple bg-white cursor-pointer"
                    >
                      <option value={12}>12 Months Term</option>
                      <option value={24}>24 Months Term</option>
                      <option value={36}>36 Months Term</option>
                    </select>
                  </div>

                  {/* Pricing markup notice */}
                  <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-2xl text-[11px] text-amber-800 leading-relaxed font-medium space-y-1">
                    <div className="flex gap-1 items-center font-bold text-amber-900">
                      <Info className="size-3 shrink-0" />
                      Rent-to-Own Pricing Disclosure
                    </div>
                    <p>
                      Rent-to-own is more costly than standard purchase. It includes a <strong>25% option markup</strong> to cover financing, depreciation, and title escrow.
                    </p>
                    <p>
                      Total payments over term: <strong>${rtoMetrics.totalPayments.toLocaleString()} AUD</strong> vs Direct Buyout of <strong>${rtoMetrics.buyout.toLocaleString()} AUD</strong>.
                    </p>
                  </div>

                  {/* Payout Breakdown (10% Seller Commission details) */}
                  <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-2xl text-[11px] text-purple-900 leading-relaxed font-medium">
                    <div className="font-bold flex gap-1 items-center mb-1 text-turo-purple">
                      <Shield className="size-3 shrink-0" />
                      Escrow & Payout Details
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Monthly payment:</span>
                      <span className="font-bold text-gray-900">${rtoMetrics.monthlyRate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span>Host payout (90%):</span>
                      <span className="font-bold text-emerald-600">${rtoMetrics.hostPayout.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mt-0.5 text-gray-500">
                      <span>Platform Commission (10%):</span>
                      <span>${rtoMetrics.commission.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs text-gray-600 font-medium">
                    <div className="flex justify-between">
                      <span>Option Downpayment (Non-refundable)</span>
                      <span className="text-gray-800 font-semibold">${rtoMetrics.down.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>First Month Option Payout</span>
                      <span className="text-gray-800 font-semibold">${rtoMetrics.monthlyRate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="text-gray-800">{rtoMonths} Months</span>
                    </div>
                    
                    <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-black text-gray-900">
                      <span>Due Today (Upfront Total)</span>
                      <span className="text-emerald-600">${rtoMetrics.upfrontTotal.toLocaleString()} AUD</span>
                    </div>
                  </div>
                </>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-turo-purple hover:bg-turo-hover text-white font-black py-4 rounded-2xl transition-colors cursor-pointer text-sm uppercase tracking-wider shadow-lg shadow-turo-purple/20 flex items-center justify-center gap-2"
              >
                {bookingMode === "rto" ? (
                  <>
                    <FileText className="size-4" />
                    Review & Sign Lease Option
                  </>
                ) : (
                  "Book Instantly"
                )}
              </button>
            </form>

            <div className="text-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                {bookingMode === "rto" ? "Platform Escrow System" : "Free cancellation"}
              </span>
              <p className="text-[10px] text-gray-400 mt-1 max-w-[240px] mx-auto leading-relaxed">
                {bookingMode === "rto" 
                  ? "All monthly rent payments are secured in escrow. Commission is handled automatically by Phillip Cars." 
                  : "Full refund up to 24 hours before your trip starts. 24/7 support is available."
                }
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Standard Success Modal Popup */}
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
              <div><strong>Host Contact:</strong> {car.hostName} (melbourne-p2p@phillipcars.com)</div>
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

      {/* RTO Lease-Option Contract Signature Modal */}
      {isRtoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 my-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-xl text-gray-900 flex items-center gap-2">
                <FileText className="text-turo-purple size-5" />
                Rent-to-Own Lease Option Contract
              </h3>
              <button 
                onClick={() => setIsRtoModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Scrollable contract text */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs font-medium text-gray-600 h-64 overflow-y-auto space-y-4 font-mono leading-relaxed">
              <p className="font-bold text-center text-gray-800 text-sm">
                LEASE WITH OPTION TO PURCHASE AGREEMENT
              </p>
              <p>
                This Lease with Option to Purchase Agreement (the &quot;Agreement&quot;) is entered into by and between the Host (hereinafter &quot;Seller/Lessor&quot;) and the verified Phillip Cars Renter (hereinafter &quot;Buyer/Lessee&quot;).
              </p>
              <div>
                <strong className="text-gray-800">1. VEHICLE DESCRIPTION:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>Make/Model: {car.name}</li>
                  <li>Year: {car.year}</li>
                  <li>Escrow Status: Active escrow pending downpayment</li>
                </ul>
              </div>
              <div>
                <strong className="text-gray-800">2. FINANCIAL CONSIDERATIONS:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>Downpayment Option Fee: ${rtoMetrics.down.toLocaleString()} AUD (Non-Refundable)</li>
                  <li>Monthly Option Rent: ${rtoMetrics.monthlyRate.toLocaleString()} AUD/month</li>
                  <li>Contract Term: {rtoMonths} months</li>
                  <li>Escrow Commission: 10% platform commission (${rtoMetrics.commission.toLocaleString()} AUD/mo) is deducted automatically from Host distributions.</li>
                </ul>
              </div>
              <div>
                <strong className="text-gray-800">3. PURCHASE OPTION & TITLE ESCROW:</strong>
                <p className="mt-1">
                  The Buyer/Lessee shall have the exclusive right and option to purchase the vehicle. Upon completion of {rtoMonths} consecutive monthly payments, title ownership will be transferred from Seller to Buyer. Phillip Cars holds the title and transfer paperwork in digital escrow to guarantee fulfillment.
                </p>
              </div>
              <div>
                <strong className="text-gray-800">4. MAINTENANCE, INSURANCE & TAXES:</strong>
                <p className="mt-1">
                  During the lease period, all maintenance costs, registration, insurance coverage, and vehicle running costs are the sole responsibility of the Buyer/Lessee. Buyer/Lessee agrees to abide by all platform <Link href="/theme4/policies/terms" target="_blank" className="text-turo-purple hover:underline font-bold">Terms of Service</Link> and Rent-to-Own Provisions.
                </p>
              </div>
              <div>
                <strong className="text-gray-800">5. PAYMENT DEFAULT & REPOSSESSION:</strong>
                <p className="mt-1">
                  Time is of the essence. If payments are more than 7 days overdue, the option is voided. Seller retains the downpayment, and platform GPS tracking will be activated for immediate repossession of the vehicle.
                </p>
              </div>
            </div>

            {/* Signature inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase mb-1">
                  Type Name to Sign (Cursive Preview)
                </label>
                <input
                  type="text"
                  placeholder="Type your full name"
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 outline-none focus:border-turo-purple bg-white"
                />
              </div>

              {/* Typed cursive preview block */}
              {typedSignature && (
                <div className="p-3 bg-purple-50/30 border border-dashed border-turo-purple/30 rounded-2xl text-center">
                  <span className="text-[9px] text-turo-purple/60 font-bold block mb-1">Digital Signature Preview</span>
                  <span 
                    style={{ fontFamily: "'Brush Script MT', 'Great Vibes', 'Lucida Handwriting', cursive" }} 
                    className="text-3xl text-turo-purple font-medium inline-block select-none"
                  >
                    {typedSignature}
                  </span>
                </div>
              )}

              {/* Draw Signature Canvas pad */}
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <label className="block text-xs font-black text-gray-500 uppercase">
                    Draw Signature (Canvas Pad)
                  </label>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-[10px] text-turo-purple font-bold hover:underline cursor-pointer"
                  >
                    Clear Drawing
                  </button>
                </div>
                <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 cursor-crosshair">
                  <canvas
                    ref={canvasRef}
                    width={550}
                    height={100}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      startDrawing(e);
                    }}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      draw(e);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      stopDrawing();
                    }}
                    className="w-full h-[100px] block"
                  />
                </div>
              </div>

              {/* Checkbox agreement */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 font-semibold select-none pt-1">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 accent-turo-purple shrink-0 size-4 rounded cursor-pointer"
                />
                <span>
                  I agree to the platform <Link href="/theme4/policies/terms" target="_blank" className="text-turo-purple hover:underline font-bold">Terms & Conditions</Link>, and the Rent-to-Own Provisions outlined above.
                </span>
              </label>

              {signatureError && (
                <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl">
                  ⚠️ {signatureError}
                </p>
              )}
            </div>

            {/* Modal actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRtoModalOpen(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl transition-colors cursor-pointer text-xs uppercase tracking-wider"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!typedSignature.trim()) {
                    setSignatureError("Please type your name to sign the contract.");
                    return;
                  }
                  if (!agreedToTerms) {
                    setSignatureError("You must agree to the Terms & Conditions.");
                    return;
                  }
                  
                  setSignatureTimestamp(new Date().toLocaleString());
                  setIsRtoSuccess(true);
                  setIsRtoModalOpen(false);
                }}
                className="flex-1 bg-turo-purple hover:bg-turo-hover text-white font-black py-3.5 rounded-2xl transition-colors cursor-pointer text-xs uppercase tracking-wider shadow-lg shadow-turo-purple/20 flex items-center justify-center gap-1.5"
              >
                <PenTool className="size-3.5" />
                Sign & Finalize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RTO Success Modal Receipt */}
      {isRtoSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 text-center shadow-2xl border border-gray-100 space-y-6">
            <div className="size-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="size-8" />
            </div>
            <div>
              <h3 className="font-black text-xl text-gray-900">
                Rent-to-Own Agreement Signed!
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Your payment option is active. Downpayment has been held in platform escrow, and contract terms are legally locked.
              </p>
            </div>

            {/* Signed Receipt details */}
            <div className="bg-gray-50 p-5 rounded-2xl text-left border border-gray-100 text-xs text-gray-600 space-y-3">
              <div className="border-b border-gray-200/60 pb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase block">Vehicle Escrow Profile</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{car.name} ({car.year})</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">Downpayment Paid</span>
                  <span className="font-bold text-gray-900">${rtoMetrics.down.toLocaleString()} AUD</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">Monthly Rent Rate</span>
                  <span className="font-bold text-emerald-600">${rtoMetrics.monthlyRate.toLocaleString()} AUD/mo</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-200/60 pt-2">
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">Term Duration</span>
                  <span className="font-semibold text-gray-850">{rtoMonths} Months</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">Host Monthly Payout</span>
                  <span className="font-semibold text-gray-800">${rtoMetrics.hostPayout.toLocaleString()} AUD (90%)</span>
                </div>
              </div>
              <div className="border-t border-gray-200/60 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-[9px] text-gray-400 font-bold uppercase">Digital Escrow Signatory:</span>
                  <span 
                    style={{ fontFamily: "'Brush Script MT', 'Great Vibes', 'Lucida Handwriting', cursive" }} 
                    className="text-base text-turo-purple font-medium"
                  >
                    {typedSignature}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[9px] text-gray-400 font-bold uppercase">Signed Timestamp:</span>
                  <span className="font-mono text-[10px] text-gray-500">{signatureTimestamp}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsRtoSuccess(false);
                router.push("/theme4");
              }}
              className="w-full bg-turo-purple hover:bg-turo-hover text-white text-xs font-bold py-3.5 rounded-full transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
