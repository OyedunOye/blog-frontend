"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage  } from "@/components/ui/form"
import { Input } from '../ui/input'
import { signUpFormSchema } from "@/zodValidations/auth/constant"


type LoginFormData = z.infer<typeof signUpFormSchema>

const LoginForm = () => {


  const form = useForm<LoginFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = (values: LoginFormData) => {
    console.log(values)
  }

  return (
    <div>
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