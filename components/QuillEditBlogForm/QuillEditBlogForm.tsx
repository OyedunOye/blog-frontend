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

import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import {
  checkContentWordLim,
  editBlogFormSchema,
} from "@/zodValidations/auth/constant";
import { toasterAlert } from "@/utils";
// import Loading from "../common/Loader";
import { useContext, useState } from "react";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { AppContext } from "@/context/AppContext";
import { useEditBlog } from "@/hooks/blog/useEditBlog";
import { blogReadTime } from "@/utils/helpers";
import MaxWidth from "../common/MaxWidthWrapper";
import { LoaderCircle } from "lucide-react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditBlogFormData = z.infer<typeof editBlogFormSchema>;

// interface EditBlogProps {
//   blogId: string;
// }

const QuillEditBlogForm = () => {
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
    "indent",
    "link",
    "image",
    "color",
  ];

  const { isPending, mutateAsync } = useEditBlog();

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const { state, dispatch } = useContext(AppContext);

  const [blogEditContentWarn, setEditBlogContentWarn] = useState<string>("No");

  const router = useRouter();

  const form = useForm<EditBlogFormData>({
    resolver: zodResolver(editBlogFormSchema),
    defaultValues: {
      title: state.singleBlogDetail.title,
      blogContent: state.singleBlogDetail.blogContent,
      category: state.singleBlogDetail.category,
      articleImg: "",
    },
  });

  const onSubmit = async (values: EditBlogFormData) => {
    const file = values.articleImg?.[0];

    // console.log("New values are:", values);

    try {
      const formData = new FormData();
      // values.title !== "" ? formData.set("title", values.title) : "";
      // values.blogContent !== ""
      //   ? formData.set("blogContent", values.blogContent)
      //   : "";
      // values.blogContent !== ""
      //   ? formData.set("readTime", blogReadTime(values.blogContent))
      //   : "";
      // values.category !== "" ? formData.set("category", values.category) : "";
      // values.articleImg !== "" ? formData.set("articleImg", file) : "";

      if (values.title !== "") {
        formData.set("title", values.title);
      }
      if (values.blogContent !== "") {
        formData.set("blogContent", values.blogContent);
      }
      if (values.blogContent !== "") {
        formData.set("readTime", blogReadTime(values.blogContent));
      }
      if (values.category !== "") {
        formData.set("category", values.category);
      }
      if (values.articleImg !== "") {
        formData.set("articleImg", file);
      }
      // console.log("formdata are", ...formData);

      if (checkContentWordLim(values.blogContent) === "enough") {
        setEditBlogContentWarn("No");

        const res = await mutateAsync({
          blogData: formData,
          blogId: state.singleBlogDetail._id,
        });

        if (res) {
          // checking blogIsSuccess, data and other variables from useEditBlog() not working here. Those are always not
          // in our desired format before synchronous checks happen at this point. Hence, only res which was awaited
          //helped me see my desired outcome here.
          toasterAlert(res.message);
          const payload = {
            openEditModal: false,
            storedBlogId: null,
            SingleBlogDetail: null,
          };
          dispatch({
            type: "CLOSE_EDIT_MODAL",
            payload: payload,
          });
          router.push("/");
        }
      }
      if (checkContentWordLim(values.blogContent) === "notEnough") {
        setEditBlogContentWarn("Yes");
        toasterAlert(
          "The blog content is not up to the minumum word requirement."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MaxWidth className={`max-md:mx-0 ${isPending && "cursor-progress"}`}>
      {profilePreview && <p></p>}
      {/* {isPending ? (
        <Loading message="Updating your blog" />
      ) : ( */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog title</FormLabel>
                <FormControl>
                  <Input placeholder="Write your blog title here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`mb-16 max-md:mb-32 ${
              blogEditContentWarn === "Yes" ? "mb-5 max-md:mb-38" : ""
            }`}
          >
            <FormField
              control={form.control}
              name="blogContent"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel
                    className={`${
                      blogEditContentWarn === "Yes" ? "text-red-600" : " "
                    }`}
                  >
                    Blog content
                  </FormLabel>
                  <FormControl>
                    <ReactQuill
                      modules={modules}
                      formats={formats}
                      placeholder={"Write your blog here."}
                      theme="snow"
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
          {blogEditContentWarn === "Yes" ? (
            <p className="text-sm text-red-600 mt-8 max-md:-mt-8">
              You need at least 120 words for the blog content
            </p>
          ) : null}

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Category tag</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={state.singleBlogDetail.category}
                  >
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
                <FormLabel>Article&apos;s cover image</FormLabel>
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
            {isPending ? (
              <LoaderCircle className="text-gray-400 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
      {/* )} */}
    </MaxWidth>
  );
};

export default QuillEditBlogForm;
