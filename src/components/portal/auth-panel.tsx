"use client";

import React, { useState } from "react";
import { Loader2, LogIn, UserPlus } from "lucide-react";

import { useAuth } from "@/components/portal/auth-provider";

export function AuthPanel({
  onAuthenticated,
  compact = false,
}: {
  onAuthenticated?: () => void;
  compact?: boolean;
}) {
  const { refresh } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName, phone }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Authentication failed.");
      }

      await refresh();
      setMessage(payload.message ?? "You are signed in.");
      onAuthenticated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={compact ? "space-y-4" : "rounded-3xl border border-gray-200 bg-white p-6 shadow-xl space-y-4"}>
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-turo-purple">
          {mode === "login" ? "Welcome back" : "Create account"}
        </p>
        <h3 className="mt-1 text-xl font-black text-gray-950">
          {mode === "login" ? "Log in to continue" : "Join Phillips Car Rental"}
        </h3>
        <p className="mt-1 text-xs font-medium leading-relaxed text-gray-500">
          Your account stores listings, sale enquiries, rental requests, and admin access securely through Supabase Auth.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-3">
        {mode === "register" ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Full name"
              className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-turo-purple"
              required
            />
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Mobile number"
              className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-turo-purple"
              required
            />
          </div>
        ) : null}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-turo-purple"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          minLength={6}
          className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-turo-purple"
          required
        />

        {error ? (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-xs font-bold text-green-700">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-turo-purple px-5 py-3 text-sm font-black text-white shadow-lg shadow-turo-purple/20 transition hover:bg-turo-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : mode === "login" ? <LogIn className="size-4" /> : <UserPlus className="size-4" />}
          {mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <div className="flex items-center justify-between gap-3 text-xs font-bold">
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError(null);
            setMessage(null);
          }}
          className="text-turo-purple hover:underline"
        >
          {mode === "login" ? "Create a new account" : "I already have an account"}
        </button>
        <button
          type="button"
          onClick={async () => {
            setError(null);
            setMessage(null);
            if (!email) {
              setError("Enter your email first.");
              return;
            }

            const response = await fetch("/api/auth/reset-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
            const payload = await response.json();
            setMessage(payload.message ?? "Password reset email sent if the account exists.");
          }}
          className="text-gray-400 hover:text-turo-purple"
        >
          Reset password
        </button>
      </div>
    </div>
  );
}
