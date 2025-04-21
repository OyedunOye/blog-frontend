"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage  } from "@/components/ui/form"
import { Input } from '../ui/input'
import { loginFormSchema } from "@/zodValidations/auth/constant"
import { useLogUserIn } from "@/hooks/auth/useLogUserIn"
import { toasterAlert } from "@/utils"
import { Loader } from "lucide-react"


type LoginFormData = z.infer<typeof loginFormSchema>

const LoginForm = () => {

  const { mutate, isPending, isSuccess, isError, error, data } = useLogUserIn()

  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = async (values: LoginFormData) => {
    console.log(values)
    try {
      const formData = new FormData()
      formData.set("email", values.email)
      formData.set("password", values.password)
      const res = mutate(formData)
      console.log(res)
      // the both isSuccess instructions are lagging, first attempt neither shows toaster alert not navigate to indi-
      //cated route. A similar prob in budget app was because the initial state was null and the first attempt picks null.
      //how to solve this in next.js with next/navigation router?
      isSuccess ? toasterAlert(data.message): ""
      isSuccess ? router.push("/") : ""
    } catch (error) {
      console.log(error)
    }
  }
  

  // console.log("data message:",data.message)
  console.log(error)
  console.log(isPending)

  return (
    <div>
      {isPending ? (
        <div className='flex  min-h-screen  max-sm:w-full sm:px-3'>
        <div className="flex flex-col items-center justify-center w-full">
          <Loader className="h-8 w-8 text-white animate-spin" />
          <p className='text-2xl'>Logging in</p>
        </div>
    </div> ) : ""
      }
      {/* <div className="w-1/2 justify-center mx-auto"> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <Button variant='default' type="submit" className="w-full mb-5">Continue</Button>

          </form>
    </Form>
    </div>
  )
}

export default LoginForm