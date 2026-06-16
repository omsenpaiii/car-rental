import { Client } from "pg";

const connectionString = process.env.SUPABASE_DB_URL;

if (!connectionString) {
  throw new Error("SUPABASE_DB_URL is required to set up the personal car listings table.");
}

const parsedConnectionString = new URL(connectionString);
parsedConnectionString.searchParams.delete("sslmode");

const client = new Client({
  connectionString: parsedConnectionString.toString(),
  ssl: { rejectUnauthorized: false },
});

const sql = `
create extension if not exists pgcrypto;

create table if not exists public.personal_car_listings (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  year integer not null check (year between 2000 and 2035),
  location text not null default 'Melbourne, VIC',
  price_per_day integer not null check (price_per_day between 30 and 5000),
  enable_rent_to_own boolean not null default false,
  rent_to_own_price integer,
  rent_to_own_months integer,
  enable_direct_sale boolean not null default false,
  sale_price integer,
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  constraint rent_to_own_requirements check (
    enable_rent_to_own = false
    or (
      rent_to_own_price is not null
      and rent_to_own_months is not null
      and rent_to_own_months between 12 and 60
    )
  )
);

alter table public.personal_car_listings add column if not exists enable_direct_sale boolean not null default false;
alter table public.personal_car_listings add column if not exists sale_price integer;

alter table public.personal_car_listings drop constraint if exists sale_requirements;
alter table public.personal_car_listings add constraint sale_requirements check (
  enable_direct_sale = false
  or (
    sale_price is not null
  )
);
`;

try {
  await client.connect();
  await client.query(sql);
  console.log("personal_car_listings is ready");
} finally {
  await client.end();
}
