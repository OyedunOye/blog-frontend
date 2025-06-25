"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { loginFormSchema } from "@/zodValidations/auth/constant";
import { useLogUserIn } from "@/hooks/auth/useLogUserIn";
import { toasterAlert } from "@/utils";

// For client-side usage
import { setCookie } from "cookies-next/client";
import { LoaderCircle } from "lucide-react";
import TwoFA from "../modals/TwoFaModal";

type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const [twoFa, setTwoFa] = useState<boolean>(true);
  const { isPending, mutateAsync, data } = useLogUserIn();

  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      const res = await mutateAsync(values);
      // console.log("response is", res);

      if (res.token && !isPending) {
        setCookie("token", res.token);
        toasterAlert(res.message);
        router.push("/");
      }

      if (res.email && !isPending) {
        setTwoFa(true);
      }
    } catch (error) {
      // if(error?.status?===401)
      if (data === undefined && !isPending) {
        toasterAlert(
          "There is either a mismatch of email and password or, unable to connect to the server. Make sure your internet connection is okay and retry logging in."
        );
      }
      console.log(error);
    }
  };

  return (
    <div>
      {twoFa && (
        // Get email from the form via form values
        // Here, we are passing a hardcoded email for demonstration purposes
        <TwoFA email="odopeter@gmail.com" closeModal={() => setTwoFa(false)} />
      )}
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="default" type="submit" className="w-full mb-5">
            {isPending ? (
              <LoaderCircle className="text-gray-400 animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
