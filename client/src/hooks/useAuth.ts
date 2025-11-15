import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  });
  
  const queryClient = useQueryClient();

  // Fetch user data if token exists
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      if (!token) return null;
      
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token is invalid, remove it
          setToken(null);
          localStorage.removeItem("auth_token");
          return null;
        }
        throw new Error("Failed to fetch user data");
      }
      
      return response.json();
    },
    enabled: !!token,
    retry: false,
  });

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    localStorage.setItem("auth_token", newToken);
    queryClient.setQueryData(["/api/auth/me"], newUser);
    queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("auth_token");
    queryClient.clear();
  };

  return {
    user: user || null,
    token,
    isAuthenticated: !!user,
    isLoading: isLoading && !!token,
    login,
    logout,
  };
}