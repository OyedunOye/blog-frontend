import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Single blog page",
  description: "Read the blog of your choice on this page",
};

export default function SingleBlogPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
