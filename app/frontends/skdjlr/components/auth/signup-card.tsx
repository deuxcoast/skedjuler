import CardWrapper from "./card-wrapper";
import LoginForm from "./login-form";

export default function SignupCard() {
  return (
    <CardWrapper
      headerLabel="Sign Up"
      subHeaderLabel="Enter your information to create an account"
      footerLabel="Already have an account?"
      footerLinkLabel="Login"
      footerHref="/auth/login"
    >
      <LoginForm />
    </CardWrapper>
  );
}
