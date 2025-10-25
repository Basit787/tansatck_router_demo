import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { AlertLogin } from "./alert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { username, password } = data;
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate({ to: "/admin" });
    } else if (username === "seller" && password === "seller123") {
      localStorage.setItem("role", "seller");
      navigate({ to: "/seller" });
    }
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto my-auto h-full">
      <CardHeader>
        <Alert>
          <AlertTitle>For Admin</AlertTitle>
          <AlertDescription className="flex gap-2">
            <p>Username = admin</p>
            <p>password = admin123</p>
          </AlertDescription>
          <AlertTitle>For Seller</AlertTitle>
          <AlertDescription className="flex gap-2">
            <p>Username = seller</p>
            <p>password = seller123</p>
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="login-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
