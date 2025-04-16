"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage  } from "@/components/ui/form"
import { Input } from '../ui/input'
import { useState } from "react"


const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Firstname must have at least 2 characters."
  }).max(30, {
    message: "Firstname cannot exceed 30 characters."
  }),

  lastName: z.string().min(2, {
    message: "Lastname must have at least 2 characters."
  }).max(30, {
    message: "Firstname cannot exceed 30 characters."
  }),

  email: z.string().email({
    message: "Invalid email address."
  }),

  password: z.string().min(8, {
    message: "The password must be at least 8 characters"
  }),

  confirmPassword: z.string().min(8, {
    message: "This must match the password provided above"
  }),

  authorImg: z.any()

  // authorImg: z.any().refine((file) => file?.[0], {
  //   message: "Profile picture is optional"
  // })

}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type SignUpFormData = z.infer<typeof formSchema>

const SignUpForm = () => {


  // const form = useForm()
  const [profilePreview, setProfilePreview] = useState<string | null>(null)

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      authorImg: undefined,
    },
  })

  const onSubmit = (values: SignUpFormData) => {
    console.log(values)
    const file = values.authorImg?.[0]
  }

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
                  <FormLabel>Repeat Password</FormLabel>
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