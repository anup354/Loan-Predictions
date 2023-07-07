import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
// MdOutlineVisibilityOff

const Logins = () => {
  const router = useRouter();
  const [isvisible, setIsvisible] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<String>();

  // useEffect(()=>{
  //   if(localStorage.getItem("token")){
  //     router.push("portal/dashboard");
  //   }
  // },[])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // const loginForm = {
    //   email: data.email,
    //   password: data.password,
    // };
    // try {
    //   const response = await axios.post(`${BaseUrl}/api/userlogin`, loginForm);
    //   if (response?.status === 200) {
    //     auth?.login(response?.data?.token, response?.data?.region);
    //     toast.success("Logged in successfully");
    //     router.push("portal/dashboard");
    //   } else {
    //   }
    // } catch (err) {
    //   console.log(err);

    //   if (err?.response?.data.errors) {
    //     if (err?.response?.data.errors.email) {
    //       setErrorMessage(err?.response?.data.errors.email.message);
    //     } else if (err?.response?.data.errors.password) {
    //       setErrorMessage(err?.response?.data.errors.password.message);
    //     }
    //   } else {
    //     setErrorMessage(err?.response?.data.message);
    //   }
    // }
  };

  return (
    <>
      <Head>
        <title>Login | Loan Predictor</title>
      </Head>
      {/* <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 15000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      /> */}
      <div>
        <div className="px-20 max-lg:px-10 max-sm:px-5  py-10">
          <div className="flex max-lg:flex-col ">
            <div className="flex-1  bg-primary rounded-l-md px-10 py-10 text-white">
              <div className="text-4xl font-semibold ">Login</div>
              <div className="py-5">
                Please enter your login details to continue using your account
              </div>
              <div className="">Not member of Loan Predictor</div>
              <Link href="/signup">
                {" "}
                <button className="px-6 py-1 border-2 rounded-md my-5 hover:bg-white hover:text-primary text-lg font-medium">
                  Signup
                </button>
              </Link>
              {/* <div className="">New here ? Join softsaro</div>
           <Link href="/signup">  <button className="px-6 py-1 border-2 rounded-md my-5 hover:bg-white hover:text-primary text-lg font-medium">
                Sign up
              </button></Link>  */}
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
                      minLength={8}
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
                          <MdOutlineVisibility />
                        </span>
                      ) : (
                        <span className="">
                          <MdOutlineVisibilityOff />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                <Link href="">
                  <div className="underline text-xs py-5 text-primary text-center">
                    Having trouble logging in?
                  </div>
                </Link>
                <button
                  className="w-full font-medium text-lg text-white bg-primary py-3 rounded-md hover:bg-white hover:text-primary border hover:border-primary"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Logins;
