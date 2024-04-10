import * as React from "react";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardFooter } from "../ui/card";

// TODO: Determine how to handle background colors for shift nodes
const ShiftNodeCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-shrink border-shiftnode-border rounded-none border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
ShiftNodeCard.displayName = "ShiftNodeCard";

const ShiftNodeContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-col p-2", className)} {...props} />
));
ShiftNodeContent.displayName = "ShiftNodeContent";

export { ShiftNodeCard, ShiftNodeContent };
