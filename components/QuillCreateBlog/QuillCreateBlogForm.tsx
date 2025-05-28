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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import {
  checkContentWordLim,
  newBlogFormSchema,
} from "@/zodValidations/auth/constant";
import { toasterAlert } from "@/utils";
import Loading from "../common/Loader";
import { useContext, useState } from "react";
import { useCreateBlog } from "@/hooks/blog/useCreateBlog";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { blogReadTime } from "@/utils/helpers";
import { AppContext } from "@/context/AppContext";

type NewBlogFormData = z.infer<typeof newBlogFormSchema>;

const QuillCreateBlogForm = () => {
  const { dispatch, state } = useContext(AppContext);

  const modules = {
    // toolbar: {
    toolbar: [
      // container: [
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
      // ],
      //   handlers: {
      //     image: imageHandler,
      //   ],
    ],
    // }
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
    "indent",
    "link",
    "image",
    "color",
  ];

  const { isPending, isSuccess, isError, error, mutateAsync } = useCreateBlog();

  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<NewBlogFormData>({
    resolver: zodResolver(newBlogFormSchema),
    defaultValues: {
      title: "",
      blogContent: "",
      category: "",
      articleImg: undefined,
    },
  });

  const onSubmit = async (values: NewBlogFormData) => {
    const file = values.articleImg?.[0];

    // console.log("values are:", values);

    try {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("blogContent", values.blogContent);
      formData.set("readTime", blogReadTime(values.blogContent));
      formData.set("category", values.category);
      formData.set("articleImg", file);

      // console.log(values.blogContent);
      // console.log(checkContentWordLim(values.blogContent));
      if (checkContentWordLim(values.blogContent) === "enough") {
        dispatch({
          type: "BLOGCONTENT_WARN",
          payload: "No",
        });

        const res = await mutateAsync(formData);
        // console.log(res);

        if (res.blog && !isPending) {
          toasterAlert(res.message);
          router.push("/");
        }
      }

      if (checkContentWordLim(values.blogContent) === "notEnough") {
        toasterAlert(
          "The blog content is not up to the minumum word requirement."
        );
        dispatch({
          type: "BLOGCONTENT_WARN",
          payload: "Yes",
        });
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
                  <FormItem className=" ">
                    <FormLabel
                      className={`${
                        state.blogContentWarn === "Yes" ? "text-red-600" : " "
                      }`}
                    >
                      Blog content
                    </FormLabel>
                    <FormControl className="h-[50vh] ">
                      <ReactQuill
                        modules={modules}
                        formats={formats}
                        placeholder={"Write your blog here."}
                        theme="snow"
                        //  value={quillFormValue}
                        //  onChange={setValue}
                        // className="h-[50vh] border border-red-700"
                        id="blogContent"
                        {...field}
                        className={`h-[50vh]`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* </div> */}
              {state.blogContentWarn === "Yes" ? (
                <p className="text-sm text-red-600 mt-12">
                  You need at least 120 words for the blog content
                </p>
              ) : null}
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Category tag</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Blog Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Programming">Programming</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
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
