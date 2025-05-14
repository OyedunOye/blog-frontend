"use client";

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

// import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import {
  checkContentWordLim,
  editBlogFormSchema,
} from "@/zodValidations/auth/constant";
import { toasterAlert } from "@/utils";
import Loading from "../common/Loader";
import { useContext, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { AppContext } from "@/context/AppContext";
import { useEditBlog } from "@/hooks/blog/useEditBlog";
import { blogReadTime } from "@/utils/helpers";

type EditBlogFormData = z.infer<typeof editBlogFormSchema>;

interface EditBlogProps {
  blogId: string;
}

const QuillEditBlogForm = ({ blogId }: EditBlogProps) => {
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
    // "bullet",
    "indent",
    "link",
    "image",
    "color",
    // "clean",
  ];

  const { isPending, isSuccess, isError, error, mutateAsync, data } =
    useEditBlog();

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const { state, dispatch } = useContext(AppContext);

  // console.log(state.singleBlogDetail);

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

    console.log("New values are:", values);

    try {
      const formData = new FormData();
      values.title !== "" ? formData.set("title", values.title) : "";
      values.blogContent !== ""
        ? formData.set("blogContent", values.blogContent)
        : "";
      values.blogContent !== ""
        ? formData.set("readTime", blogReadTime(values.blogContent))
        : "";
      values.category !== "" ? formData.set("category", values.category) : "";
      values.articleImg !== "" ? formData.set("articleImg", file) : "";

      console.log("formdata are", ...formData);

      if (checkContentWordLim(values.blogContent) === "enough") {
        dispatch({
          type: "BLOGCONTENT_WARN",
          payload: "No",
        });
        console.log(blogId);
        console.log(state.storedBlogId);
        console.log(state.singleBlogDetail._id);
        const res = await mutateAsync({
          blogData: formData,
          blogId: state.singleBlogDetail._id,
        });
        console.log(res);
        if (isSuccess && data) {
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
          window.location.reload();
        }
        // console.log(state.storedBlogId);
      }
      if (checkContentWordLim(values.blogContent) === "notEnough") {
        dispatch({
          type: "BLOGCONTENT_WARN",
          payload: "Yes",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state.openEditModal);

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

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Category tag</FormLabel>
                  <FormControl>
                    <Select
                      // defaultValue={state.singleBlogDetail.category}
                      onValueChange={field.onChange}
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

export default QuillEditBlogForm;
