import { UserAuth } from "@/components/auth/AuthContext";
import { AuthError } from "@supabase/supabase-js";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { signUpNewUser } = UserAuth();
  const [error, setError] = useState<AuthError | null>(null);

  const handleSignUp = async () => {
    let email = "";
    let password = "";
    try {
      const { error } = await signUpNewUser(email, password);
      if (error) {
        setError(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>Hello signup</div>
      <button
        onClick={() => handleSignUp()}
        className="bg-destructive rounded-xl p-4 m-6"
      >
        Signup
      </button>
      <Link to="/">HOME</Link>

      {JSON.stringify(error)}

      {error && (
        <div className=" flex flex-col items-center justify-center w-fit h-fit bg-destructive p-4">
          <p>SIGNUP ERROR</p>
          <p>{error.code}</p>
        </div>
      )}
    </div>
  );
}
