-- ============================================================
--  Smart Energy Meter - Supabase schema
--  Run this in:  Supabase Dashboard -> SQL Editor -> New query
-- ============================================================

-- 1. Main readings table -------------------------------------
create table if not exists public.readings (
  id            bigint generated always as identity primary key,
  device_id     text        not null default 'meter_01',
  voltage       double precision,   -- Volts
  current       double precision,   -- Amps
  power         double precision,   -- Watts
  energy        double precision,   -- kWh (cumulative)
  frequency     double precision,   -- Hz
  power_factor  double precision,   -- 0..1
  created_at    timestamptz not null default now()
);

-- 2. Indexes for fast "latest" and "history" queries ---------
create index if not exists idx_readings_created_at
  on public.readings (created_at desc);

create index if not exists idx_readings_device_time
  on public.readings (device_id, created_at desc);

-- 3. Row Level Security --------------------------------------
alter table public.readings enable row level security;

-- Allow the ESP32 (using the anon key) to INSERT readings
drop policy if exists "anon can insert readings" on public.readings;
create policy "anon can insert readings"
  on public.readings
  for insert
  to anon
  with check (true);

-- Allow the website / mobile app (anon key) to READ readings
drop policy if exists "anon can read readings" on public.readings;
create policy "anon can read readings"
  on public.readings
  for select
  to anon
  using (true);

-- Allow the dashboard (anon key) to DELETE readings
-- (used by the "Delete data" / "Clear old data" buttons)
drop policy if exists "anon can delete readings" on public.readings;
create policy "anon can delete readings"
  on public.readings
  for delete
  to anon
  using (true);

-- 4. Convenience view: newest reading per device ------------
create or replace view public.latest_reading as
select distinct on (device_id)
  device_id, voltage, current, power, energy,
  frequency, power_factor, created_at
from public.readings
order by device_id, created_at desc;

-- ============================================================
--  SECURITY NOTE
--  The policies above let anyone with the ANON key insert and
--  read rows. That is fine for a college / demo project. For a
--  real deployment, use a Supabase service_role key on the
--  device or add a device-token check in the WITH CHECK clause.
-- ============================================================
