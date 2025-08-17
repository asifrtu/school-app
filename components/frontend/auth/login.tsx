"use client";
import Link from "next/link";   
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomCarousel from "../custom-carousel";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import Logo from "@/components/logo";
import { Mail, Lock, LogIn } from "lucide-react";
import PasswordInput from "@/components/FormInputs/PasswordInput";
export type RegisterInputProps = {
  email: string;
  password: string;
};
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();
  const router = useRouter();
  async function onSubmit(data: RegisterInputProps) {
    alert("Login successful");
    console.log(data);
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-4">
        <div className="mx-auto grid w-[350px] gap-6">
        <div className="absolute top-5 left-5">
            <Logo />
          </div>

          <div className="max-[600px]:mt-20 min-[320px]:text-center grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login to your Account</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="email address"
              tooltipText="Enter your email address"
              icon={Mail} // Pass a valid icon component like `Mail` or omit this prop
            />

            <PasswordInput
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******" tooltipText={""} 
              forgetPasswordLink="/forgotPassword"  
              icon={Lock}     />

            <SubmitButton
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600"
              title="Login"
              loading={isLoading}
              loadingTitle="Signing in your Account please wait..." showIcon={true}            />
          </form>
          {/* <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div> */}
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
