export const legacyRouteRedirects = [
  { source: "/theme2", destination: "/" },
  { source: "/theme3", destination: "/" },
  { source: "/theme4", destination: "/" },
  { source: "/theme4/search", destination: "/search" },
  { source: "/theme4/car/:id*", destination: "/car/:id*" },
  { source: "/theme4/policies/:path*", destination: "/policies/:path*" },
  { source: "/our-fleets", destination: "/search" },
  { source: "/search-your-car", destination: "/search" },
  { source: "/track-order", destination: "/account" },
] as const;

export function normalizePrimaryHref(href: string) {
  return href
    .replace(/^\/theme4\/search/, "/search")
    .replace(/^\/theme4\/car/, "/car")
    .replace(/^\/theme4\/policies/, "/policies")
    .replace(/^\/theme4(?=\?|$)/, "/");
}
