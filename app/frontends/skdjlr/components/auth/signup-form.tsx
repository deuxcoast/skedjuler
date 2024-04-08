"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schema";
import FormItemWrapper from "../form-item-wrapper";
import { Button } from "../ui/button";
import GoogleIcon from "../icons/google-icon";

export default function SignUpForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
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
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItemWrapper
                  field={field}
                  label="First Name"
                  disabled={isPending}
                  placeholder="Michael"
                  type="text"
                />
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItemWrapper
                  field={field}
                  label="Last Name"
                  disabled={isPending}
                  placeholder="Angelo"
                  type="text"
                />
              )}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItemWrapper
                field={field}
                label="Email"
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
                label="Password"
                disabled={isPending}
                placeholder=""
                type="password"
              />
            )}
          />
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          Create an Account
        </Button>
        <Button variant="outline" className="w-full">
          <GoogleIcon className="mr-2" /> Continue with Google
        </Button>
      </form>
    </Form>
  );
}
