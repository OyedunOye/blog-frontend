"use client"

import React from 'react'
import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'


const LoginForm = () => {

    const form = useForm()

  return (
    <div>
      {/* <div className="w-1/2 justify-center mx-auto"> */}
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
    </div>
  )
}

export default LoginForm