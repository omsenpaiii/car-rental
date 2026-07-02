import { turoCars, type TuroCar } from "@/lib/theme4-data";

export type Theme5Mode = "rent" | "rent_to_own" | "sale";

export const theme5Modes: Array<{ value: Theme5Mode; label: string; shortLabel: string }> = [
  { value: "rent", label: "Rent a car", shortLabel: "Rent" },
  { value: "sale", label: "Buy a car", shortLabel: "Buy" },
  { value: "rent_to_own", label: "Rent to own", shortLabel: "RTO" },
];

export const theme5BodyTypes = [
  "Hatchback",
  "Sedan",
  "SUV",
  "Ute",
  "Van",
  "Wagon",
  "Coupe",
  "Convertible",
];

export const theme5FuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "LPG"];
export const theme5Transmissions = ["Automatic", "Manual"];
export const theme5OdometerRanges = ["Under 20,000", "20,000 - 50,000", "50,000 - 100,000", "100,000+"];
export const theme5SeatOptions = ["2+", "4+", "5+", "7+"];

export type Theme5Filters = {
  mode: Theme5Mode;
  query: string;
  make: string;
  bodyType: string;
  fuel: string;
  transmission: string;
  year: string;
  odometer: string;
  price: number;
  location: string;
  seats: string;
  sort: "recommended" | "price_low" | "price_high" | "year" | "rating";
};

export const defaultTheme5Filters: Theme5Filters = {
  mode: "rent",
  query: "",
  make: "",
  bodyType: "",
  fuel: "",
  transmission: "",
  year: "",
  odometer: "",
  price: 500,
  location: "Melbourne, VIC",
  seats: "",
  sort: "recommended",
};

export const theme5SeedCars: TuroCar[] = [
  ...turoCars,
  {
    id: "toyota-hilux-sr5-2022",
    name: "Toyota Hilux SR5 2022",
    make: "Toyota",
    model: "Hilux SR5",
    year: 2022,
    category: "SUV",
    pricePerDay: 135,
    rating: 4.9,
    tripsCount: 34,
    isAllStarHost: true,
    hostName: "Phillips Fleet",
    hostAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",
    location: "Keysborough, VIC",
    transmission: "Automatic",
    fuelType: "Diesel",
    seats: 5,
    bodyType: "Ute",
    colour: "Graphite",
    odometer: 43500,
    hasFourByFour: true,
    description:
      "A practical diesel ute for work, weekend trips, towing, and family runs. Includes 4x4, Bluetooth, reverse camera, and flexible pickup from Keysborough.",
    features: ["Diesel", "4x4", "Reverse Camera", "Bluetooth", "Tow Bar", "Canopy"],
    rentToOwnAvailable: true,
    rentToOwnPrice: 42000,
    rentToOwnMonths: 36,
    downPayment: 4200,
    saleAvailable: true,
    salePrice: 45500,
  },
];

export function normalizeTheme5Mode(value: string | null): Theme5Mode {
  if (value === "sale" || value === "rent_to_own") return value;
  if (value === "buy") return "sale";
  if (value === "rto") return "rent_to_own";
  return "rent";
}

export function getCarMonthlyRentToOwn(car: TuroCar) {
  if (!car.rentToOwnAvailable || !car.rentToOwnPrice || !car.rentToOwnMonths) return 0;
  const downPayment = car.downPayment ?? Math.round(car.rentToOwnPrice * 0.1);
  return Math.round(((car.rentToOwnPrice - downPayment) / car.rentToOwnMonths) * 1.25);
}

export function getCarModePrice(car: TuroCar, mode: Theme5Mode) {
  if (mode === "sale") return car.salePrice ?? 0;
  if (mode === "rent_to_own") return getCarMonthlyRentToOwn(car);
  return car.pricePerDay;
}

export function isCarAvailableForMode(car: TuroCar, mode: Theme5Mode) {
  if (mode === "sale") return Boolean(car.saleAvailable || car.salePrice);
  if (mode === "rent_to_own") return Boolean(car.rentToOwnAvailable);
  return car.pricePerDay > 0;
}

export function getModeUnit(mode: Theme5Mode) {
  if (mode === "sale") return "driveaway";
  if (mode === "rent_to_own") return "per month";
  return "per day";
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function filterTheme5Cars(cars: TuroCar[], filters: Theme5Filters) {
  const query = filters.query.trim().toLowerCase();
  let result = cars.filter((car) => isCarAvailableForMode(car, filters.mode));

  if (query) {
    result = result.filter((car) =>
      [
        car.name,
        car.make,
        car.model,
        car.category,
        car.bodyType,
        car.fuelType,
        car.transmission,
        car.description,
        car.location,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  if (filters.make) {
    result = result.filter((car) => car.make.toLowerCase() === filters.make.toLowerCase());
  }
  if (filters.bodyType) {
    result = result.filter((car) => car.bodyType?.toLowerCase() === filters.bodyType.toLowerCase());
  }
  if (filters.fuel) {
    result = result.filter((car) => car.fuelType.toLowerCase() === filters.fuel.toLowerCase());
  }
  if (filters.transmission) {
    result = result.filter(
      (car) => car.transmission.toLowerCase() === filters.transmission.toLowerCase()
    );
  }
  if (filters.year) {
    result = result.filter((car) => String(car.year) === filters.year);
  }
  if (filters.location) {
    const location = filters.location.toLowerCase().replace(", vic", "");
    result = result.filter((car) => car.location.toLowerCase().includes(location.split(",")[0]));
  }
  if (filters.seats) {
    const minimumSeats = Number(filters.seats.replace("+", ""));
    result = result.filter((car) => car.seats >= minimumSeats);
  }
  if (filters.odometer) {
    result = result.filter((car) => {
      const km = car.odometer ?? 0;
      if (filters.odometer === "Under 20,000") return km === 0 || km < 20000;
      if (filters.odometer === "20,000 - 50,000") return km >= 20000 && km <= 50000;
      if (filters.odometer === "50,000 - 100,000") return km >= 50000 && km <= 100000;
      if (filters.odometer === "100,000+") return km >= 100000;
      return true;
    });
  }

  result = result.filter((car) => {
    const price = getCarModePrice(car, filters.mode);
    return !filters.price || price <= filters.price;
  });

  if (filters.sort === "price_low") {
    result.sort((a, b) => getCarModePrice(a, filters.mode) - getCarModePrice(b, filters.mode));
  } else if (filters.sort === "price_high") {
    result.sort((a, b) => getCarModePrice(b, filters.mode) - getCarModePrice(a, filters.mode));
  } else if (filters.sort === "year") {
    result.sort((a, b) => b.year - a.year);
  } else if (filters.sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}

export function createTheme5SearchParams(filters: Theme5Filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== defaultTheme5Filters[key as keyof Theme5Filters]) {
      params.set(key, String(value));
    }
  });
  params.set("mode", filters.mode);
  return params;
}

export function getTheme5FiltersFromSearchParams(searchParams: URLSearchParams): Theme5Filters {
  const mode = normalizeTheme5Mode(searchParams.get("mode"));
  const defaultPrice = mode === "sale" ? 90000 : mode === "rent_to_own" ? 5000 : 500;
  return {
    ...defaultTheme5Filters,
    mode,
    query: searchParams.get("query") ?? "",
    make: searchParams.get("make") ?? "",
    bodyType: searchParams.get("bodyType") ?? "",
    fuel: searchParams.get("fuel") ?? "",
    transmission: searchParams.get("transmission") ?? "",
    year: searchParams.get("year") ?? "",
    odometer: searchParams.get("odometer") ?? "",
    price: Number(searchParams.get("price") ?? defaultPrice),
    location: searchParams.get("location") ?? defaultTheme5Filters.location,
    seats: searchParams.get("seats") ?? "",
    sort: (searchParams.get("sort") as Theme5Filters["sort"]) || "recommended",
  };
}
