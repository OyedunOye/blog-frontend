"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const QuillCompo = () => {
  const [quillFormValue, setValue] = useState("");
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

  // const word = {
  //   placeholder: "Compose your blog here",
  // };

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

  console.log(quillFormValue);
  return (
    <div className="h-[50vh] rounded-2xl mb-2">
      <h1 className="font-semibold text-sm">Create a Blog Post</h1>
      <ReactQuill
        modules={modules}
        formats={formats}
        placeholder={"Write your blog here."}
        theme="snow"
        value={quillFormValue}
        onChange={setValue}
        className="h-full"
        id="blogContent"
      />
    </div>
  );
};

export default QuillCompo;
