"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: string;
  tenant_id: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  tenantSlug: string | null;
  login: (token: string, user: User, slug: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<{
    user: User | null;
    token: string | null;
    tenantSlug: string | null;
    isLoading: boolean;
  }>(() => {
    if (typeof window === "undefined") {
      return {
        user: null,
        token: null,
        tenantSlug: null,
        isLoading: true,
      };
    }

    const storedToken = localStorage.getItem("mg_token");
    const storedUser = localStorage.getItem("mg_user");
    const storedSlug = localStorage.getItem("mg_tenant_slug");

    return {
      token: storedToken,
      user: storedUser ? (JSON.parse(storedUser) as User) : null,
      tenantSlug: storedSlug,
      isLoading: false,
    };
  });
  const router = useRouter();

  const login = (newToken: string, newUser: User, slug: string) => {
    setAuthState({
      token: newToken,
      user: newUser,
      tenantSlug: slug,
      isLoading: false,
    });
    localStorage.setItem("mg_token", newToken);
    localStorage.setItem("mg_user", JSON.stringify(newUser));
    localStorage.setItem("mg_tenant_slug", slug);
    router.push("/dashboard");
  };

  const logout = () => {
    setAuthState({
      token: null,
      user: null,
      tenantSlug: null,
      isLoading: false,
    });
    localStorage.removeItem("mg_token");
    localStorage.removeItem("mg_user");
    localStorage.removeItem("mg_tenant_slug");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
