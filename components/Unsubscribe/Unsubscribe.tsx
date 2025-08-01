"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeFormSchema } from "@/zodValidations/auth/constant";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useUnsubscribeToNewsletter } from "@/hooks/subscribe/useUnsubscribeToNewsletter";
import { toasterAlert } from "@/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

interface UnsubscribeProps {
  email: string;
}

type SubscribeFormData = z.infer<typeof subscribeFormSchema>;

const Unsubscribe = ({ email }: UnsubscribeProps) => {
  const router = useRouter();
  const [homeClick, setHomeClick] = useState<boolean>(false);
  const { mutateAsync, isPending } = useUnsubscribeToNewsletter();
  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = async (values: SubscribeFormData) => {
    try {
      console.log(values);
      // Handle unsubscribe endpoint here
      // From the backend, the email is sent with this format;

      // <a href=`https://blog-frontend-pi-blush.vercel.app/unsubscribe?email={email}`>unsubscribe</a>

      // When they click it, it takes them to the URL `https://blog-frontend-pi-blush.vercel.app/unsubscribe?email={email}`

      // which leads back to this component.

      // Proceed with the unsubcription endpoint from here. { email: values.email }
      const res = await mutateAsync(values);
      if (res.email && !isPending) {
        toasterAlert(res.message);

        form.reset({ email: "" });
        router.push("/");
      }

      if (res.error && !isPending) {
        toasterAlert(res.error);
      }
    } catch (error) {
      console.log(error);
      toasterAlert(
        "An error occured while cancelling your newsletter subscription, please try again later."
      );
    }
  };

  return (
    <section className="flex justify-center">
      <div className="min-h-[500px] w-[90%] border gap-8 max-md:gap-2 bg-white dark:bg-slate-900 rounded-lg shadow-md max-w-[1366px] flex flex-col items-center justify-center gap-y-12 max-md:p-2 my-6">
        <h3
          className={
            "font-semibold text-gray-800 text-6xl text-center max-md:text-lg dark:text-white"
          }
        >
          Unsubscribe from Newsletter
        </h3>
        <div className="lg:w-[700px] text-center flex flex-col gap-y-3 text-lg">
          <p>
            You&apos;re about to unsubscribe from{" "}
            <strong>Shade&apos;s Blog</strong> updates. We hate to see you go,
            our stories, tips, and insights won&apos;t be the same without you.
          </p>

          <p>
            If you&apos;re sure, go ahead and click the{" "}
            <strong>unsubscribe</strong> button, but remember, you&apos;re
            always welcome back anytime.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3 lg:w-[70%] relative mt-4 max-lg:w-[80%] max-md:w-[100%]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-[52px] py-2 rounded-full pl-4"
                      autoFocus
                      // value={email}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="bg-indigo-600 rounded-full flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 max-md:hidden">
              Unsubscribe
            </Button>
            <div className="w-full justify-center mt:4 max-md:flex max-2xl:hidden 2xl:hidden">
              <Button className="bg-indigo-600 rounded-full w-full">
                Unsubscribe
              </Button>
            </div>
          </form>
        </Form>
        <Link href={"/"} className="max-md:mt-3 mb-6">
          <Button onClick={() => setHomeClick(true)} variant="ghost">
            {homeClick ? (
              <LoaderCircle className="text-gray-400 animate-spin" />
            ) : (
              "Home"
            )}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Unsubscribe;
