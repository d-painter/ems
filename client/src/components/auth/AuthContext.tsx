import { supabase } from "@/services/supabase/supabaseClient";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export interface AuthContext {
  session: Session | null;
  isLoading: boolean;
  signUpNewUser: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error?: AuthError;
    data?: {
      user: User | null;
      session: Session | null;
    };
  }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: AuthError } | undefined> | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<null | Session>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  };

  // Sign In
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error };
      }
      return { success: true, data };
    } catch (error) {
      console.error(error);
    }
  };

  //sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
    setSession(null);
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    // Returning from Google can restore the login page from cache after the
    // session has already been written. Re-read storage when that happens.
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      void supabase.auth.getSession().then(({ data: { session: nextSession } }) => {
        setSession(nextSession);
        setIsLoading(false);
      });
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  const value = { session, isLoading, signUpNewUser, signOut, signIn };

  if (isLoading) {
    return (
      <AuthContext.Provider value={value}>
        <div className="w-full h-dvh flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function UserAuth(): AuthContext {
  const AuthContextProvider = useContext(AuthContext);
  if (!AuthContextProvider) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return AuthContextProvider;
}
