import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

import { Form, FormControl, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EmployeeDayProps } from "@/components/scheduler/types";
import { useSelectedSchedule } from "@/utils/useSelectedSchedule";
import dayjs from "dayjs";
import { parseTwelveHourIntoDayjs } from "@/utils/dates";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { addScheduledShift } from "@/lib/features/scheduledShifts/scheduledShiftsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { DialogClose } from "@/components/ui/dialog";

const addCustomShiftFormSchema = z.object({
  startHour: z.coerce.number(),
  startMin: z.number(),
  startAMPM: z.string(),
  endHour: z.number(),
  endMin: z.number(),
  endAMPM: z.string(),
  recurring: z.boolean(),
});

type AddCustomShiftFormValues = z.infer<typeof addCustomShiftFormSchema>;

export default function AddCustomShiftForm({
  employee,
  day,
}: EmployeeDayProps) {
  const selectedSchedule = useSelectedSchedule();

  const dayObj = dayjs(day);

  const defaultStartTime = dayjs(selectedSchedule.defaultShiftStart);
  const defaultEndTime = dayjs(selectedSchedule.defaultShiftEnd);

  const defaultValues: Partial<AddCustomShiftFormValues> = {
    startHour: defaultStartTime.hour() % 12,
    startMin: defaultStartTime.minute(),
    startAMPM: defaultStartTime.format("A"),
    endHour: defaultEndTime.hour() % 12,
    endMin: defaultEndTime.minute(),
    endAMPM: defaultEndTime.format("A"),
    recurring: false,
  };

  const form = useForm<AddCustomShiftFormValues>({
    resolver: zodResolver(addCustomShiftFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

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
    console.log(data);
    const startTime = parseTwelveHourIntoDayjs(
      data.startHour,
      data.startMin,
      data.startAMPM,
    );
    const endTime = parseTwelveHourIntoDayjs(
      data.endHour,
      data.endMin,
      data.endAMPM,
    );

    const startDate = dayObj
      .hour(startTime.hour())
      .minute(startTime.minute())
      .second(0)
      .millisecond(0);
    let endDate = dayObj
      .hour(endTime.hour())
      .minute(startTime.minute())
      .second(0)
      .millisecond(0);

    const tempId = uuidv4() as UUID;

    const scheduledShift = {
      id: tempId,
      employeeId: employee.id,
      scheduleId: selectedSchedule.id,
      roleId: employee.rolesId[0], // TODO: Add logic for setting the role when there is multiple
      start: startDate.utc().toISOString(),
      end: endDate.utc().toISOString(),
      published: false,
    };
    dispatch(addScheduledShift(scheduledShift));
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
                      value={field.value.toString()}
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
                        value={field.value.toString()}
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
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) =>
                          form.setValue(field.name, value)
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
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) =>
                          form.setValue(field.name, value)
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
          <DialogClose asChild>
            <Button type="submit">Add Shift</Button>
          </DialogClose>
        </form>
      </Form>
      {/* <DevTool control={form.control} /> */}
    </>
  );
}
