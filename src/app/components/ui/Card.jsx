import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(function Card({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props}>
      {children}
    </div>
  );
});
Card.displayName = "Card";
export { Card };
