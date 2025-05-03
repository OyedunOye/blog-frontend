import SingleBlogPage from "@/components/SingleBlogPage/SingleBlogPage";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <SingleBlogPage />
    </div>
  );
};

export default page;
