"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { Input } from "../ui/input";
import FormItemWrapper from "../form-item-wrapper";
import { Button } from "../ui/button";
import GoogleIcon from "../icons/google-icon";
import CardWrapper from "./card-wrapper";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");

    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItemWrapper
                field={field}
                text="Email"
                disabled={isPending}
                placeholder="me@example.com"
                type="email"
              />
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItemWrapper
                field={field}
                text="Password"
                link={{
                  include: true,
                  text: "Forgot your password?",
                  href: "/forgot-password",
                }}
                disabled={isPending}
                placeholder=""
                type="password"
              />
            )}
          />
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          <GoogleIcon className="mr-2" /> Login with Google
        </Button>
      </form>
    </Form>
  );
}
