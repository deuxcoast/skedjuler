import React from "react";
import AuthHeader from "./auth-header";
import AuthFooter from "./auth-footer";
import LoginForm from "./login-form";

export default function SignUpTile() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <AuthHeader
        label="Sign Up"
        subText="Welcome back :-) It's nice to see you again."
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
