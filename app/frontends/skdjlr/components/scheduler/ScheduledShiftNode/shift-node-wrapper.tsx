import * as React from "react";
import { cn } from "@/utils/reusable-functions";

// TODO: Determine how to handle background colors for shift nodes
const ShiftNodeCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-shrink border border-foreground rounded-lg bg-card text-card-foreground shadow-sm",
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
  <div
    ref={ref}
    className={cn("flex-col px-2 py-1 gap-0", className)}
    {...props}
  />
));
ShiftNodeContent.displayName = "ShiftNodeContent";

export { ShiftNodeCard, ShiftNodeContent };
