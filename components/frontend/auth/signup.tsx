"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomCarousel from "../custom-carousel";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Mail, Phone, User } from "lucide-react";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import Logo from "@/components/logo";
export type RegisterInputProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};
export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();
  const router = useRouter();
  async function onSubmit(data: RegisterInputProps) {
    console.log(data);
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-4">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 sm:static sm:left-5 sm:transform-none">
            <Logo />
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl sm:py-4 font-bold">Create an Account</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Full Name"
              register={register}
              name="fullName"
              errors={errors}
              placeholder="Name"
              tooltipText="Enter your Name"
              icon={User}
            />
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="email address"
              tooltipText="Enter your email address"
              icon={Mail}
            />
            <TextInput
              label="Phone Number"
              register={register}
              name="phone"
              type="tel"
              errors={errors}
              placeholder="email address"
              tooltipText="Enter your phone number"
              icon={Phone}
            />
            <PasswordInput
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
            />

            <SubmitButton
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600"
              title="Sign Up"
              loading={isLoading}
              loadingTitle="Signing in your Account please wait..." showIcon={true} 
            />
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
