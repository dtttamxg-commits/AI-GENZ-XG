-- Run once in Supabase SQL Editor. Safe to run again; does not reset data.
create table if not exists public.toan10_state (
  id text primary key check (id = 'main'),
  data jsonb not null,
  version bigint not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.toan10_state enable row level security;
revoke all on public.toan10_state from anon, authenticated;
grant select, insert, update on public.toan10_state to service_role;
create or replace function public.toan10_save_state(expected_version bigint, next_data jsonb)
returns boolean language plpgsql security invoker set search_path = public as $$
begin
  update public.toan10_state set data=next_data, version=version+1, updated_at=now()
  where id='main' and version=expected_version;
  return found;
end;
$$;
revoke all on function public.toan10_save_state(bigint,jsonb) from public, anon, authenticated;
grant execute on function public.toan10_save_state(bigint,jsonb) to service_role;
insert into storage.buckets(id,name,public,file_size_limit)
values ('toan10-media','toan10-media',true,2621440)
on conflict (id) do nothing;
-- Bucket is public for educational assets only. No anonymous upload policy is created.
-- Never upload student data or backups to this bucket.
