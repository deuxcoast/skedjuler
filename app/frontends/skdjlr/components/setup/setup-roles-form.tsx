"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const dummyScheduleData = ["Servers", "Food Runners", "Bussers"];

const setupRolesFormSchema = z.object({
  sameAsSchedules: z.boolean().default(false).optional(),
  roleToSchedule: z.array(
    z.object({
      role: z.string().max(30, {
        message: "The role name must not be longer than 30 characters.",
      }),
      schedule: z.string().max(30, {
        message: "The schedule name must not be longer than 30 characters.",
      }),
    }),
  ),
});

type SetupRolesFormValues = z.infer<typeof setupRolesFormSchema>;

export default function SetupRolesForm() {
  const form = useForm<SetupRolesFormValues>({
    resolver: zodResolver(setupRolesFormSchema),
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "roleToSchedule",
    control: form.control,
  });

  function onSubmit(data: SetupRolesFormValues) {
    console.log("Roles setup form submitted", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="sameAsSchedules"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Each schedule I created corresponds to a single role.
                  </FormLabel>
                  <FormDescription>
                    For example, if you just made a schedule named
                    &quot;Servers&quot; for the servers at your restaraunt, then
                    check this box.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {fields.map((field, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                key={field.id}
                name={`roleToSchedule.${index}.role`}
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Role
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                key={field.id}
                name={`roleToSchedule.${index}.schedule`}
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Schedule
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Servers</SelectItem>
                        <SelectItem value="2">Food Runners</SelectItem>
                        <SelectItem value="3">Bussers</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              append({ role: "", schedule: "" });
              // append({ schedule: "" });
            }}
          >
            Add More Roles
          </Button>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
