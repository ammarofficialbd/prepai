"use client";

import React, { Component } from "react";
import { Button, Input, Link, Form, toast, Toast, useToast, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/logo";
import { registerUser } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import useGenericSubmitHandler from "@/hooks/useGenericHandler";
import { set } from "mongoose";

export default function Register() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter()
  type ToastColor = "default" | "primary" | "secondary" | "foreground" | "success" | "warning" | "danger";
  const [color, setColor] = React.useState<ToastColor>("default");
  
 const [message, setMessage] = React.useState<string>("wait")

 console.log("color" +"=>" + color, message)

  const { handleSubmit, loading} = useGenericSubmitHandler(async (data) => {
    const res = await registerUser(data.name as string, data.email as string, data.password as string)
    console.log(res)
    if (res?.error) {
      setColor("danger")
      setMessage(res.error)
    }
    if (res?.create) {
      setColor("success")
      setMessage("Account created successfully")
      router.push("/login")
    }
    console.log(res)
  })
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-medium">Welcome</p>
          <p className="text-small text-default-500">
            Create an account to get started
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Form validationBehavior="native" onSubmit={handleSubmit} className={loading ? "opacity-50 pointer-events-none" : ""}>
            <div className="flex flex-col w-full">
              <Input
                isRequired
                classNames={{
                  base: "-mb-[2px]",
                  inputWrapper:
                    "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                }}
                label="Full Name"
                name="name"
                placeholder="Enter your username"
                type="text"
                variant="bordered"
              />
              <Input
                isRequired
                classNames={{
                  base: "-mb-[2px]",
                  inputWrapper:
                    "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                }}
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
                isRequired
                minLength={8}
                classNames={{
                  base: "-mb-[2px]",
                  inputWrapper:
                    "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                }}
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
            </div>

            <Button className="w-full mt-2" color="primary" type="submit" isLoading={loading} 
            onPress={() => addToast({ title: message, description: "Please wait...", color: color })}>
              Register
            </Button>
          </Form>
        </div>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/login" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}