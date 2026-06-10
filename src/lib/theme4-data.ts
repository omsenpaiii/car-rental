export type TuroCar = {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  category: "Electric" | "Sport" | "SUV" | "Luxury" | "Classic";
  pricePerDay: number;
  rating: number;
  tripsCount: number;
  isAllStarHost: boolean;
  hostName: string;
  hostAvatar: string;
  image: string;
  location: string;
  transmission: "Automatic" | "Manual";
  fuelType: "Electric" | "Petrol" | "Hybrid";
  seats: number;
  description: string;
  features: string[];
};

export const makeCategories = [
  { name: "Tesla", logo: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=150&q=80" },
  { name: "Porsche", logo: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=150&q=80" },
  { name: "BMW", logo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=150&q=80" },
  { name: "Jeep", logo: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=150&q=80" },
  { name: "Mustang", logo: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=150&q=80" },
  { name: "Mercedes", logo: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=150&q=80" },
];

export const turoCars: TuroCar[] = [
  {
    id: "tesla-model-3-2024",
    name: "Tesla Model 3 2024",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    category: "Electric",
    pricePerDay: 85,
    rating: 4.95,
    tripsCount: 42,
    isAllStarHost: true,
    hostName: "Marcus P.",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    location: "Melbourne CBD, VIC",
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    description: "Experience the future of driving with this brand new 2024 Tesla Model 3. Features autopilot, premium sound, dual-zone climate, and a panoramic glass roof. Spotless, fully charged, and ready for your Melbourne adventure.",
    features: ["Autopilot", "Bluetooth", "USB Charger", "Panoramic Roof", "GPS", "Heated Seats"],
  },
  {
    id: "porsche-911-carrera-2023",
    name: "Porsche 911 Carrera 2023",
    make: "Porsche",
    model: "911 Carrera",
    year: 2023,
    category: "Sport",
    pricePerDay: 280,
    rating: 5.0,
    tripsCount: 18,
    isAllStarHost: true,
    hostName: "Alexander K.",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    location: "St Kilda, VIC",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 4,
    description: "An absolute masterpiece of German engineering. The Porsche 911 Carrera offers unmatched handling, speed, and luxury. Perfect for special occasions, weekend getaways down the Great Ocean Road, or a premium business trip.",
    features: ["Leather Seats", "Apple CarPlay", "Premium Sound", "Sport Mode", "Backup Camera", "GPS"],
  },
  {
    id: "jeep-wrangler-rubicon-2022",
    name: "Jeep Wrangler Rubicon 2022",
    make: "Jeep",
    model: "Wrangler Rubicon",
    year: 2022,
    category: "SUV",
    pricePerDay: 120,
    rating: 4.88,
    tripsCount: 55,
    isAllStarHost: false,
    hostName: "Dave M.",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    location: "Keysborough, VIC",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    description: "Go anywhere, do anything with the ultimate utility vehicle. This Jeep Wrangler Rubicon has 4-wheel drive, removable top panels for open-air cruising, and off-road capability. Spacious interior for luggage and gear.",
    features: ["4-Wheel Drive", "Convertible Top", "Towing Package", "Apple CarPlay", "Roof Rack"],
  },
  {
    id: "ford-mustang-gt-2021",
    name: "Ford Mustang GT V8 2021",
    make: "Ford",
    model: "Mustang GT",
    year: 2021,
    category: "Sport",
    pricePerDay: 160,
    rating: 4.92,
    tripsCount: 68,
    isAllStarHost: true,
    hostName: "Sarah T.",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
    location: "South Melbourne, VIC",
    transmission: "Manual",
    fuelType: "Petrol",
    seats: 4,
    description: "Feel the rumble of a pure V8 muscle car. This Mustang GT features a 6-speed manual transmission, active exhaust control, and aggressive styling. Live the dream of driving a classic American legend in Melbourne.",
    features: ["V8 Engine", "Manual Transmission", "Premium Sound", "Bluetooth", "Backup Camera"],
  },
  {
    id: "tesla-model-y-2024",
    name: "Tesla Model Y 2024",
    make: "Tesla",
    model: "Model Y",
    year: 2024,
    category: "Electric",
    pricePerDay: 95,
    rating: 4.98,
    tripsCount: 29,
    isAllStarHost: true,
    hostName: "Marcus P.",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
    location: "Melbourne CBD, VIC",
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    description: "The Model Y is the ultimate family electric car. Elevated seating position, massive cargo space, high range, and advanced safety features. Deliveries available across major transit hubs.",
    features: ["Autopilot", "All-Wheel Drive", "Panoramic Roof", "USB Charger", "Extra Storage"],
  },
  {
    id: "mercedes-amg-c63-2022",
    name: "Mercedes-Benz AMG C63 2022",
    make: "Mercedes-Benz",
    model: "AMG C63",
    year: 2022,
    category: "Luxury",
    pricePerDay: 240,
    rating: 4.96,
    tripsCount: 15,
    isAllStarHost: true,
    hostName: "Julius V.",
    hostAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    location: "Toorak, VIC",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    description: "Uncompromised luxury meets raw motorsport performance. This AMG C63 offers a handcrafted bi-turbo V8, premium Burmester sound system, and exquisite leather details throughout. Drive in absolute style.",
    features: ["V8 Bi-Turbo", "Burmester Audio", "Premium Leather", "GPS", "Heated Seats", "360 Camera"],
  }
];

export const hostFaqs = [
  {
    question: "How much can I earn by lending my car?",
    answer: "Earnings depend on your vehicle's make, model, age, location, and demand. Standard cars can earn $1,000–$2,000 per month, while premium and specialty vehicles can make up to $4,000+ per month. Use our calculator above to estimate your earning potential!"
  },
  {
    question: "What insurance coverage is provided?",
    answer: "Every trip is backed by our comprehensive insurance policy. This includes up to $20M in third-party property damage coverage, physical damage protection for your vehicle, and 24/7 roadside assistance."
  },
  {
    question: "Who will be renting my car?",
    answer: "We pre-screen all renters. Renters must pass our strict verification process, including identity checks, driving record checks, and credit scoring before they can book any vehicle."
  },
  {
    question: "How do I hand over my vehicle?",
    answer: "You can choose between contact-free lockboxes (Turo Go style) or meeting the renter in person for a key handover. You will take photos of the car's condition at start and end of trips via the host app."
  }
];

export const renterFaqs = [
  {
    question: "What do I need to rent a car?",
    answer: "To rent a car on Phillips Car Rental P2P, you need to be at least 21 years old, hold a valid driver's license (international licenses are accepted with passport), and have a credit card under your name."
  },
  {
    question: "How does delivery work?",
    answer: "Many hosts offer delivery to airports, hotels, or custom addresses. You can select your pickup location during search, and see delivery fees (if any) directly on the listing page."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel for a full refund up to 24 hours before your trip starts. Cancellations within 24 hours may incur a partial fee."
  }
];
