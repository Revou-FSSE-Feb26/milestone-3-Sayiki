"use client";

import { useEffect, useState, useMemo, useCallback } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  token: string;
};

const authState = {
  user: null as User | null,
  isAuthenticated: false,
};

const authListeners = new Set<() => void>();

const authProxy = new Proxy(authState, {
  set(target, property, value) {
    const oldValue = target[property as keyof typeof target];
    if (oldValue === value) return true;
    
    target[property as keyof typeof target] = value;
    
    if (property === 'user') {
      target.isAuthenticated = !!value;
    }
    
    authListeners.forEach(listener => listener());
    
    if (property === 'user') {
      if (typeof window !== "undefined") {
        if (value) {
          localStorage.setItem("revoshop-user", JSON.stringify(value));
          document.cookie = `revoshop-user=${JSON.stringify(value)}; path=/; max-age=86400`;
        } else {
          localStorage.removeItem("revoshop-user");
          document.cookie = 'revoshop-user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
      }
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("authUpdated"));
    }
    
    return true;
  }
});

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("revoshop-user");
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as User;
      authProxy.user = parsed; 
    } catch {
      authProxy.user = null;
    }
  }
}

const login = useCallback(async (username: string, password: string) => {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      
      authProxy.user = {
        id: 1,
        username: username,
        email: `${username}@example.com`,
        token: data.token
      };
      
      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Invalid username or password" };
    }
  } catch (error) {
    return { success: false, message: "Login failed. Please try again." };
  }
}, []);

const logout = useCallback(() => {
  authProxy.user = null;
}, []);

export function useAuth() {
  const [user, setUser] = useState<User | null>(authProxy.user);
  const [isAuthenticated, setIsAuthenticated] = useState(authProxy.isAuthenticated);

  const updateAuth = useCallback(() => {
    setUser(authProxy.user);
    setIsAuthenticated(authProxy.isAuthenticated);
  }, []);

  useEffect(() => {
    authListeners.add(updateAuth);
    updateAuth();

    return () => {
      authListeners.delete(updateAuth);
    };
  }, [updateAuth]);

  return useMemo(() => ({ 
    user, 
    isAuthenticated, 
    login, 
    logout 
  }), [user, isAuthenticated]);
}

export function AuthProvider({ children }: { children: any }) {
  return <>{children}</>;
}