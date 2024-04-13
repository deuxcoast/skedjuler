import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subHeaderLabel: string;
}

export default function SetupCardWrapper({
  children,
  headerLabel,
  subHeaderLabel,
}: CardWrapperProps) {
  return (
    <Card className="m-auto md:max-w-2xl">
      <CardHeader className="space-y-2">
        <CardTitle>{headerLabel}</CardTitle>
        <CardDescription>{subHeaderLabel}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
