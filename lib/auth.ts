import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * For use inside Route Handlers.
 * Returns a 401 NextResponse if the request has no valid Supabase session,
 * otherwise returns null (caller continues).
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
