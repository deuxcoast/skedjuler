import React from "react";
import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export default function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <div className="mt-4 text-center text-sm">
      {text}{" "}
      <Link href={href} className="underline">
        {linkText}
      </Link>
    </div>
  );
}
