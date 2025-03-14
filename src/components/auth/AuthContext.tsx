import { supabase } from "@/services/supabase/supabaseClient";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContext {
  session: Session | null;
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
  ) => Promise<{ success: boolean, error?:AuthError } | undefined> | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<null | Session>(null);  

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

       supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

  }, []);


  return (
    <AuthContext.Provider value={{ session, signUpNewUser, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth(): AuthContext {
  const AuthContextProvider = useContext(AuthContext);
  if (!AuthContextProvider) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return AuthContextProvider;
}
