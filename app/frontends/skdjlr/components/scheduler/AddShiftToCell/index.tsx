import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { AddShiftToCellProps } from "./types";
import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCustomShiftForm from "./add-custom-shift-form";
import AddTemplateShiftForm from "./add-template-shift-form";

export function AddShiftToCell(props: AddShiftToCellProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full h-4 w-4" variant="default">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogTitle>Add Shift</DialogTitle>
        <DialogDescription>
          Create a custom shift or choose from one of your shift templates.
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
          <TabsContent value="templates" className="m-0">
            {/* <AddCusjomShiftForm {...props} /> */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
