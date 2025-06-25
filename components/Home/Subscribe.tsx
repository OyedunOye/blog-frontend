"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import MaxWidth from "../common/MaxWidthWrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { subscribeFormSchema } from "@/zodValidations/auth/constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubscribeToNewsletter } from "@/hooks/subscribe/useSubscribeToNewsletter";
import { toasterAlert } from "@/utils";

type SubscribeFormData = z.infer<typeof subscribeFormSchema>;

const Subscribe = () => {
  const { mutateAsync, isPending } = useSubscribeToNewsletter();

  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: SubscribeFormData) => {
    try {
      // console.log(values);
      const res = await mutateAsync(values);
      if (res.subscriber && !isPending) {
        toasterAlert(res.message);

        form.reset({ email: "" });
      }
    } catch (error) {
      console.log(error);
      toasterAlert("That was unsuccessful, please try again later.");
    }
  };

  return (
    <section
      id="subscription"
      className="w-full bg-[#F3F4F6] dark:bg-[#4c484a]"
    >
      <MaxWidth className="flex justify-center content-center w-full h-fit py-2 pb-3 bg-[#F3F4F6] dark:bg-[#4c484a]">
        <div className="flex flex-col justify-center py-2 mx-auto gap-2 max-md:gap-4 max-md:w-full">
          <h3 className="font-bold text-xl text-center">
            📬 Subscribe to our newsletter
          </h3>
          <p className="text-md text-slate-600 dark:text-white text-center">
            Read and share new perspectives on just about any topic.
            Everyone&apos;s welcome.👋
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center content-center mx-auto w-[80%] max-md:flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Email"
                        className="w-84 flex max-md:w-64"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                variant="default"
                className="max-md:justify-self-center flex"
              >
                Subscribe
              </Button>
            </form>
          </Form>
          <p className="text-slate-600 text-sm text-center dark:text-white">
            We care about the protection of your data. Read our Privacy Policy.
          </p>
        </div>
      </MaxWidth>
    </section>
  );
};

export default Subscribe;
