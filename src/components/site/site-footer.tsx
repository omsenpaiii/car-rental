import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-data";

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V9c0-.9.3-1.5 1.6-1.5H16.7V4.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.1H7.6V14h2.7v8h3.2Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.7A3.1 3.1 0 0 0 4.7 7.8v8.4a3.1 3.1 0 0 0 3.1 3.1h8.4a3.1 3.1 0 0 0 3.1-3.1V7.8a3.1 3.1 0 0 0-3.1-3.1H7.8Zm8.9 1.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1fr] lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-400 text-lg font-bold text-slate-950">
              P
            </div>
            <div>
              <p className="text-lg font-semibold">{siteConfig.brand}</p>
              <p className="text-sm text-slate-400">EST. 2015</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">
            We are building a polished, practical rental experience for Melbourne drivers who
            care about clean vehicles, easy booking, and responsive support.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Explore</h3>
          {siteConfig.nav.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-400 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Quick links</h3>
          <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
            FAQ&apos;s
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Quick Contact</h3>
          <div className="flex items-start gap-3 text-sm text-slate-400">
            <MapPin className="mt-0.5 size-4 shrink-0 text-amber-400" />
            <span>{siteConfig.address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Phone className="size-4 text-amber-400" />
            <span>{siteConfig.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Mail className="size-4 text-amber-400" />
            <span>{siteConfig.email}</span>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-amber-400 hover:text-white"
              aria-label="Facebook"
            >
              <FacebookMark />
            </a>
            <a
              href="#"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-amber-400 hover:text-white"
              aria-label="Instagram"
            >
              <InstagramMark />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright © 2026 All rights reserved.</p>
          <p>WhatsApp us</p>
        </div>
      </div>
    </footer>
  );
}
