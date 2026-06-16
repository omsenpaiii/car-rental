import { Client } from "pg";

const connectionString = process.env.SUPABASE_DB_URL;

if (!connectionString) {
  throw new Error("SUPABASE_DB_URL is required to set up the production portal schema.");
}

const parsedConnectionString = new URL(connectionString);
parsedConnectionString.searchParams.delete("sslmode");

const client = new Client({
  connectionString: parsedConnectionString.toString(),
  ssl: { rejectUnauthorized: false },
});

const starterCars = [
  {
    id: "tesla-model-3-2024",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    category: "Electric",
    price_per_day: 85,
    enable_rent: true,
    enable_rent_to_own: true,
    rent_to_own_price: 38000,
    rent_to_own_months: 24,
    enable_direct_sale: false,
    sale_price: null,
    location: "Melbourne CBD, VIC",
    transmission: "Automatic",
    fuel_type: "Electric",
    seats: 5,
    owner_display_name: "Phillips Car Rental",
    owner_email: "booking@phillipscarrental.com.au",
    owner_phone: "1300 315 275",
    image_url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    description: "Brand new Tesla Model 3 ready for Melbourne city rentals, airport pickups, and flexible rent-to-own enquiries.",
  },
  {
    id: "porsche-911-carrera-2023",
    make: "Porsche",
    model: "911 Carrera",
    year: 2023,
    category: "Sport",
    price_per_day: 280,
    enable_rent: true,
    enable_rent_to_own: false,
    rent_to_own_price: null,
    rent_to_own_months: null,
    enable_direct_sale: false,
    sale_price: null,
    location: "St Kilda, VIC",
    transmission: "Automatic",
    fuel_type: "Petrol",
    seats: 4,
    owner_display_name: "Phillips Car Rental",
    owner_email: "booking@phillipscarrental.com.au",
    owner_phone: "1300 315 275",
    image_url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    description: "Premium Porsche 911 Carrera for special events, business travel, and Great Ocean Road drives from Melbourne.",
  },
  {
    id: "ford-mustang-gt-2021",
    make: "Ford",
    model: "Mustang GT",
    year: 2021,
    category: "Sport",
    price_per_day: 160,
    enable_rent: true,
    enable_rent_to_own: false,
    rent_to_own_price: null,
    rent_to_own_months: null,
    enable_direct_sale: true,
    sale_price: 48000,
    location: "South Melbourne, VIC",
    transmission: "Manual",
    fuel_type: "Petrol",
    seats: 4,
    owner_display_name: "Phillips Car Rental",
    owner_email: "booking@phillipscarrental.com.au",
    owner_phone: "1300 315 275",
    image_url: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
    description: "Manual Mustang GT V8 available for rent and direct sale enquiries through Phillips Car Rental Melbourne.",
  },
  {
    id: "tesla-model-y-2024",
    make: "Tesla",
    model: "Model Y",
    year: 2024,
    category: "Electric",
    price_per_day: 95,
    enable_rent: true,
    enable_rent_to_own: true,
    rent_to_own_price: 42000,
    rent_to_own_months: 36,
    enable_direct_sale: false,
    sale_price: null,
    location: "Melbourne CBD, VIC",
    transmission: "Automatic",
    fuel_type: "Electric",
    seats: 5,
    owner_display_name: "Phillips Car Rental",
    owner_email: "booking@phillipscarrental.com.au",
    owner_phone: "1300 315 275",
    image_url: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
    description: "Family-friendly Model Y with flexible rental and rent-to-own options across Melbourne and Victoria.",
  },
  {
    id: "mercedes-amg-c63-2022",
    make: "Mercedes-Benz",
    model: "AMG C63",
    year: 2022,
    category: "Luxury",
    price_per_day: 240,
    enable_rent: true,
    enable_rent_to_own: false,
    rent_to_own_price: null,
    rent_to_own_months: null,
    enable_direct_sale: true,
    sale_price: 65000,
    location: "Toorak, VIC",
    transmission: "Automatic",
    fuel_type: "Petrol",
    seats: 5,
    owner_display_name: "Phillips Car Rental",
    owner_email: "booking@phillipscarrental.com.au",
    owner_phone: "1300 315 275",
    image_url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    description: "Luxury AMG C63 for premium Melbourne hires and vetted buyer enquiries.",
  },
];

const schemaSql = `
create extension if not exists pgcrypto;
create schema if not exists app_private;

do $$
begin
  create type public.profile_role as enum ('user', 'admin');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.listing_status as enum ('draft', 'pending_review', 'approved', 'rejected', 'archived');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.enquiry_mode as enum ('rent', 'rent_to_own', 'sale');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.enquiry_status as enum ('new', 'contacted', 'closed', 'cancelled');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  role public.profile_role not null default 'user',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vehicle_listings (
  id text primary key default gen_random_uuid()::text,
  owner_id uuid references auth.users(id) on delete set null,
  source text not null default 'host' check (source in ('host', 'phillips', 'legacy')),
  make text not null,
  model text not null,
  year integer not null check (year between 2000 and 2035),
  category text not null check (category in ('Electric', 'Sport', 'SUV', 'Luxury', 'Classic')),
  location text not null default 'Melbourne, VIC',
  price_per_day integer check (price_per_day between 30 and 5000),
  enable_rent boolean not null default true,
  enable_rent_to_own boolean not null default false,
  rent_to_own_price integer,
  rent_to_own_months integer,
  enable_direct_sale boolean not null default false,
  sale_price integer,
  status public.listing_status not null default 'pending_review',
  transmission text not null default 'Automatic' check (transmission in ('Automatic', 'Manual')),
  fuel_type text not null default 'Petrol' check (fuel_type in ('Electric', 'Petrol', 'Hybrid')),
  seats integer not null default 5 check (seats between 2 and 12),
  body_type text not null default 'Sedan' check (body_type in ('SUV', 'Sedan', 'Hatchback', 'Ute', 'Van', 'Wagon', 'Coupe', 'Convertible', 'Other')),
  colour text,
  odometer integer check (odometer is null or odometer between 0 and 1000000),
  has_leather_seats boolean not null default false,
  has_4x4 boolean not null default false,
  description text,
  features text[] not null default array['Bluetooth', 'USB Charger', 'GPS'],
  image_url text,
  owner_display_name text not null,
  owner_email text not null,
  owner_phone text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint vehicle_listing_has_mode check (enable_rent or enable_rent_to_own or enable_direct_sale),
  constraint vehicle_listing_rent_price check (enable_rent = false or price_per_day is not null),
  constraint vehicle_listing_rto_requirements check (
    enable_rent_to_own = false
    or (
      rent_to_own_price is not null
      and rent_to_own_months is not null
      and rent_to_own_months between 12 and 60
    )
  ),
  constraint vehicle_listing_sale_requirements check (
    enable_direct_sale = false
    or sale_price is not null
  )
);

alter table public.vehicle_listings add column if not exists body_type text not null default 'Sedan';
alter table public.vehicle_listings add column if not exists colour text;
alter table public.vehicle_listings add column if not exists odometer integer;
alter table public.vehicle_listings add column if not exists has_leather_seats boolean not null default false;
alter table public.vehicle_listings add column if not exists has_4x4 boolean not null default false;

create table if not exists public.listing_photos (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null references public.vehicle_listings(id) on delete cascade,
  owner_id uuid references auth.users(id) on delete set null,
  bucket text not null default 'vehicle-photos',
  storage_path text not null,
  public_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null references public.vehicle_listings(id) on delete cascade,
  requester_id uuid not null references auth.users(id) on delete cascade,
  owner_id uuid references auth.users(id) on delete set null,
  mode public.enquiry_mode not null default 'rent',
  status public.enquiry_status not null default 'new',
  requester_name text not null,
  requester_email text not null,
  requester_phone text not null,
  pickup_date date,
  return_date date,
  delivery_location text,
  message text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  listing_id text references public.vehicle_listings(id) on delete cascade,
  enquiry_id uuid references public.enquiries(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  note text not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint admin_note_has_target check (listing_id is not null or enquiry_id is not null)
);

create or replace function app_private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

grant usage on schema app_private to anon, authenticated;
grant execute on function app_private.is_admin() to anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.vehicle_listings to anon, authenticated;
grant select, insert, update on public.profiles to anon, authenticated;
grant select, insert, update on public.vehicle_listings to authenticated;
grant select, insert, update on public.listing_photos to authenticated;
grant select, insert, update on public.enquiries to authenticated;
grant select, insert on public.admin_notes to authenticated;

alter table public.profiles enable row level security;
alter table public.vehicle_listings enable row level security;
alter table public.listing_photos enable row level security;
alter table public.enquiries enable row level security;
alter table public.admin_notes enable row level security;

drop policy if exists "profiles owner select" on public.profiles;
create policy "profiles owner select" on public.profiles
for select to anon, authenticated using (true);

drop policy if exists "profiles owner insert" on public.profiles;
create policy "profiles owner insert" on public.profiles
for insert to anon, authenticated with check (id = auth.uid() or auth.uid() is null);

drop policy if exists "profiles owner update" on public.profiles;
create policy "profiles owner update" on public.profiles
for update to authenticated using (id = auth.uid() or app_private.is_admin())
with check (id = auth.uid() or app_private.is_admin());

drop policy if exists "approved listings public read" on public.vehicle_listings;
create policy "approved listings public read" on public.vehicle_listings
for select to anon, authenticated using (status = 'approved' or owner_id = auth.uid() or app_private.is_admin());

drop policy if exists "owners create listings" on public.vehicle_listings;
create policy "owners create listings" on public.vehicle_listings
for insert to authenticated with check (owner_id = auth.uid() or app_private.is_admin());

drop policy if exists "owners update reviewable listings" on public.vehicle_listings;
create policy "owners update reviewable listings" on public.vehicle_listings
for update to authenticated using (
  app_private.is_admin()
  or (
    owner_id = auth.uid()
    and status in ('draft', 'pending_review', 'rejected')
  )
) with check (
  app_private.is_admin()
  or (
    owner_id = auth.uid()
    and status in ('draft', 'pending_review', 'rejected')
  )
);

drop policy if exists "listing photos read approved" on public.listing_photos;
create policy "listing photos read approved" on public.listing_photos
for select to anon, authenticated using (
  exists (
    select 1 from public.vehicle_listings vl
    where vl.id = listing_id
      and (vl.status = 'approved' or vl.owner_id = auth.uid() or app_private.is_admin())
  )
);

drop policy if exists "owners manage listing photos" on public.listing_photos;
create policy "owners manage listing photos" on public.listing_photos
for all to authenticated using (owner_id = auth.uid() or app_private.is_admin())
with check (owner_id = auth.uid() or app_private.is_admin());

drop policy if exists "enquiry participants read" on public.enquiries;
create policy "enquiry participants read" on public.enquiries
for select to authenticated using (
  requester_id = auth.uid()
  or owner_id = auth.uid()
  or app_private.is_admin()
);

drop policy if exists "authenticated users create enquiries" on public.enquiries;
create policy "authenticated users create enquiries" on public.enquiries
for insert to authenticated with check (requester_id = auth.uid());

drop policy if exists "admins update enquiries" on public.enquiries;
create policy "admins update enquiries" on public.enquiries
for update to authenticated using (app_private.is_admin())
with check (app_private.is_admin());

drop policy if exists "admins manage notes" on public.admin_notes;
create policy "admins manage notes" on public.admin_notes
for all to authenticated using (app_private.is_admin())
with check (app_private.is_admin());

insert into storage.buckets (id, name, public)
values ('vehicle-photos', 'vehicle-photos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "vehicle photos public read" on storage.objects;
create policy "vehicle photos public read" on storage.objects
for select to public using (bucket_id = 'vehicle-photos');

drop policy if exists "vehicle photos users upload own folder" on storage.objects;
create policy "vehicle photos users upload own folder" on storage.objects
for insert to authenticated with check (
  bucket_id = 'vehicle-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "vehicle photos users update own folder" on storage.objects;
create policy "vehicle photos users update own folder" on storage.objects
for update to authenticated using (
  bucket_id = 'vehicle-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);
`;

try {
  await client.connect();
  await client.query(schemaSql);

  for (const car of starterCars) {
    await client.query(
      `insert into public.vehicle_listings (
        id,
        owner_id,
        source,
        make,
        model,
        year,
        category,
        location,
        price_per_day,
        enable_rent,
        enable_rent_to_own,
        rent_to_own_price,
        rent_to_own_months,
        enable_direct_sale,
        sale_price,
        status,
        transmission,
        fuel_type,
        seats,
        body_type,
        colour,
        odometer,
        has_leather_seats,
        has_4x4,
        description,
        image_url,
        owner_display_name,
        owner_email,
        owner_phone
      ) values (
        $1, null, 'phillips', $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, 'approved', $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26
      )
      on conflict (id) do update set
        source = 'phillips',
        status = 'approved',
        price_per_day = excluded.price_per_day,
        enable_rent = excluded.enable_rent,
        enable_rent_to_own = excluded.enable_rent_to_own,
        rent_to_own_price = excluded.rent_to_own_price,
        rent_to_own_months = excluded.rent_to_own_months,
        enable_direct_sale = excluded.enable_direct_sale,
        sale_price = excluded.sale_price,
        body_type = excluded.body_type,
        colour = excluded.colour,
        odometer = excluded.odometer,
        has_leather_seats = excluded.has_leather_seats,
        has_4x4 = excluded.has_4x4,
        description = excluded.description,
        image_url = excluded.image_url,
        updated_at = timezone('utc', now())`,
      [
        car.id,
        car.make,
        car.model,
        car.year,
        car.category,
        car.location,
        car.price_per_day,
        car.enable_rent,
        car.enable_rent_to_own,
        car.rent_to_own_price,
        car.rent_to_own_months,
        car.enable_direct_sale,
        car.sale_price,
        car.transmission,
        car.fuel_type,
        car.seats,
        car.category === "SUV" ? "SUV" : car.category === "Sport" ? "Coupe" : "Sedan",
        null,
        null,
        car.category === "Luxury",
        car.category === "SUV",
        car.description,
        car.image_url,
        car.owner_display_name,
        car.owner_email,
        car.owner_phone,
      ]
    );
  }

  await client.query(`
    insert into public.vehicle_listings (
      id,
      owner_id,
      source,
      make,
      model,
      year,
      category,
      location,
      price_per_day,
      enable_rent,
      enable_rent_to_own,
      rent_to_own_price,
      rent_to_own_months,
      enable_direct_sale,
      sale_price,
      status,
      transmission,
      fuel_type,
      seats,
      body_type,
      colour,
      odometer,
      has_leather_seats,
      has_4x4,
      description,
      image_url,
      owner_display_name,
      owner_email,
      owner_phone,
      created_at
    )
    select
      pcl.id::text,
      null,
      'legacy',
      pcl.make,
      pcl.model,
      pcl.year,
      case
        when lower(pcl.make) like '%tesla%' then 'Electric'
        when lower(pcl.make) like '%jeep%' then 'SUV'
        when lower(pcl.make) like '%mercedes%' or lower(pcl.make) like '%bmw%' or lower(pcl.make) like '%audi%' then 'Luxury'
        else 'Sport'
      end,
      pcl.location,
      pcl.price_per_day,
      true,
      pcl.enable_rent_to_own,
      pcl.rent_to_own_price,
      pcl.rent_to_own_months,
      coalesce(pcl.enable_direct_sale, false),
      pcl.sale_price,
      'pending_review',
      'Automatic',
      case when lower(pcl.make) like '%tesla%' then 'Electric' else 'Petrol' end,
      5,
      case
        when lower(pcl.model) like '%hatch%' then 'Hatchback'
        when lower(pcl.model) like '%suv%' then 'SUV'
        else 'Sedan'
      end,
      null,
      null,
      false,
      false,
      'Migrated owner listing awaiting Phillips Car Rental admin review.',
      null,
      'Legacy Melbourne host',
      'booking@phillipscarrental.com.au',
      '1300 315 275',
      pcl.created_at
    from public.personal_car_listings pcl
    where to_regclass('public.personal_car_listings') is not null
    on conflict (id) do nothing;
  `).catch((error) => {
    if (error?.code !== "42P01") throw error;
  });

  console.log("production portal schema, policies, storage bucket, and starter inventory are ready");
} finally {
  await client.end();
}
