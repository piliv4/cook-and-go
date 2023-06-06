import { useState, useEffect } from "react";
import supabase from "@/server/client";

interface AuthState {
  user: any;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const user = supabase.auth.getSession();
      setAuthState({ user, loading: !user });
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user) {
      const user = data.user;
      setAuthState({ user, loading: false });
    } else {
      console.error("Error al iniciar sesión:", error?.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setAuthState({ user: null, loading: false });
    } else {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) {
      setAuthState({ user: null, loading: false });
    } else {
      console.error("Error al registrarse:", error.message);
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (!error) {
      setAuthState({ user: null, loading: false });
    } else {
      console.error("Error al restablecer contraseña:", error.message);
    }
  };

  return { authState, signIn, signOut, register, resetPassword };
};
