"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, Bell, Globe, Search, Settings, HelpCircle, LogIn, Check } from "lucide-react";

import { AuthPanel } from "@/components/portal/auth-panel";
import { useAuth } from "@/components/portal/auth-provider";

export function PortalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/theme4" || pathname === "/theme4/";
  const { user, profile, isLoading, logout } = useAuth();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English (AU)");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isLightHeader = !isHome || isScrolled;

  const notifications = [
    { id: 1, text: "Welcome to Phillips Car Rental. Melbourne listings are reviewed before going live.", time: "2 hours ago", unread: true },
    { id: 2, text: "Marcus P. verified his Tesla Model 3. Instant book now active.", time: "1 day ago", unread: false },
    { id: 3, text: "Host Dave M. added new photos for the Jeep Wrangler.", time: "2 days ago", unread: false }
  ];

  const languages = ["English (AU)", "English (US)", "English (UK)", "Deutsch", "Français"];

  return (
    <div className="min-h-screen bg-white text-turo-dark flex flex-col font-sans antialiased">
      {/* Sticky Custom Header */}
      <header className={`z-50 transition-all duration-300 ${
        isHome 
          ? isScrolled 
            ? "sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm" 
            : "absolute top-0 left-0 right-0 bg-transparent border-none" 
          : "sticky top-0 bg-white border-b border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
          {/* Logo / Branding */}
          <Link href="/" className="flex items-center gap-2">
            <span className={`text-xl sm:text-2xl font-black tracking-tight uppercase transition-colors duration-300 ${
              isLightHeader ? "text-turo-purple" : "text-white"
            }`}>
              PHILLIPS
            </span>
            <span className={`hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full transition-colors duration-300 ${
              isLightHeader ? "bg-turo-light text-turo-purple" : "bg-white/20 text-white"
            }`}>
              P2P
            </span>
          </Link>

          {/* Center search bar indicator - clickable */}
          <div 
            onClick={() => router.push("/search")}
            className={`hidden md:flex items-center border shadow-sm rounded-full py-1.5 px-4 gap-3 cursor-pointer transition-all duration-300 ${
              isLightHeader 
                ? "border-gray-200 bg-white text-gray-800 hover:shadow-md hover:border-turo-purple/20" 
                : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
            }`}
          >
            <span className={`text-sm font-semibold transition-colors duration-300 ${isLightHeader ? "text-gray-800" : "text-white"}`}>Melbourne, VIC</span>
            <span className={`h-4 w-px transition-colors duration-300 ${isLightHeader ? "bg-gray-200" : "bg-white/20"}`}></span>
            <span className={`text-sm font-medium transition-colors duration-300 ${isLightHeader ? "text-gray-500" : "text-white/80"}`}>Dates & Times</span>
            <span className={`h-4 w-px transition-colors duration-300 ${isLightHeader ? "bg-gray-200" : "bg-white/20"}`}></span>
            <div className={`p-1.5 rounded-full transition-colors duration-300 ${isLightHeader ? "bg-turo-purple text-white" : "bg-white text-turo-purple"}`}>
              <Search className="size-3.5" />
            </div>
          </div>

          {/* Right Nav Options */}
          <div className="flex items-center gap-4 sm:gap-6 relative">
            <Link
              href="/?tab=sell"
              className={`text-sm font-bold px-3 py-2 rounded-full transition-colors hidden sm:block ${
                isLightHeader ? "text-gray-800 hover:bg-gray-55" : "text-white hover:bg-white/10"
              }`}
            >
              Sell your car
            </Link>

            {/* Notifications Dropdown Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsLanguageOpen(false);
                  setIsProfileOpen(false);
                }}
                className={`transition-colors p-1.5 rounded-full relative cursor-pointer ${
                  isLightHeader 
                    ? "text-gray-500 hover:text-turo-purple hover:bg-gray-50" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
                } ${isNotificationsOpen ? (isLightHeader ? "bg-gray-55 text-turo-purple" : "bg-white/20 text-white") : ""}`} 
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 size-2.5 bg-turo-purple rounded-full border-2 border-white"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2.5 z-55 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl py-3 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 pb-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-black text-sm text-gray-900">Notifications</span>
                    <button className="text-[10px] text-turo-purple font-bold hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-55 last:border-b-0 cursor-pointer transition-colors flex gap-2.5">
                        <div className="size-1.5 bg-turo-purple rounded-full shrink-0 mt-2"></div>
                        <div>
                          <p className="text-xs font-semibold text-gray-700 leading-normal">{n.text}</p>
                          <span className="text-[10px] text-gray-400 font-medium mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Dropdown Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsNotificationsOpen(false);
                  setIsProfileOpen(false);
                }}
                className={`transition-colors p-1.5 rounded-full cursor-pointer hidden sm:block ${
                  isLightHeader 
                    ? "text-gray-500 hover:text-turo-purple hover:bg-gray-55" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
                } ${isLanguageOpen ? (isLightHeader ? "bg-gray-55 text-turo-purple" : "bg-white/20 text-white") : ""}`} 
                aria-label="Language"
              >
                <Globe className="size-5" />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2.5 z-55 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <span className="block px-4 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Select Language</span>
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLanguageOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 flex justify-between items-center transition-colors"
                    >
                      {lang}
                      {selectedLanguage === lang && <Check className="size-3.5 text-turo-purple" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                  setIsLanguageOpen(false);
                }}
                className={`flex items-center border rounded-full p-1.5 hover:shadow-sm transition-all gap-2 cursor-pointer ${
                  isLightHeader 
                    ? "border-gray-200 bg-gray-55 hover:border-turo-purple/20" 
                    : "border-white/20 bg-white/10 hover:border-white/35 hover:bg-white/20"
                } ${isProfileOpen ? (isLightHeader ? "border-turo-purple/30 bg-turo-light/30 shadow-inner" : "border-white/35 bg-white/20") : ""}`}
              >
                <div className="bg-turo-purple text-white size-6 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  P
                </div>
                <User className={`size-4 transition-colors duration-300 ${isLightHeader ? "text-gray-500" : "text-white/80"}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-black text-gray-900">
                      {isLoading ? "Checking session..." : profile?.full_name || profile?.email || "Guest"}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {profile?.email || "Log in to list and enquire"}
                    </p>
                  </div>
                  {user ? (
                    <>
                      <Link 
                        href="/search" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                      >
                        <Search className="size-4 text-gray-400" />
                        Book a Car
                      </Link>
                      <Link 
                        href="/account"
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 text-left transition-colors"
                      >
                        <Settings className="size-4 text-gray-400" />
                        Account Dashboard
                      </Link>
                      {profile?.role === "admin" ? (
                        <Link
                          href="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-turo-purple text-left transition-colors"
                        >
                          <Settings className="size-4" />
                          Admin Panel
                        </Link>
                      ) : null}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsAuthOpen(true);
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-turo-purple text-left transition-colors"
                    >
                      <LogIn className="size-4" />
                      Log in or register
                    </button>
                  )}
                  <a 
                    href="mailto:booking@phillipscarrental.com.au"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    <HelpCircle className="size-4 text-gray-400" />
                    Help & Support
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  {user ? (
                    <button 
                      onClick={async () => {
                        await logout();
                        setIsProfileOpen(false);
                        router.refresh();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-red-500 text-left transition-colors"
                    >
                      <LogIn className="size-4" />
                      Log out
                    </button>
                  ) : null}
                </div>
              )}
            </div>
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
              Phillips Car Rental
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">About Phillips Car Rental</Link></li>
              <li><Link href="/" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">How it works (Renting)</Link></li>
              <li><Link href="/?tab=rto" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">How it works (Rent to Own)</Link></li>
              <li><Link href="/policies/terms" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Policies & Trust</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/search" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Find a Car</Link></li>
              <li><Link href="/search?category=Electric" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Electric Vehicles</Link></li>
              <li><Link href="/search?category=Sport" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Sports & Exotic</Link></li>
              <li><Link href="/search?category=SUV" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">SUVs & Trucks</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
              Hosting
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/?tab=sell" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Sell your car</Link></li>
              <li><Link href="/?tab=rto" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Rent to own</Link></li>
              <li><Link href="/search" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Browse cars</Link></li>
              <li><Link href="/account" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Account</Link></li>
              <li><Link href="/policies/terms" className="text-sm text-gray-600 hover:text-turo-purple transition-colors">Insurance disclaimers</Link></li>
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
            © {new Date().getFullYear()} Phillips Car Rental. Melbourne peer-to-peer marketplace.
          </p>
          <div className="flex gap-6">
            <Link href="/policies/terms" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Terms of Service</Link>
            <a href="#" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-turo-purple transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

      {isAuthOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <button
              type="button"
              onClick={() => setIsAuthOpen(false)}
              className="mb-3 ml-auto block rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white"
            >
              Close
            </button>
            <AuthPanel onAuthenticated={() => setIsAuthOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PortalShell;
