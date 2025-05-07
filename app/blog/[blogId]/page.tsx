import SingleBlogPage from "@/components/SingleBlogPage/SingleBlogPage";
// import { useParams } from "next/navigation";
// import React from "react";

// interface BlogPageProps {
//   params: {
//     blogId: string;
//   };
// }

// const page = async ({ params }: { params: Promise<{ id: string }> }) => {

//     const { blogId } = useParams();

//   const { id } = await params;
//   return (
//     <div>
//       <SingleBlogPage />
//     </div>
//   );
// };

// export default page;

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  // console.log(params);
  return (
    <div>
      {/* My Post: {blogId} */}
      <div>{blogId ? <SingleBlogPage blogId={blogId} /> : null}</div>
    </div>
  );
}
