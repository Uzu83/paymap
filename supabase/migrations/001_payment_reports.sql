-- Paymap tables hosted on toilet-map Supabase until free-project slot frees up.
-- WHY: org free tier = 2 projects (toilet-map + chess-japan). Dedicated paymap project later.

create table if not exists public.payment_reports (
  id uuid primary key default gen_random_uuid(),
  shop_id text not null,
  method text not null
    check (method in ('paypay', 'credit_card', 'transit_ic', 'rakuten_pay', 'aupay', 'cash')),
  kind text not null check (kind in ('worked', 'failed')),
  ip_hash text,
  created_at timestamptz not null default now(),
  constraint payment_reports_shop_id_len check (char_length(shop_id) between 1 and 64)
);

create index if not exists payment_reports_shop_method_idx
  on public.payment_reports (shop_id, method, created_at desc);

alter table public.payment_reports enable row level security;

-- Direct row reads blocked (ip_hash を晒さない)。集計は RPC のみ。
revoke all on table public.payment_reports from anon, authenticated;
grant insert on table public.payment_reports to anon, authenticated;

drop policy if exists "payment_reports_insert_anon" on public.payment_reports;
create policy "payment_reports_insert_anon"
  on public.payment_reports
  for insert
  to anon, authenticated
  with check (true);

create or replace function public.payment_report_stats(p_shop_ids text[] default null)
returns table (
  shop_id text,
  method text,
  worked bigint,
  failed bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    r.shop_id,
    r.method,
    count(*) filter (where r.kind = 'worked')::bigint as worked,
    count(*) filter (where r.kind = 'failed')::bigint as failed
  from public.payment_reports r
  where p_shop_ids is null or r.shop_id = any (p_shop_ids)
  group by r.shop_id, r.method;
$$;

revoke all on function public.payment_report_stats(text[]) from public;
grant execute on function public.payment_report_stats(text[]) to anon, authenticated;
