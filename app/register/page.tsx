import { Metadata } from "next";
import { RegisterForm } from "./form";

export const metadata : Metadata = {
  title: "Register Page"
}

export default function RegisterPage() {
  return <RegisterForm />;
}
