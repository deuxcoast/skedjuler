"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const setupSchedulesFormSchema = z.object({
  schedules: z
    .array(
      z.object({
        value: z.string().max(30, {
          message: "The schedule name must not be longer than 30 characters.",
        }),
      }),
    )
    .nonempty({
      message: "We need at least one schedule to get started.",
    }),
});

type SetupSchedulesFormValues = z.infer<typeof setupSchedulesFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<SetupSchedulesFormValues> = {
  schedules: [{ value: "" }, { value: "" }],
};

// This can come from your database or API.
const placeholders = ["Ex: Servers", "Ex: BOH"];

export default function SetupSchedulesForm() {
  const form = useForm<SetupSchedulesFormValues>({
    resolver: zodResolver(setupSchedulesFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "schedules",
    control: form.control,
  });

  function onSubmit(data: SetupSchedulesFormValues) {
    console.log("Schedules setup form submitted", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`schedules.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Schedules
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={placeholders[index] || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add More Schedules
          </Button>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
