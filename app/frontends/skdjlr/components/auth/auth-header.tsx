import React from "react";

interface AuthHeaderProps {
  label: string;
  subText: string;
}

export default function AuthHeader({ label, subText }: AuthHeaderProps) {
  return (
    <div className="grid gap-2 text-center">
      <h1 className="text-3xl font-bold">{label}</h1>
      <p className="text-balance text-muted-foreground">{subText}</p>
    </div>
  );
}
