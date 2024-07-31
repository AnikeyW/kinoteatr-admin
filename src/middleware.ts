import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isAdminPage = request.url.includes("admin");
  const isLoginPage = request.url.includes("login");

  const refreshToken = request.cookies.get("refreshToken")?.value as string;
  const accessToken = request.cookies.get("accessToken")?.value as string;
  console.log(request.cookies);
  console.log("accessToken", accessToken);

  if (isLoginPage) {
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return;
  }

  if (isAdminPage) {
    if (!refreshToken && !accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (refreshToken && !accessToken) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/refresh",
        {
          headers: {
            "Content-Type": "application/json",
            refreshToken,
          },
        },
      );
      const result = await response.json();

      if (!result.admin) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const responseNext = NextResponse.next();

      const setCookieHeader = response.headers.get("set-cookie");

      if (setCookieHeader) {
        const cookies = setCookieHeader
          .split(", ")
          .map((cookie) => cookie.split("; "));
        cookies.forEach((cookieParts) => {
          const [nameValue, ...attributes] = cookieParts;
          const [name, value] = nameValue?.split("=") || [];

          if (name && value) {
            const cookieOptions: any = {};

            attributes.forEach((attr) => {
              const [attrName, attrValue] = attr.split("=");
              switch (attrName.toLowerCase()) {
                case "max-age":
                  cookieOptions.maxAge = parseInt(attrValue, 10);
                  break;
                case "path":
                  cookieOptions.path = attrValue;
                  break;
                case "expires":
                  cookieOptions.expires = new Date(attrValue);
                  break;
                case "httponly":
                  cookieOptions.httpOnly = true;
                  break;
                case "secure":
                  cookieOptions.secure = true;
                  break;
                case "samesite":
                  cookieOptions.sameSite = "none";
                  // cookieOptions.sameSite = attrValue.toLowerCase() as
                  //   | "lax"
                  //   | "strict"
                  //   | "none";
                  break;
              }
            });

            responseNext.cookies.set(name.trim(), value.trim(), cookieOptions);
          }
        });
      }

      return responseNext;
    }
  }
  return;
}

export const config = {
  matcher: ["/admin/:path*", "/login/:path*"],
};
