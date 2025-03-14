import { UserAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/(auth)/login")({
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ email: "", password: "" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn(formState.email, formState.password);
    navigate({ to: "/" });

    //TODO: handle return errors
  }

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex flex-col justify-center w-fit h-fit p-4 border-2 mt-10 rounded">
        <h1 className="text-center font-bold text-2xl mb-4 ">LOGIN</h1>
        <form
          className="flex flex-col justify-center gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) =>
              setFormState({ ...formState, [e.target.name]: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) =>
              setFormState({ ...formState, [e.target.name]: e.target.value })
            }
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
