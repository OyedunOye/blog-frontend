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
import { editUserProfileFormSchema } from "@/zodValidations/auth/constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetAUser } from "@/hooks/authors/useGetAUser";
import { useUpdateUserProfile } from "@/hooks/authors/useUpdateUserProfile";
import { toasterAlert } from "@/utils";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Loading from "../common/Loader";

type EditProfileFormData = z.infer<typeof editUserProfileFormSchema>;

const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

const EditProfile = () => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | "">("");

  const { mutateAsync, isPending, isSuccess, isError, error } =
    useUpdateUserProfile();

  const {
    data,
    isSuccess: getUsersIsSuccess,
    error: getUsersError,
    isError: getUsersIsError,
    isLoading: getUserIsLoading,
  } = useGetAUser();

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
    defaultValues: data && {
      firstName: data.user.firstName || "",
      lastName: data.user.lastName || "",
      email: data.user.email || "",
      authorImg: data.user.authorImg || "",
      removeProfilePic: false,
    },
  });

  // console.log(profileImage);

  const onSubmit = async (values: EditProfileFormData) => {
    // console.log("The values are", values);
    try {
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
      // console.log(values.removeProfilePic);
      // console.log(...formData);

      const res = await mutateAsync(formData);

      if (res.user && !isPending) {
        toasterAlert(res.message);
        router.push("/");
      }
      if (isError && !isPending) {
        toasterAlert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(form.getValues("removeProfilePic"));

  return (
    <>
      {getUsersIsError ? (
        <div className="flex max-md:flex-col max-md:mt-4 max-md:p-2 content-center h-fit py-auto gap-2 rounded-sm  shadow-md border">
          <div className="w-[70%] h-fit p-2 flex flex-3/4 content-center">
            <Image
              src={"/warning-sign.webp"}
              alt="warning sign"
              width={80}
              height={40}
              className="object-cover w-200 "
            />
          </div>
          <div className="flex  content-center py-5">
            <p className="font-bold h-fit my-auto p-2">
              Server is unreachable, unable to load the form to update your
              profile at the moment. Please try again later.
            </p>
          </div>
        </div>
      ) : null}

      {getUserIsLoading ? (
        <Loading message="Loading the edit profile form" />
      ) : data ? (
        <div className="flex flex-col gap-y-6">
          <h5 className="text-lg font-semibold">Update your profile info</h5>

          <div className="h-[181px] w-[145px] flex flex-col gap-y-2 mb-8">
            <div
              className={cn(
                "relative w-full h-[85%] transition-all",
                objectUrl || data.user.authorImg
                  ? "rounded-full flex items-center justify-center border border-[#a8a5a5f5]"
                  : "bg-[#D9D9D9] hover:shadow-md"
              )}
            >
              {/* Get Image from user's profile -> objectUrl | authorImg */}
              {/* That means user-dummy would be the image of the user or a blank screen */}
              {/* Nice implementation! But how do I preview the existing picture in users profile?? Now implemented*/}
              {/* How do I differentiate between when the user wants to remove the existing profile picture and when they want to keep it?
              We could add a checkbox for this. Done! */}
              {/* But how to preview the removal of profile pic altogether? I am unable to go back to the empty gray rectangle, although the functionality is as I want. Will be nice to see the preview as well so as not to misdirect users. */}
              {(objectUrl || data.user.authorImg) && (
                <Image
                  src={
                    objectUrl
                      ? objectUrl
                      : data.user.authorImg
                      ? baseUrl + data.user.authorImg
                      : " /user-dummy.png"
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
                  (objectUrl || data.user.authorImg) &&
                    "rounded-full border border-[#a8a5a5f5]"
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
      ) : null}
    </>
  );
};

export default EditProfile;
