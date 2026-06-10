"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Bell, Globe, Search, Settings, HelpCircle, LogIn, Award, Check } from "lucide-react";

export default function Theme4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English (AU)");

  const notifications = [
    { id: 1, text: "Welcome to Phillips P2P! Use code P2P15 for 15% off your first trip.", time: "2 hours ago", unread: true },
    { id: 2, text: "Marcus P. verified his Tesla Model 3. Instant book now active.", time: "1 day ago", unread: false },
    { id: 3, text: "Host Dave M. added new photos for the Jeep Wrangler.", time: "2 days ago", unread: false }
  ];

  const languages = ["English (AU)", "English (US)", "English (UK)", "Deutsch", "Français"];

  return (
    <div className="min-h-screen bg-white text-turo-dark flex flex-col font-sans antialiased">
      {/* Sticky Custom Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
          {/* Logo / Branding */}
          <Link href="/theme4" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-turo-purple uppercase">
              PHILLIPS
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 bg-turo-light text-turo-purple rounded-full">
              P2P Rental
            </span>
          </Link>

          {/* Center search bar indicator - clickable */}
          <div 
            onClick={() => router.push("/theme4/search")}
            className="hidden md:flex items-center border border-gray-200 shadow-sm rounded-full py-1.5 px-4 gap-3 cursor-pointer hover:shadow-md hover:border-turo-purple/20 transition-all duration-300"
          >
            <span className="text-sm font-semibold text-gray-800">Melbourne, VIC</span>
            <span className="h-4 w-px bg-gray-200"></span>
            <span className="text-sm text-gray-500 font-medium">Dates & Times</span>
            <span className="h-4 w-px bg-gray-200"></span>
            <div className="bg-turo-purple p-1.5 rounded-full text-white">
              <Search className="size-3.5" />
            </div>
          </div>

          {/* Right Nav Options */}
          <div className="flex items-center gap-4 sm:gap-6 relative">
            <Link
              href="/theme4?tab=lent"
              className="text-sm font-bold text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-full transition-colors hidden sm:block"
            >
              Lend your car
            </Link>

            {/* Notifications Dropdown Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsLanguageOpen(false);
                  setIsProfileOpen(false);
                }}
                className={`text-gray-500 hover:text-turo-purple transition-colors p-1.5 rounded-full hover:bg-gray-50 relative cursor-pointer ${isNotificationsOpen ? "text-turo-purple bg-gray-50" : ""}`} 
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 size-2.5 bg-turo-purple rounded-full border-2 border-white"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl py-3 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 pb-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-black text-sm text-gray-900">Notifications</span>
                    <button className="text-[10px] text-turo-purple font-bold hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 cursor-pointer transition-colors flex gap-2.5">
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
                className={`text-gray-500 hover:text-turo-purple transition-colors p-1.5 rounded-full hover:bg-gray-50 cursor-pointer hidden sm:block ${isLanguageOpen ? "text-turo-purple bg-gray-50" : ""}`} 
                aria-label="Language"
              >
                <Globe className="size-5" />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2.5 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
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
                className={`flex items-center border border-gray-200 rounded-full p-1.5 hover:shadow-sm transition-all gap-2 bg-gray-50 cursor-pointer hover:border-turo-purple/20 ${isProfileOpen ? "border-turo-purple/30 bg-turo-light/30 shadow-inner" : ""}`}
              >
                <div className="bg-turo-purple text-white size-6 rounded-full flex items-center justify-center text-xs font-bold">
                  P
                </div>
                <User className="size-4 text-gray-500" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-black text-gray-900">Phillips Customer</p>
                    <p className="text-[10px] text-gray-400 font-medium">booking@phillipscarrental.com</p>
                  </div>
                  <Link 
                    href="/theme4?tab=lent" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    <Award className="size-4 text-gray-400" />
                    Become a Host
                  </Link>
                  <Link 
                    href="/theme4/search" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    <Search className="size-4 text-gray-400" />
                    Book a Car
                  </Link>
                  <button 
                    onClick={() => {
                      alert("Opening settings panel...");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 text-left transition-colors"
                  >
                    <Settings className="size-4 text-gray-400" />
                    Account Settings
                  </button>
                  <a 
                    href="mailto:booking@phillipscarrental.com.au"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    <HelpCircle className="size-4 text-gray-400" />
                    Help & Support
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={() => {
                      alert("Successfully logged out (Demo mode)");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-xs font-bold text-red-500 text-left transition-colors"
                  >
                    <LogIn className="size-4" />
                    Log out
                  </button>
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
