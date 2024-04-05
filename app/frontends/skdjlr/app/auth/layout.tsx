import Image from "next/image";
import gradientBackground from "../../public/noise-gradient.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-screen flex-wrap">
      <div className="flex w-full flex-col md:w-1/2">{children}</div>
      {/* <div className="flex items-center justify-center py-12">{children}</div> */}
      <div className="relative hidden h-screen select-none bg-blue-600 bg-gradient-to-br md:block md:w-1/2">
        <Image
          src={gradientBackground}
          alt="Pastel gradient"
          className="h-full w-full left-1/2 bg-cover bg-center"
        />
      </div>
    </div>
  );
}
