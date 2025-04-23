"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { newBlogFormSchema } from "@/zodValidations/auth/constant";
import { useLogUserIn } from "@/hooks/auth/useLogUserIn";
import { toasterAlert } from "@/utils";
import Loading from "../common/Loader";
import { useState } from "react";

type NewBlogFormData = z.infer<typeof newBlogFormSchema>;

const NewBlogForm = () => {
  const { isPending, isSuccess, isError, error, mutateAsync } = useLogUserIn();

  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<NewBlogFormData>({
    resolver: zodResolver(newBlogFormSchema),
    defaultValues: {
      title: "",
      blogContent: "",
      readTime: 0,
      articleImg: undefined,
    },
  });

  const onSubmit = async (values: NewBlogFormData) => {
    const file = values.articleImg?.[0];

    try {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("blogContent", values.blogContent);
      formData.set("readTime", String(values.readTime));
      formData.set("articleImg", file);

      const res = await mutateAsync(formData);
      console.log(res);

      if (res.blog && !isPending) {
        toasterAlert(res.message);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isPending ? (
        <Loading message="Submitting your new blog" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write your blog title here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="blogContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog content here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Read time (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Provide the read time for your article"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="articleImg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setProfilePreview(url);
                        }
                        field.onChange(e.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="default" type="submit" className="w-full mb-5">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default NewBlogForm;
