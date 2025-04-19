"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage  } from "@/components/ui/form"
import { Input } from '../ui/input'
import { useState } from "react"
import { signUpFormSchema } from "@/zodValidations/auth/constant"
import { useRegisterUser } from "@/hooks/auth/useRegisterUser"


type SignUpFormData = z.infer<typeof signUpFormSchema>

const SignUpForm = () => {
  const { mutate, isPending, isSuccess, isError, error, data } = useRegisterUser()

  // const form = useForm()
  const [profilePreview, setProfilePreview] = useState<string | null>(null)

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      authorImg: undefined,
    },
  })

  const onSubmit = async (values: SignUpFormData) => {

    console.log(values)
    const file = values.authorImg?.[0]

    try {

      const formData = new FormData()
      formData.set("firstName", values.firstName)
      formData.set("lastName", values.lastName)
      formData.set("email", values.email)
      formData.set("password", values.password)
      const res = mutate(formData)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(data)
  // console.log(error)
  // console.log(isPending)

  return (
    <div>
      {/* <div className="w-1/2 justify-center mx-auto"> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Firstname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field })=> (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorImg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*"
                      onChange={(e)=> {
                        const file = e.target.files?.[0]
                        if (file) {
                          const url = URL.createObjectURL(file)
                          setProfilePreview(url)
                        }
                        field.onChange(e.target.files)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant='default' type="submit" className="w-full mb-5">Continue</Button>

          </form>
    </Form>
    </div>
  )
}

export default SignUpForm