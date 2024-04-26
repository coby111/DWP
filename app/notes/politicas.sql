alter table public.products enable row level security;

create policy "Solo los usuarios autenticados pueden leer las notas"
on public.products for select
to authenticated
using ( true );

create policy "Solo los usuarios autenticados pueden registrar las notas"
on public.products for insert
to authenticated
WITH CHECK ( true );

create policy "Solo los usuarios autenticados pueden actualizar las notas"
on public.products for update
to authenticated
using ( true );

create policy "Solo los usuarios autenticados pueden eliminar las notas"
on public.products for delete
to authenticated
using ( true );