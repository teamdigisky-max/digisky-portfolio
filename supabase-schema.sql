drop table if exists public.site_content;

create table public.site_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "Public can read homepage content"
on public.site_content for select
using (true);

create policy "Admin client can insert homepage content"
on public.site_content for insert
with check (id = 'homepage');

create policy "Admin client can update homepage content"
on public.site_content for update
using (id = 'homepage')
with check (id = 'homepage');

insert into public.site_content (id, content)
values ('homepage', '{}'::jsonb)
on conflict (id) do nothing;
