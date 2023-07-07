import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { MdOutlineVisibilityOff,MdOutlineVisibility } from "react-icons/md";

const Create = () => {
  const router = useRouter();

  const [isvisible, setIsvisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
     <Head>
        <title>Sign Up | Loan Predictor</title>
      </Head>
      <div className="max-md:pt-0 max-lg:pt-0 max-sm:pt-0 max-w-screen-3xl mx-auto">
        <div className="px-20   py-10">
          <div className="flex  ">
            <div className="flex-1 bg-primary rounded-l-md px-10 py-10 text-white">
              <div className="text-4xl font-semibold ">Signup</div>
              <div className="py-5">Sign up to create your account.</div>
              <div className="">Already member of Loan Predictor</div>
              <Link href="/login">
                {" "}
                <button className="px-6 py-1 border-2 rounded-md my-5 hover:bg-white hover:text-primary text-lg font-medium">
                  Login
                </button>
              </Link>
              <div className=" flex gap-10  text-hero text-slate-200 pt-5">
                <Link href="https://www.facebook.com/softsaronepal">
                  {" "}
                  <BsFacebook />
                </Link>
                <Link href="https://www.instagram.com/softsaronepal/">
                  <BsInstagram />
                </Link>
                <Link href="https://www.linkedin.com/company/softsaronepal/">
                  <BsLinkedin />
                </Link>
                <Link href="https://twitter.com/softsaronepal">
                  <BsTwitter />
                </Link>
              </div>
            </div>
            <div className="flex-1 py-10 px-8 border-2 rounded-r-md">
              {errorMessage && (
                <div className="text-red-500 p-3 border mb-5 border-red-500 bg-red-50 ">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="mt-10">
                  Email
                </label>{" "}
                <br />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={
                    errors?.email
                      ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full   focus:outline-none"
                      : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3  focus:ring-1 focus:ring-primary"
                  }
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
                <div className=" pt-5">
                  <div className="relative">
                    <label htmlFor="password">Password</label> <br />
                    <input
                      type={isvisible ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={
                        errors?.password
                          ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full   focus:outline-none"
                          : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3 focus:ring-1 focus:ring-primary"
                      }
                    />
                    <div
                      className="absolute top-14 right-4 cursor-pointer"
                      onClick={() => setIsvisible(!isvisible)}
                    >
                      {isvisible ? (
                        <span className="">
                          <MdOutlineVisibility/>
                        </span>
                      ) : (
                        <span className="">
                          <MdOutlineVisibilityOff/>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {console.log(errors)}
                    {errors.password.message}
                  </span>
                )}
                <div className="pt-5">
                  <div className="relative">
                    <label htmlFor="confirmPassword">Confirm Password</label>{" "}
                    <br />
                    <input
                      type={isConfirmVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                      className={
                        errors?.confirmPassword
                          ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full focus:outline-none"
                          : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3 focus:ring-1 focus:ring-primary"
                      }
                    />
                    <div
                      className="absolute top-14 right-4 cursor-pointer"
                      onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                    >
                      {isConfirmVisible ? (
                        <span className="">
                          <MdOutlineVisibility/>
                        </span>
                      ) : (
                        <span className="">
                          <MdOutlineVisibilityOff/>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
                <button
                  className="w-full my-5 font-medium text-lg text-white bg-primary py-3 rounded-md hover:bg-white hover:text-primary border hover:border-primary"
                  type="submit"
                >
                  Sign Up
                </button>
                <div className=" text-xs  text-primary justify-center flex">
                  <div>I&apos;m already a member. </div>
                  <Link href="/login">
                    <div className="underline"> Log in</div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
