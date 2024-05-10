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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatShiftTimeStartToEnd,
  parseTwelveHourIntoDayjs,
} from "@/utils/dates";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { useAppDispatch } from "@/lib/hooks";
import { addScheduledShift } from "@/lib/features/scheduledShifts/scheduledShiftsSlice";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import { DialogClose } from "@/components/ui/dialog";
import { EmployeeDayProps } from "@/components/scheduler/types";
import dayjs from "dayjs";
import { useSelectedSchedule } from "@/utils/useSelectedSchedule";
import { useCurrentShiftTemplates } from "@/utils/useCurrentShiftTemplates";

const addTemplateShiftFormSchema = z.object({
  shiftTemplateId: z.string().uuid(),
  startHour: z.coerce.number(),
  startMin: z.number(),
  startAMPM: z.string(),
  endHour: z.number(),
  endMin: z.number(),
  endAMPM: z.string(),
  recurring: z.boolean(),
});

type AddTemplateShiftFormValues = z.infer<typeof addTemplateShiftFormSchema>;

export default function AddTemplateShiftForm({
  employee,
  day,
}: EmployeeDayProps) {
  // console.log(employee);
  const [isEditShiftOpen, setIsEditShiftOpen] = useState(false);

  const dayObj = dayjs(day);

  const defaultValues: Partial<AddTemplateShiftFormValues> = {
    shiftTemplateId: "",
    startHour: 0,
    startMin: 0,
    startAMPM: "",
    endHour: 0,
    endMin: 0,
    endAMPM: "",
    recurring: false,
  };

  const form = useForm<AddTemplateShiftFormValues>({
    resolver: zodResolver(addTemplateShiftFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const dispatch = useAppDispatch();
  const selectedSchedule = useSelectedSchedule();
  const currentShiftTemplates = useCurrentShiftTemplates();

  const shiftTemplateSelected = form.watch("shiftTemplateId");

  // Set default values when shiftTemplateId changes
  useEffect(() => {
    if (shiftTemplateSelected) {
      const selectedTemplate = currentShiftTemplates.find(
        (template) => template.id === shiftTemplateSelected,
      );
      if (selectedTemplate) {
        const { start, end } = selectedTemplate;
        const startTime = dayjs(start);
        const endTime = dayjs(end);

        // Update form values.
        form.setValue("startHour", startTime.hour() % 12, {
          shouldValidate: true,
        });
        form.setValue("startMin", startTime.minute(), { shouldValidate: true });
        form.setValue("startAMPM", startTime.format("A"), {
          shouldValidate: true,
        });
        form.setValue("endHour", endTime.hour() % 12, { shouldValidate: true });
        form.setValue("endMin", endTime.minute(), { shouldValidate: true });
        form.setValue("endAMPM", endTime.format("A"), { shouldValidate: true });
      }
    }

    // TODO: Including currentShiftTemplates in the dependency array causes a
    // stack overflow. I lazily removed it for now, but I believe I need to use
    // a deep compare function (e.g., lodash)
    // https://stackoverflow.com/questions/54095994/react-useeffect-comparing-objects/54096391#54096391
  }, [shiftTemplateSelected, form]);

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

  function onSubmitShiftTemplate(data: AddTemplateShiftFormValues) {
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

    // console.log("startTime:", startTime);
    const startDate = dayObj
      .hour(startTime.hour())
      .minute(startTime.minute())
      .second(0)
      .millisecond(0);
    // console.log("startDate:", startDate);
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
          onSubmit={form.handleSubmit(onSubmitShiftTemplate)}
          className="flex flex-col gap-4"
        >
          <div>
            <FormField
              control={form.control}
              name="shiftTemplateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shift Template</FormLabel>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a shift template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currentShiftTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex w-[390px] px-2 py-4 flex-row justify-between items-center">
                            <div className="flex gap-2 font-semibold">
                              <Badge>Server</Badge>
                              {template.name}{" "}
                            </div>
                            <div className="text-justify">
                              {formatShiftTimeStartToEnd(
                                template.start,
                                template.end,
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
            <Collapsible
              open={isEditShiftOpen}
              onOpenChange={setIsEditShiftOpen}
            >
              <div className="flex items-center justify-end space-x-4">
                <CollapsibleTrigger asChild>
                  <Button className="gap-2" variant="ghost" size="sm">
                    <h4 className="text-sm font-semibold">Edit Shift</h4>
                    {isEditShiftOpen ? (
                      <CaretUpIcon className="h-4 w-4" />
                    ) : (
                      <CaretDownIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
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
              </CollapsibleContent>
            </Collapsible>
          )}
          <DialogClose asChild>
            <Button disabled={!form.formState.isValid} type="submit">
              Add Shift
            </Button>
          </DialogClose>
        </form>
      </Form>
    </>
  );
}
