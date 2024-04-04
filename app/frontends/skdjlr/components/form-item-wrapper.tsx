import React from "react";
import { Input } from "./ui/input";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import Link from "next/link";
import { firstLetterUppercase } from "@/lib/utils";

interface FormItemWrapperProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  text: string;
  link?: LinkProp;
  disabled: boolean;
  placeholder: string;
  type: string;
}

type LinkProp = {
  include: boolean;
  text: string;
  href: string;
};

export default function FormItemWrapper<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  link = {
    include: false,
    text: "",
    href: "",
  },
  disabled,
  placeholder,
  type,
}: FormItemWrapperProps<TFieldValues, TName>) {
  return (
    <FormItem>
      {link.include ? (
        <div className="flex items-center">
          <FormLabel>{firstLetterUppercase(type)}</FormLabel>
          <Link
            href={link.href}
            className="ml-auto inline-block text-sm underline"
          >
            {link.text}
          </Link>
        </div>
      ) : (
        <FormLabel>{firstLetterUppercase(type)}</FormLabel>
      )}
      <FormControl>
        <Input
          {...field}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
