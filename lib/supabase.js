import { createClient } from "@supabase/supabase-js";

// Klien ini hanya dipakai di sisi server (Server Component, Server Action, Route Handler).
// Jangan import file ini dari komponen yang memakai "use client".
export const supabaseServer = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

