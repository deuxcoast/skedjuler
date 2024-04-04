import Image from "next/image";
import gradientBackground from "../../public/noise-gradient.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">{children}</div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={gradientBackground}
          alt="Pastel gradient"
          className="h-full w-full left-1/2 bg-cover bg-center"
        />
      </div>
    </div>
  );
}
