"use client"

import { loginSocialMedia } from "@/constants"
import MaxWidth from "../Home/MaxWidthWrapper"
// import { Button } from "../ui/button"
// import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const Login = () => {
    const form = useForm()

  return (
    <div className="h-1/2 flex justify-center content-center flex-col">
        <div className="bg-[#F3F4F6] w-full text-center h-56 pt-15 p-2">
            <h3 className="font-bold text-xl">🔑 Login</h3>
            <p className="text-md text-slate-600"> Welcome to our blog magazine community</p>
        </div>
        <MaxWidth className="h-contain py-10 w-2/3 justify-center divide-y gap-8 absolute top-36 border z-99 bg-white rounded-lg shadow-md">
          <div className="flex w-1/2 flex-col mx-auto py-5 gap-5">
              {loginSocialMedia.map((item)=> (
                  <div className="key={item.name} w-full ">
                      <Button variant='outline' className="p-2 gap-5 w-full">
                          <item.img /> Continue with {item.name}
                      </Button>
                  </div>

              ))}
          </div>

          <div className="w-1/2 justify-center mx-auto">
            <Form {...form}>
            <form  className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="py-4">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your personal email address.
                    </FormDescription> */}
                    {/* <FormMessage /> */}

                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is login password.
                    </FormDescription> */}
                    {/* <FormMessage /> */}
              </FormItem>
                )}
              />
              <Button variant='default' type="submit" className="w-full mb-5">Continue</Button>

            </form>
        </Form>
      <div className="justify-center flex w-full mx-auto"></div>
          <Button variant='ghost' className="mx-auto">New user? Create an account</Button>
          </div>
        </MaxWidth>
    </div>
  )
}

export default Login