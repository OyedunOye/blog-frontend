import SingleBlogPage from "@/components/SingleBlogPage/SingleBlogPage";

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
