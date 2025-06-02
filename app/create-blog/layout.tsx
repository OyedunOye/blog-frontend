import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog's creation page",
  description:
    "Registered user can write and submit their blog for publishing on this site by filling out this form.",
};

export default function CreateBlogPageLayout({
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
