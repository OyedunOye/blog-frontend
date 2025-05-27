"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { editUserProfileFormSchema } from "@/zodValidations/auth/constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetAUser } from "@/hooks/authors/useGetAUser";
import { AppContext } from "@/context/AppContext";
import { useUpdateUserProfile } from "@/hooks/authors/useUpdateUserProfile";
import { toasterAlert } from "@/utils";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Value } from "@radix-ui/react-select";

type EditProfileFormData = z.infer<typeof editUserProfileFormSchema>;

const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

const EditProfile = () => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | "">("");
  const [deleteProfilePic, setDeleteProfilePic] = useState<boolean>(false);

  const { dispatch, state } = useContext(AppContext);

  const { mutateAsync, isPending, isSuccess, isError, error } =
    useUpdateUserProfile();

  const router = useRouter();

  // Display image chosen temporarily
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    const imageUrl = URL.createObjectURL(file);
    setObjectUrl(imageUrl);
  };

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editUserProfileFormSchema),
    defaultValues: state.profileData?.user
      ? {
          firstName: state.profileData.user.firstName,
          lastName: state.profileData.user.lastName,
          email: state.profileData.user.email,
          authorImg: state.profileData.user.authorImg,
          removeProfilePic: false,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          authorImg: "",
        },
  });

  console.log(profileImage);

  const onSubmit = async (values: EditProfileFormData) => {
    console.log("The values are", values);
    try {
      // const file = values.authorImg?.[0];
      // console.log(file);

      const formData = new FormData();
      values.firstName !== ""
        ? formData.set("firstName", values.firstName)
        : "";
      values.lastName !== "" ? formData.set("lastName", values.lastName) : "";
      values.email !== "" ? formData.set("email", values.email) : "";
      profileImage !== "" && !values.removeProfilePic
        ? formData.set("authorImg", profileImage)
        : values.removeProfilePic
        ? formData.set("authorImg", "")
        : "";
      console.log(values.removeProfilePic);
      console.log(...formData);

      const res = await mutateAsync(formData);

      if (res.user && !isPending) {
        toasterAlert(res.message);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(form.getValues("removeProfilePic"));

  const del = () => console.log(form.getValues("removeProfilePic"));
  del();

  return (
    <div className="flex flex-col gap-y-6">
      <h5 className="text-lg font-semibold">Update your profile info</h5>

      <div className="h-[181px] w-[145px] flex flex-col gap-y-2 mb-8">
        <div
          className={cn(
            "relative w-full h-[85%] transition-all",
            objectUrl || state.profileData.user.authorImg
              ? "rounded-full flex items-center justify-center border border-[#a8a5a5f5]"
              : "bg-[#D9D9D9] hover:shadow-md"
          )}
        >
          {/* Get Image from user's profile -> objectUrl | authorImg */}
          {/* That means user-dummy would be the image of the user or a blank screen */}
          {/* Nice implementation! But how do I preview the existing picture in users profile?? Now implemented*/}
          {/* How do I differentiate between when the user wants to remove the existing profile picture and when they want to keep it? 
          We could add a checkbox for this. */}
          {(objectUrl || state.profileData.user.authorImg) && (
            <Image
              src={
                objectUrl
                  ? objectUrl
                  : state.profileData.user.authorImg
                  ? baseUrl + state.profileData.user.authorImg
                  : "http://localhost:3000/user-dummy.png"
              }
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
      {/* <div className="flex flex-col -mt-4 gap-2">
        <label htmlFor="deleteProfilePic" className=" ">
          Remove profile picture entirely
        </label>
        <Checkbox id="deleteProfilePic" />
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="">
            <FormField
              control={form.control}
              name="removeProfilePic"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Remove profile picture entirely</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

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
