import React from "react";
import AuthHeader from "./auth-header";
import AuthFooter from "./auth-footer";
import LoginForm from "./login-form";

export default function LoginTile() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <AuthHeader
        label="Log In"
        subText="Welcome back, it's nice to see you again."
      />
      <LoginForm />
      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        href="/auth/signup"
      />
    </div>
  );
}
