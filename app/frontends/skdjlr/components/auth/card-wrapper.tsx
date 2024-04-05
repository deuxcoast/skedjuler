"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AuthFooter from "./auth-footer";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subHeaderLabel: string;
  footerLabel: string;
  footerLinkLabel: string;
  footerHref: string;
}

export default function CardWrapper({
  children,
  headerLabel,
  subHeaderLabel,
  footerLabel,
  footerLinkLabel,
  footerHref,
}: CardWrapperProps) {
  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{headerLabel}</CardTitle>
        <CardDescription>{subHeaderLabel}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <AuthFooter
          text={footerLabel}
          linkText={footerLinkLabel}
          href={footerHref}
        ></AuthFooter>
      </CardFooter>
    </Card>
  );
}
