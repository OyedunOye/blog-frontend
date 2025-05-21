"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { editFormSchema } from "@/zodValidations/auth/constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type EditProfileFormData = z.infer<typeof editFormSchema>;

const EditProfile = () => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // Display image chosen temporarily
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file);
    const imageUrl = URL.createObjectURL(file);
    setObjectUrl(imageUrl);
  };

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      authorImg: undefined,
    },
  });

  const onSubmit = async (values: EditProfileFormData) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h5 className="text-lg font-semibold">Update your profile info</h5>

      <div className="h-[181px] w-[145px] flex flex-col gap-y-2 mb-8">
        <div
          className={cn(
            "relative w-full h-[85%] transition-all",
            objectUrl
              ? "rounded-full flex items-center justify-center border border-[#a8a5a5f5]"
              : "bg-[#D9D9D9] hover:shadow-md"
          )}
        >
          {/* Get Image from user's profile -> objectUrl | authorImg */}
          {/* That means user-dummy would be the image of the user or a blank screen */}
          {objectUrl && (
            <Image
              src={objectUrl ? objectUrl : "/user-dummy.png"}
              alt="Profile avatar"
              width={140}
              height={140}
              className="w-[140px] h-[140px] rounded-full object-cover"
            />
          )}

          <div
            className={cn(
              "absolute bottom-0 right-0 flex items-center justify-center bg-[#F5F5F5F5] h-8 w-8",
              objectUrl && "rounded-full border border-[#a8a5a5f5]"
            )}
          >
            <button className="relative w-full h-full flex items-center justify-center cursor-pointer">
              <label htmlFor="file" className="hidden">
                file
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                placeholder="file"
                onChange={(e) => handleImageChange(e)}
                className="absolute top-0 left-0 h-8 w-8 cursor-pointer opacity-0"
              />
              <CameraIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        </div>
        <p className="">Upload Picture</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full flex items-center justify-between">
            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Firstname"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lastname"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="janedoe@email.com"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" type="submit" className=" mb-5">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
