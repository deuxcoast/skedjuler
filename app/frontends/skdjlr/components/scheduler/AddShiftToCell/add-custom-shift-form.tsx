import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import dayjs from "dayjs";
import { AddShiftFormProps as AddCustomShiftFormProps } from "./types";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";

const addCustomShiftFormSchema = z.object({
  shiftCustomID: z.string().uuid(),
  shiftStart: z.string().datetime({
    message: "You must select a start time for the shift",
  }),
  shiftEnd: z.string().datetime({
    message: "You must select an end time for the shift",
  }),
  recurrring: z.boolean(),
});

type AddCustomShiftFormValues = z.infer<typeof addCustomShiftFormSchema>;

export default function AddCustomShiftForm({
  // employee,
  day,
}: AddCustomShiftFormProps) {
  const { defaultShiftStartHour, defaultShiftEndHour } = useScheduler();

  const defaultValues: Partial<AddCustomShiftFormValues> = {
    shiftStart: dayjs(day).hour(defaultShiftStartHour).toString(),
    shiftEnd: dayjs(day).hour(defaultShiftEndHour).toString(),
  };

  const form = useForm<AddCustomShiftFormValues>({
    resolver: zodResolver(addCustomShiftFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmitShiftCustom(data: AddCustomShiftFormValues) {
    console.log("Shift template submitted", data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitShiftCustom)}
        className="space-y-8"
      >
        <div>
          <FormField
            control={form.control}
            name="shiftCustomID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Shift</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectContent></SelectContent>
                    </SelectTrigger>
                  </FormControl>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
