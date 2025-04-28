import { UserAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/services/supabase/supabaseClient";
import GoogleIcon from "@/components/icons/GoogleIcon";

export const Route = createFileRoute("/(auth)/login")({
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await signIn(formState.email, formState.password);

    if (!res?.success) {
      setError(res?.error?.message as string);
    } else {
      await navigate({ to: "/" });
    }
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  return (
    <div className="w-full h-full min-h-dvh flex justify-center items-center md:items-center md:m-auto overflow-auto">
      <div className="w-fit h-full md:h-min flex flex-col md:flex-row md:gap-14 gap-4 justify-center items-center">
        <div className="flex text-2xl md:text-4xl flex-col w-fit text-center gap-2">
          <div>ENGINEERING</div>
          <div>MANAGEMENT</div>
          <div>SYSTEM</div>
        </div>
        <div className=" hidden md:flex self-stretch flex-1 border-1 border-gray-300" />

        <Card className="w-fit h-fit grid content-center">
          <CardHeader>
            <CardTitle className="text-2xl text-center">LOGIN</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col justify-center gap-4"
              onSubmit={(e: FormEvent<HTMLFormElement>) => void handleSubmit(e)}
            >
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  autoFocus
                  className={`${error && "border-destructive"} `}
                  type="email"
                  id="email"
                  placeholder="email"
                  name="email"
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  className={`${error && "border-destructive"}`}
                  type="password"
                  id="password"
                  placeholder="password"
                  name="password"
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit">Login with email</Button>
              {error && (
                <p className="text-sm text-destructive">
                  {JSON.stringify(error)}
                </p>
              )}
              <div className="my-2 flex w-full items-center self-center text-center">
                <div className="h-[1px] w-full bg-black/20"></div>
                <div className="mx-2 text-xs text-nowrap">SIGN UP / LOGIN</div>
                <div className="h-[1px] w-full bg-black/20"></div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Button type="button" onClick={() => void handleGoogleLogin()}>
                  <GoogleIcon />
                  <p className="self-center">Google</p>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
