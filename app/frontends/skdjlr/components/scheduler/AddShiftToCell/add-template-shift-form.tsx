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
import { AddShiftFormProps as AddTemplateShiftFormProps } from "./types";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { formatShiftTemplateTime } from "@/lib/date-utils";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { CardHeader } from "@/components/ui/card";

const addTemplateShiftFormSchema = z.object({
  shiftTemplateID: z.string().uuid(),
  startHour: z.number(),
  startMin: z.number(),
  startAMPM: z.string(),
  endHour: z.number(),
  endMin: z.number(),
  endAMPM: z.string(),
  recurrring: z.boolean(),
});

type AddTemplateShiftFormValues = z.infer<typeof addTemplateShiftFormSchema>;

export default function AddTemplateShiftForm({
  employee,
  day,
}: AddTemplateShiftFormProps) {
  const { shiftTemplates } = useScheduler();

  // const defaultValues: Partial<AddTemplateShiftFormValues> = {
  //   shiftStart: dayjs(day).hour(defaultShiftStartHour).toString(),
  //   shiftEnd: dayjs(day).hour(defaultShiftEndHour).toString(),
  // };

  const form = useForm<AddTemplateShiftFormValues>({
    resolver: zodResolver(addTemplateShiftFormSchema),
    // defaultValues,
    mode: "onChange",
  });

  const shiftTemplateSelected = form.watch("shiftTemplateID");

  function onSubmitShiftTemplate(data: AddTemplateShiftFormValues) {
    console.log("Shift template submitted", data);
  }
  console.log(shiftTemplates);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitShiftTemplate)}
        className="flex flex-col gap-4"
      >
        <div>
          <FormField
            control={form.control}
            name="shiftTemplateID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift Template</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a shift template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {shiftTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex w-[390px] px-2 py-4 flex-row justify-between items-center">
                          <div className="flex gap-2 font-semibold">
                            <Badge>Server</Badge>
                            {template.name}{" "}
                          </div>
                          <div className="text-justify">
                            {formatShiftTemplateTime(
                              template.startTime,
                              "h:mm a",
                            )}
                            {" - "}
                            {formatShiftTemplateTime(
                              template.endTime,
                              "h:mm a",
                            )}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        {shiftTemplateSelected && (
          <>
            <FormLabel>Start Time</FormLabel>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="startHour"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="startHour">Hour</Label>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger id="startHour">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">1</SelectItem>
                        <SelectItem value="1">2</SelectItem>
                        <SelectItem value="2">3</SelectItem>
                        <SelectItem value="3">4</SelectItem>
                        <SelectItem value="4">5</SelectItem>
                        <SelectItem value="5">6</SelectItem>
                        <SelectItem value="6">7</SelectItem>
                        <SelectItem value="7">8</SelectItem>
                        <SelectItem value="8">9</SelectItem>
                        <SelectItem value="9">10</SelectItem>
                        <SelectItem value="10">11</SelectItem>
                        <SelectItem value="11">12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="startMin"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="startMin">Minute</Label>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger id="startMin">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="45">45</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startAMPM">AM/PM</Label>
                <FormField
                  control={form.control}
                  name="startAMPM"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="startAMPM">AM/PM</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="startAMPM">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </div>
            </div>
            <FormLabel>End Time</FormLabel>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="endHour">Hour</Label>
                <Select>
                  <SelectTrigger id="endHour">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">1</SelectItem>
                    <SelectItem value="1">2</SelectItem>
                    <SelectItem value="2">3</SelectItem>
                    <SelectItem value="3">4</SelectItem>
                    <SelectItem value="4">5</SelectItem>
                    <SelectItem value="5">6</SelectItem>
                    <SelectItem value="6">7</SelectItem>
                    <SelectItem value="7">8</SelectItem>
                    <SelectItem value="8">9</SelectItem>
                    <SelectItem value="9">10</SelectItem>
                    <SelectItem value="10">11</SelectItem>
                    <SelectItem value="11">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endMinute">Minute</Label>
                <Select>
                  <SelectTrigger id="endMinute">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">1</SelectItem>
                    <SelectItem value="14">15</SelectItem>
                    <SelectItem value="29">30</SelectItem>
                    <SelectItem value="44">45</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endAMPM">AM/PM</Label>
                <Select>
                  <SelectTrigger id="amPM">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="am">AM</SelectItem>
                    <SelectItem value="pm">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
