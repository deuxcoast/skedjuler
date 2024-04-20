import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseShiftTimeIntoTwelveHour } from "@/utils/dates";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { selectCurrentlySelectedSchedule } from "@/lib/features/schedules/schedulesSlice";
import { useAppSelector } from "@/lib/hooks";
import { EmployeeDayProps } from "@/components/scheduler/types";

const addCustomShiftSchema = z.object({
  shiftTemplateID: z.string().uuid(),
  startHour: z.coerce.number(),
  startMin: z.number(),
  startAMPM: z.string(),
  endHour: z.number(),
  endMin: z.number(),
  endAMPM: z.string(),
  recurring: z.boolean(),
});

type AddCustomShiftFormValues = z.infer<typeof addCustomShiftSchema>;

export default function AddCustomShiftForm({
  employee,
  day,
}: EmployeeDayProps) {
  const currentSchedule = useAppSelector(selectCurrentlySelectedSchedule);

  const [defaultStartHour, defaultStartMinute, defaultStartAMPM] =
    parseShiftTimeIntoTwelveHour(currentSchedule.defaultShiftStart);

  const [defaultEndHour, defaultEndMinute, defaultEndAMPM] =
    parseShiftTimeIntoTwelveHour(currentSchedule.defaultShiftEnd);

  const defaultValues: Partial<AddCustomShiftFormValues> = {
    shiftTemplateID: "",
    startHour: defaultStartHour,
    startMin: defaultStartMinute,
    startAMPM: defaultStartAMPM,
    endHour: defaultEndHour,
    endMin: defaultEndMinute,
    endAMPM: defaultEndAMPM,
    recurring: false,
  };

  const form = useForm<AddCustomShiftFormValues>({
    resolver: zodResolver(addCustomShiftSchema),
    defaultValues,
    mode: "onChange",
  });

  // The value from the select component for hours and minutes is initially a
  // string, but must be converted back into a number for form validation.
  const handleSelectChangeNumber = (name, value: number | string) => {
    if (value) {
      switch (typeof value) {
        // convert string value to number before setting it
        case "string":
          form.setValue(name, parseInt(value, 10));
          break;
        case "number":
          form.setValue(name, value);
          break;
      }
    }
  };

  function onSubmitCustomShift(data: AddCustomShiftFormValues) {
    console.log("Shift template submitted", data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitCustomShift)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <h4 className="text-md font-semibold">Start Time</h4>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="startHour"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="startHour">Hour</Label>
                    <Select
                      name={field.name}
                      onValueChange={(value) =>
                        handleSelectChangeNumber(field.name, value)
                      }
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger id="startHour">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
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
                      <Select
                        name={field.name}
                        onValueChange={(value) =>
                          handleSelectChangeNumber(field.name, value)
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger id="startMin">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">00</SelectItem>
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
                <FormField
                  control={form.control}
                  name="startAMPM"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="startAMPM">AM/PM</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChangeNumber(field.name, value)
                        }
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
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h4 className="text-md font-semibold">End Time</h4>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="endHour"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="endHour">Hour</Label>
                    <Select
                      name={field.name}
                      value={field.value.toString()}
                      onValueChange={(value) =>
                        handleSelectChangeNumber(field.name, value)
                      }
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger id="endHour">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="endMin"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="endMin">Minute</Label>
                      <Select
                        name={field.name}
                        value={field.value.toString()}
                        onValueChange={(value) =>
                          handleSelectChangeNumber(field.name, value)
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger id="endMin">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">00</SelectItem>
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
                <FormField
                  control={form.control}
                  name="endAMPM"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="endAMPM">AM/PM</Label>
                      <Select
                        value={form.watch("endAMPM")}
                        onValueChange={(value) =>
                          handleSelectChangeNumber(field.name, value)
                        }
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="endAMPM">
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
          </div>
          <Button type="submit">Add Shift</Button>
        </form>
      </Form>
      {/* <DevTool control={form.control} /> */}
    </>
  );
}
