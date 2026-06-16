"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type PortalUser = {
  id: string;
  email: string | null;
};

type PortalProfile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: "user" | "admin";
};

type AuthContextValue = {
  user: PortalUser | null;
  profile: PortalProfile | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [profile, setProfile] = useState<PortalProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/session", { cache: "no-store" });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load session.");
      }

      setUser(payload.user ?? null);
      setProfile(payload.profile ?? null);
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void refresh();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [refresh]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, profile, isLoading, refresh, logout }),
    [isLoading, logout, profile, refresh, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
