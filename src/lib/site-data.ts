export type FleetCategory = "Any" | "Sedan" | "SUV" | "Hatchback" | "People Mover";

export type FleetItem = {
  id: string;
  name: string;
  category: Exclude<FleetCategory, "Any">;
  pricePerDay: number;
  seats: number;
  transmission: "Auto" | "Manual";
  fuelType: "Petrol" | "Hybrid" | "Diesel" | "Electric";
  image: string;
  accent: string;
  year: string;
};

export const siteConfig = {
  brand: "Phillips Car Rental",
  tagline: "The Wheels to your Dreams! Rent Smart, Ride Happy",
  phone: "1300 315 275",
  email: "booking@phillipscarrental.com.au",
  address: "132 Indian Dr, Keysborough, Melbourne VIC 3173, Australia",
  nav: [
    { label: "Home", href: "/" },
    { label: "Our Fleets", href: "/our-fleets" },
    { label: "Search Your Car", href: "/search-your-car" },
    { label: "Track Order", href: "/track-order" },
  ],
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

export const bookingFormDefaults = {
  locations: [
    "Phillips Car Rental Office (132 Indian Dr, Keysborough, Melbourne VIC 3173, Australia)",
    "Melbourne Airport Pickup Hub",
    "Southern Cross City Desk",
  ],
  times: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  hours: ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
  minutes: ["00", "15", "30", "45"],
  categories: ["Any", "Sedan", "SUV", "Hatchback", "People Mover"] as FleetCategory[],
};

export const heroMetrics = [
  { value: "24/7", label: "Support desk" },
  { value: "60+", label: "Vehicles ready" },
  { value: "4.9/5", label: "Customer rating" },
];

export const howItWorks = [
  {
    step: "01",
    title: "Choose your dates",
    description: "Lock in pickup and return details with a quick, familiar search flow.",
  },
  {
    step: "02",
    title: "Pick your perfect car",
    description: "Browse clean, practical vehicles sorted by category, seats, and budget.",
  },
  {
    step: "03",
    title: "Drive away smiling",
    description: "Fast confirmation, smooth handover, and a support team that stays reachable.",
  },
];

export const whyChooseUs = [
  {
    title: "24/7 Support",
    description: "Helpful, human support whenever plans change or you need a hand.",
  },
  {
    title: "Affordable Price",
    description: "Clear daily pricing on dependable vehicles without the drama.",
  },
  {
    title: "Easy Booking",
    description: "A lightweight online booking flow that gets you to the road quickly.",
  },
  {
    title: "Quick Service",
    description: "Fast turnaround at pickup and drop-off so your day keeps moving.",
  },
];

export const carCategories = [
  {
    title: "Sedan",
    description: "Comfortable everyday rides for city errands, airport runs, and business trips.",
  },
  {
    title: "SUV",
    description: "Extra room, elevated comfort, and easy family travel for weekends away.",
  },
  {
    title: "Hatchback",
    description: "Compact, efficient, and simple to park without feeling stripped back.",
  },
  {
    title: "People Mover",
    description: "Flexible seven and eight-seat options for crews, families, and group travel.",
  },
];

export const services = [
  "Airport pickups",
  "Long-term rental deals",
  "Rideshare-friendly options",
  "Flexible return support",
];

export const testimonials = [
  {
    name: "Mia Patel",
    role: "Weekly renter",
    quote:
      "The booking flow was easy, the car was spotless, and pickup took less than ten minutes.",
  },
  {
    name: "Jordan Nguyen",
    role: "Airport transfer customer",
    quote:
      "Clean design, clear pricing, and the support team actually answered when I called.",
  },
  {
    name: "Ava Thompson",
    role: "Family road trip",
    quote:
      "We needed a roomy SUV at short notice and Phillips Car Rental made it feel effortless from start to finish.",
  },
];

export const fleetItems: FleetItem[] = [
  {
    id: "toyota-camry-2024",
    name: "Toyota Camry 2024",
    category: "Sedan",
    pricePerDay: 43,
    seats: 5,
    transmission: "Auto",
    fuelType: "Hybrid",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-slate-100",
    year: "2024",
  },
  {
    id: "toyota-kluger-2019",
    name: "Toyota Kluger 2019",
    category: "SUV",
    pricePerDay: 50,
    seats: 7,
    transmission: "Auto",
    fuelType: "Petrol",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-stone-100",
    year: "2019",
  },
  {
    id: "honda-jazz-2014",
    name: "Honda Jazz 2014",
    category: "Hatchback",
    pricePerDay: 29,
    seats: 5,
    transmission: "Auto",
    fuelType: "Petrol",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-zinc-100",
    year: "2014",
  },
  {
    id: "kia-carnival-2019",
    name: "Kia Carnival 2019",
    category: "People Mover",
    pricePerDay: 55,
    seats: 8,
    transmission: "Auto",
    fuelType: "Diesel",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-neutral-100",
    year: "2019",
  },
  {
    id: "mitsubishi-outlander-2017",
    name: "Mitsubishi Outlander 2017",
    category: "SUV",
    pricePerDay: 40,
    seats: 5,
    transmission: "Auto",
    fuelType: "Petrol",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-amber-50",
    year: "2017",
  },
  {
    id: "toyota-corolla-2025",
    name: "Toyota Corolla 2025",
    category: "Sedan",
    pricePerDay: 45,
    seats: 5,
    transmission: "Auto",
    fuelType: "Hybrid",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-slate-50",
    year: "2025",
  },
  {
    id: "hyundai-getz-2009",
    name: "Hyundai Getz 2009",
    category: "Hatchback",
    pricePerDay: 23,
    seats: 5,
    transmission: "Auto",
    fuelType: "Petrol",
    image:
      "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-stone-100",
    year: "2009",
  },
  {
    id: "nissan-xtrail-2020",
    name: "Nissan X-Trail 2020",
    category: "SUV",
    pricePerDay: 40,
    seats: 5,
    transmission: "Auto",
    fuelType: "Petrol",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-zinc-100",
    year: "2020",
  },
  {
    id: "toyota-camry-2025-white",
    name: "Toyota Camry 2025 White",
    category: "Sedan",
    pricePerDay: 42,
    seats: 5,
    transmission: "Auto",
    fuelType: "Hybrid",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-neutral-100",
    year: "2025",
  },
  {
    id: "toyota-corolla-cross-2024",
    name: "Toyota Corolla Cross Hybrid 2024",
    category: "SUV",
    pricePerDay: 48,
    seats: 5,
    transmission: "Auto",
    fuelType: "Hybrid",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-amber-50",
    year: "2024",
  },
  {
    id: "honda-city-2015",
    name: "Honda City 2015",
    category: "Sedan",
    pricePerDay: 29,
    seats: 5,
    transmission: "Auto",
    fuelType: "Petrol",
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-stone-50",
    year: "2015",
  },
  {
    id: "honda-odyssey-2007",
    name: "Honda Odyssey 2007",
    category: "People Mover",
    pricePerDay: 26,
    seats: 7,
    transmission: "Auto",
    fuelType: "Petrol",
    image:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-slate-100",
    year: "2007",
  },
];
