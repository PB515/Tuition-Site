import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Public parent routes (the invite / reset / login flows) must be reachable logged-out.
const PARENT_PUBLIC = ["/parent/login", "/parent/set-password", "/parent/reset", "/parent/forgot"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    if (!user && path !== "/admin/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    if (user && path === "/admin/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  if (path.startsWith("/parent")) {
    const isPublic = PARENT_PUBLIC.some((p) => path === p || path.startsWith(p + "/"));
    if (!user && !isPublic) {
      const url = request.nextUrl.clone();
      url.pathname = "/parent/login";
      return NextResponse.redirect(url);
    }
    if (user && path === "/parent/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/parent";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = { matcher: ["/admin/:path*", "/parent/:path*"] };
