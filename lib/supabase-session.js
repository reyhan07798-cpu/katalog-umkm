import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Klien Supabase berbasis sesi (cookie) untuk admin.
// Dipakai di Server Component, Server Action, dan Route Handler.
export async function supabaseSession() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

