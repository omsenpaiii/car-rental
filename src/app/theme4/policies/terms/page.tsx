"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, FileText, UserCheck, Key, HelpCircle } from "lucide-react";

export default function Theme4TermsPage() {
  const [activeTab, setActiveTab] = useState<"renter" | "host" | "rto">("renter");

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Top Banner Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link
              href="/theme4"
              className="inline-flex items-center gap-2 text-xs font-bold text-turo-purple hover:underline mb-2"
            >
              <ArrowLeft className="size-3.5" />
              Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Shield className="text-turo-purple size-7 shrink-0" />
              Platform Policies & Terms of Service
            </h1>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-full">
            Last Updated: June 2026
          </span>
        </div>
      </div>

      {/* Tab Switcher Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex bg-gray-200/60 p-1.5 rounded-2xl max-w-xl border border-gray-200 shadow-inner">
          <button
            onClick={() => setActiveTab("renter")}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: activeTab === "renter" ? "white" : "transparent",
              color: activeTab === "renter" ? "#593CFB" : "#4b5563",
              boxShadow: activeTab === "renter" ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none"
            }}
          >
            <UserCheck className="size-4" />
            Renter Terms
          </button>
          <button
            onClick={() => setActiveTab("host")}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: activeTab === "host" ? "white" : "transparent",
              color: activeTab === "host" ? "#593CFB" : "#4b5563",
              boxShadow: activeTab === "host" ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none"
            }}
          >
            <Key className="size-4" />
            Host/Seller Terms
          </button>
          <button
            onClick={() => setActiveTab("rto")}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: activeTab === "rto" ? "white" : "transparent",
              color: activeTab === "rto" ? "#593CFB" : "#4b5563",
              boxShadow: activeTab === "rto" ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none"
            }}
          >
            <FileText className="size-4" />
            Rent-to-Own Rules
          </button>
        </div>
      </div>

      {/* Policies Text Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 sm:p-10">
          
          <AnimatePresence mode="wait">
            {activeTab === "renter" && (
              <motion.div
                key="renter-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    1. Renter Eligibility & Driver Verification
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    To rent any vehicle on the Phillip Cars platform, guests must satisfy our driver screening standards:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 mt-3 pl-2 leading-relaxed">
                    <li>Hold a valid driver&apos;s license (foreign licenses must accompany a passport).</li>
                    <li>Be at least 21 years of age. Under-25 fees may apply to specialty cars.</li>
                    <li>Maintain a clean driving record free of major offenses (DUIs, reckless driving, etc.) within the past 3 years.</li>
                    <li>Provide payment credentials registered under the driver&apos;s legal name.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    2. Rental Fees, Deposits, and Payments
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    Guests agree to settle all itemized totals displayed at checkout. All payments must be processed directly on the website:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 mt-3 pl-2 leading-relaxed">
                    <li><strong>Rental Rates:</strong> Standard daily pricing set by hosts.</li>
                    <li><strong>Security Hold:</strong> A temporary pre-authorization hold is placed on your credit card and released within 3 days post-trip if no incidents occur.</li>
                    <li><strong>Late Returns:</strong> Late returns without host approval incur late fees at $50/hour plus standard daily prorated charges.</li>
                    <li><strong>Fuel Policy:</strong> Vehicles must be returned at the same fuel or charge level as pickup. Failure to refuel results in reimbursement charges plus a $15 admin fee.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    3. Financial Responsibility & Protection Plans
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    The guest is financially responsible for any physical damage, towing, roadside calls, or vehicle theft during the active booking period:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 mt-3 pl-2 leading-relaxed">
                    <li><strong>Standard Protection:</strong> Limits guest out-of-pocket exposure to $500 for collision damage.</li>
                    <li><strong>Minimum Protection:</strong> Limits guest out-of-pocket exposure to $3,000.</li>
                    <li><strong>Personal Auto Insurance:</strong> The guest&apos;s personal policy is treated as primary in states where permitted.</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "host" && (
              <motion.div
                key="host-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    1. Listing Policies & Host Obligations
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    Hosts who share vehicles on Phillip Cars must ensure their listings comply with platform standards:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 mt-3 pl-2 leading-relaxed">
                    <li>Keep vehicles mechanically sound, clean, and fully registered with clean titles. Branded or salvage titles are prohibited.</li>
                    <li>Respond to booking requests within 12 hours or enable Auto-Book options.</li>
                    <li>Provide accurate pickup instructions and fuel/charge levels at the beginning of each trip.</li>
                    <li>Verify the guest&apos;s identity in-person or via our app before releasing keys.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    2. Platform Commissions & Earnings Deductions
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    In exchange for matchmaking, billing, insurance administration, and dispute protection:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 mt-3 pl-2 leading-relaxed">
                    <li><strong>Standard Rental Commission:</strong> The platform keeps a **10% commission** from the host&apos;s daily earnings.</li>
                    <li><strong>Rent-to-Own Commission:</strong> A **10% platform commission** is automatically deducted from all monthly lease payments made by the buyer to the host.</li>
                    <li><strong>Payouts:</strong> Standard payouts are processed directly to the host&apos;s connected bank account via Stripe within 3-5 business days post-trip completion.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    3. Safety Recalls & Maintenance
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    Hosts must immediately block listings if a safety recall is issued. You are legally liable for any issues arising from renting a vehicle with active unaddressed manufacturer safety recalls.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "rto" && (
              <motion.div
                key="rto-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    1. The Rent-to-Own Structure & Payments
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    Rent-to-Own (RTO) contracts allow renters to lease a vehicle with an option to purchase. Payments are processed securely via the website:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 mt-3 pl-2 leading-relaxed">
                    <li><strong>Upfront Downpayment (Option Fee):</strong> A non-refundable fee paid by the buyer to secure purchase rights.</li>
                    <li><strong>Monthly Lease Payments:</strong> Fixed monthly payments for the duration of the contract (12, 24, or 36 months). RTO monthly payments carry an ownership markup, making them more costly than standard rental equivalent rates.</li>
                    <li><strong>Final Buyout Price:</strong> Pre-agreed price to transfer title at the end of the term.</li>
                    <li><strong>Website Escrow:</strong> All payments must occur through the platform checkout. Off-platform RTO payments void dispute guarantees and result in host bans.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    2. Insurance & Maintenance Delegation
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    Unlike short-term car rentals, RTO contracts delegate responsibility directly to the buyer:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 mt-3 pl-2 leading-relaxed">
                    <li><strong>Mandatory Buyer Insurance:</strong> The buyer must maintain a comprehensive and collision auto policy. Both the host (lienholder) and Phillip Cars must be named as additional insureds/loss payees.</li>
                    <li><strong>Routine Maintenance:</strong> The buyer must cover all routine upkeep (oil changes, tires, brake pads) to maintain vehicle value.</li>
                    <li><strong>Platform Escrow for Title:</strong> The vehicle title is registered under escrow terms during the RTO contract, ensuring clean transfer upon final contract completion.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">
                    3. Default, Repossession, and GPS Telematics
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4 font-medium">
                    If a buyer defaults on their monthly Rent-to-Own payment:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 mt-3 pl-2 leading-relaxed">
                    <li><strong>Right to Cure:</strong> The buyer is provided a **10-day notice** to cure payment default.</li>
                    <li><strong>Forfeiture:</strong> Failure to cure default results in termination of the option agreement, and all prior downpayments and monthly rental credits are forfeited to the host/platform.</li>
                    <li><strong>Repossession:</strong> The host reserves the right to repossess the vehicle at the buyer&apos;s expense. GPS tracking devices are mandatory on RTO vehicles to locate assets in case of default.</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
