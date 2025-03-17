import { UserAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
      navigate({ to: "/" });
    }
  }

  return (
    <div className="w-full h-full flex justify-center mt-8 md:items-center md:m-auto items-start overflow-auto">
      <div className="w-fit md:h-min flex flex-col md:flex-row gap-14 justify-center items-center">
        <div className="flex flex-col w-fit text-center text-4xl gap-2">
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
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  className={`${error && "border-destructive"}`}
                  type="email"
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

              <p className="text-sm text-destructive min-h-5">
                {error && JSON.stringify(error)}
              </p>

              <Button type="submit">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
