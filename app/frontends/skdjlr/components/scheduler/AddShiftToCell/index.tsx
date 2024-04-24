import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCustomShiftForm from "./add-custom-shift-form";
import AddTemplateShiftForm from "./add-template-shift-form";
import { EmployeeDayChildrenProps } from "@/components/scheduler/types";

export function AddShiftToCell(props: EmployeeDayChildrenProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Add Shift</DialogTitle>
        <DialogDescription>
          Choose a shift template or create a custom shift.
        </DialogDescription>
        <Tabs defaultValue="templates" className="w-[400px]">
          <div>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Shift Templates</TabsTrigger>
              <TabsTrigger value="custom">Custom Shift</TabsTrigger>
            </TabsList>
          </div>
          <Separator className="my-4" />
          <TabsContent value="templates" className="m-0">
            <AddTemplateShiftForm {...props} />
          </TabsContent>
          <TabsContent value="custom" className="m-0">
            <AddCustomShiftForm {...props} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
