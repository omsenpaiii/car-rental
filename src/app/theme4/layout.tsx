import React from "react";
import Link from "next/link";
import { User, Bell, Globe, Search } from "lucide-react";

export const metadata = {
  title: "Phillips Car Rental - Premium P2P Marketplace",
  description: "Find the perfect car for your next trip, or list yours to earn extra income.",
};

export default function Theme4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-turo-dark flex flex-col font-sans antialiased">
      {/* Sticky Custom Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Branding */}
          <Link href="/theme4" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-turo-purple uppercase">
              PHILLIPS
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 bg-turo-light text-turo-purple rounded-full">
              P2P Rental
            </span>
          </Link>

          {/* Center search bar indicator - shown on inner pages */}
          <div className="hidden md:flex items-center border border-gray-200 shadow-sm rounded-full py-1.5 px-4 gap-3 cursor-pointer hover:shadow-md transition-shadow">
            <span className="text-sm font-medium text-gray-700">Melbourne, VIC</span>
            <span className="h-4 w-px bg-gray-200"></span>
            <span className="text-sm text-gray-500">Dates & Times</span>
            <span className="h-4 w-px bg-gray-200"></span>
            <div className="bg-turo-purple p-1.5 rounded-full text-white">
              <Search className="size-3.5" />
            </div>
          </div>

          {/* Right Nav Options */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/theme4?tab=lent"
              className="text-sm font-semibold text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-full transition-colors hidden sm:block"
            >
              Lend your car
            </Link>
            <button className="text-gray-500 hover:text-gray-700 transition-colors p-1" aria-label="Notifications">
              <Bell className="size-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors p-1 hidden sm:block" aria-label="Language">
              <Globe className="size-5" />
            </button>
            <button className="flex items-center border border-gray-200 rounded-full p-1.5 hover:shadow-sm transition-shadow gap-2 bg-gray-50">
              <div className="bg-turo-purple text-white size-6 rounded-full flex items-center justify-center text-xs font-bold">
                P
              </div>
              <User className="size-4 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Turo-style Footer */}
      <footer className="bg-turo-gray border-t border-gray-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Phillips P2P
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/theme4" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">About Phillips P2P</Link></li>
              <li><Link href="/theme4?tab=lent" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">How it works (Lending)</Link></li>
              <li><Link href="/theme4" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">How it works (Renting)</Link></li>
              <li><Link href="/theme4" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Policies & Trust</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/theme4/search" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Find a Car</Link></li>
              <li><Link href="/theme4/search?category=Electric" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Electric Vehicles</Link></li>
              <li><Link href="/theme4/search?category=Sport" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Sports & Exotic</Link></li>
              <li><Link href="/theme4/search?category=SUV" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">SUVs & Trucks</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Hosting
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/theme4?tab=lent" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">List your car</Link></li>
              <li><Link href="/theme4" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Car calculator</Link></li>
              <li><Link href="/theme4" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Host stories</Link></li>
              <li><Link href="/theme4" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Host insurance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="font-semibold text-gray-800">Phillips Car Rental</li>
              <li>132 Indian Dr, Keysborough</li>
              <li>Melbourne VIC 3173</li>
              <li>Tel: 1300 315 275</li>
              <li>Email: booking@phillipscarrental.com.au</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Phillips Car Rental P2P. Clone theme designed for demonstration.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
