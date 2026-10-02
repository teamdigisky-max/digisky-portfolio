insert into storage.buckets (id, name, public)
values ('project-thumbnails', 'project-thumbnails', true)
on conflict (id) do update set public = true;

update public.site_content as content_row
set content = jsonb_set(
  content_row.content,
  '{projects}',
  coalesce(
    (
      select jsonb_agg(
        case
          when nullif(project.value->>'thumbnail_url', '') ~* '(thum\.io|api\.microlink\.io|^(data:|blob:))' then
            project.value || jsonb_build_object(
              'thumbnail_url', '',
              'thumbnail_source', 'automatic',
              'image', ''
            )
          when nullif(project.value->>'thumbnail_url', '') is not null then
            project.value || jsonb_build_object(
              'thumbnail_source',
              case
                when project.value->>'thumbnail_source' in ('manual', 'automatic')
                  then project.value->>'thumbnail_source'
                when project.value->>'thumbnail_url' ~* '(thum\.io|api\.microlink\.io|^(data:|blob:))'
                  then 'automatic'
                else 'manual'
              end
            )
          when nullif(project.value->>'image', '') is not null
            and project.value->>'image' !~* '(thum\.io|api\.microlink\.io|^(data:|blob:))' then
            project.value || jsonb_build_object(
              'thumbnail_url', project.value->>'image',
              'thumbnail_source', 'manual'
            )
          else
            project.value || jsonb_build_object(
              'thumbnail_url', '',
              'thumbnail_source', 'automatic',
              'image', ''
            )
        end
        order by project.ordinality
      )
      from jsonb_array_elements(
        case
          when jsonb_typeof(content_row.content->'projects') = 'array'
            then content_row.content->'projects'
          else '[]'::jsonb
        end
      ) with ordinality as project(value, ordinality)
    ),
    '[]'::jsonb
  ),
  true
)
where content_row.id = 'homepage'
  and jsonb_typeof(content_row.content->'projects') = 'array';

create or replace function public.save_automatic_project_thumbnail(
  p_project_id text,
  p_thumbnail_url text,
  p_allow_manual_override boolean default false,
  p_expected_thumbnail_url text default null,
  p_expected_project_url text default null
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  updated_rows integer;
begin
  update public.site_content as content_row
  set content = jsonb_set(
        content_row.content,
        '{projects}',
        (
          select jsonb_agg(
            case
              when project.value->>'id' = p_project_id
                and project.value->>'url' = p_expected_project_url
                and (
                  coalesce(project.value->>'thumbnail_source', 'automatic') <> 'manual'
                  or (
                    p_allow_manual_override
                    and coalesce(project.value->>'thumbnail_url', '') = coalesce(p_expected_thumbnail_url, '')
                  )
                ) then
                project.value || jsonb_build_object(
                  'thumbnail_url', p_thumbnail_url,
                  'thumbnail_source', 'automatic',
                  'image', p_thumbnail_url
                )
              else project.value
            end
            order by project.ordinality
          )
          from jsonb_array_elements(content_row.content->'projects')
            with ordinality as project(value, ordinality)
        ),
        true
      ),
      updated_at = now()
  where content_row.id = 'homepage'
    and jsonb_typeof(content_row.content->'projects') = 'array'
    and exists (
      select 1
      from jsonb_array_elements(content_row.content->'projects') as project(value)
      where project.value->>'id' = p_project_id
        and project.value->>'url' = p_expected_project_url
        and (
          coalesce(project.value->>'thumbnail_source', 'automatic') <> 'manual'
          or (
            p_allow_manual_override
            and coalesce(project.value->>'thumbnail_url', '') = coalesce(p_expected_thumbnail_url, '')
          )
        )
    );

  get diagnostics updated_rows = row_count;
  return updated_rows > 0;
end;
$$;

revoke all on function public.save_automatic_project_thumbnail(text, text, boolean, text, text) from public, anon, authenticated;
grant execute on function public.save_automatic_project_thumbnail(text, text, boolean, text, text) to service_role;
