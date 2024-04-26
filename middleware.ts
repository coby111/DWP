import { NextResponse, type NextRequest } from "next/server";
import { createClient, updateSession } from "@/utils/supabase/middleware";

const routes = [
  '/products',
  '/notes',
  '/password',
  '/imageGallery'
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    const { supabase, response } = createClient(request);

    const { data: { session } } = await supabase.auth.getSession();

    console.log(session);
    if (!session && routes.some(route => request.nextUrl.pathname.startsWith(route))) {
      console.log("redirect");
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return response;

  } catch (e) {
    console.error('Error in middleware', e);
    return NextResponse.next({
      status: 500,
      statusText: 'Error del servidor'
    })
  }

}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
