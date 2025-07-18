"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { editPasswordFormSchema } from "@/zodValidations/auth/constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ToggleSwitch from "./ToggleSwitch";
import { useEffect, useState } from "react";
import { useChangePassword } from "@/hooks/auth/useChangePassword";
import { toasterAlert } from "@/utils";
import { useRouter } from "next/navigation";
import { useGetAUser } from "@/hooks/authors/useGetAUser";
import { useToggleTwoFA } from "@/hooks/auth/useToggleTwoFA";

type PasswordFormData = z.infer<typeof editPasswordFormSchema>;

const Security = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const { mutateAsync, isPending } = useChangePassword();

  const {
    mutateAsync: mutateToggleTwoFA,
    isPending: mutateToggleTwoFAIsPending,
  } = useToggleTwoFA();

  const { data, isSuccess } = useGetAUser();

  useEffect(() => {
    if (data && isSuccess) {
      setIsToggled(data.user.isTwoFAuthActive);
    }
  }, [data, isSuccess]);

  const router = useRouter();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(editPasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: PasswordFormData) => {
    try {
      // console.log(values);
      const res = await mutateAsync(values);
      // console.log("response is", res);

      if (res.user && !isPending) {
        toasterAlert(res.message);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTwoFactor = async () => {
    // setIsToggled((prev) => !prev);
    try {
      // console.log(!isToggled);
      const res = await mutateToggleTwoFA({ status: !isToggled });
      // console.log(res);
      if (res.user && !mutateToggleTwoFAIsPending) {
        toasterAlert(res.message);
        setIsToggled(res.user.isTwoFAuthActive);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h5 className="text-lg font-semibold">Change your password</h5>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" type="submit" className=" mb-5">
            Update Password
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-y-4">
        <h4 className="text-2xl font-semibold text-black dark:text-white">
          Two-step Authentication
        </h4>
        <p>
          {!isToggled
            ? "Two-step authentication is currently off. For enhanced security, please enable two-step verification to protect your account."
            : "You have activated two-step authentication which enhances your account protectection!"}
        </p>

        <ToggleSwitch
          defaultChecked={isToggled}
          onClick={handleTwoFactor}
          pointer
        />
      </div>
    </div>
  );
};

export default Security;
