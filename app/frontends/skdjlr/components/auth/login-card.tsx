import CardWrapper from "./card-wrapper";
import LoginForm from "./login-form";

export default function LoginCard() {
  return (
    <CardWrapper
      headerLabel="Log In"
      subHeaderLabel="Welcome back :) It's nice to see you again."
      footerLabel="Don't have an account?"
      footerLinkLabel="Sign up"
      footerHref="/auth/sign-up"
    >
      <LoginForm />
    </CardWrapper>
  );
}
