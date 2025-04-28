"use client";

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
// import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import { newBlogFormSchema } from "@/zodValidations/auth/constant";
import { toasterAlert } from "@/utils";
import Loading from "../common/Loader";
import { useState } from "react";
import { useCreateBlog } from "@/hooks/blog/useCreateBlog";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type NewBlogFormData = z.infer<typeof newBlogFormSchema>;

const QuillCreateBlogForm = () => {
  // const [quillFormValue, setValue] = useState("");
  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      //   handlers: {
      //     image: imageHandler,
      //   },
    },
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  const { isPending, isSuccess, isError, error, mutateAsync } = useCreateBlog();

  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<NewBlogFormData>({
    resolver: zodResolver(newBlogFormSchema),
    defaultValues: {
      title: "",
      blogContent: "",
      readTime: "",
      articleImg: undefined,
    },
  });

  const onSubmit = async (values: NewBlogFormData) => {
    const file = values.articleImg?.[0];

    console.log("values are:", values);

    try {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("blogContent", values.blogContent);
      formData.set("readTime", values.readTime);
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

            <div className="mb-16">
              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Blog content</FormLabel>
                    <FormControl>
                      <ReactQuill
                        modules={modules}
                        formats={formats}
                        placeholder={"Write your blog here."}
                        theme="snow"
                        //  value={quillFormValue}
                        //  onChange={setValue}
                        className="h-[50vh]"
                        id="blogContent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <QuillCompo /> */}

            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem className="">
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
                  <FormLabel>Article's cover image</FormLabel>
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

export default QuillCreateBlogForm;
