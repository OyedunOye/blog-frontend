import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover blogs, authors and all about the app.",
  description: "Search for blogs and discover blog authors",
};

export default function DiscoverPageLayout({
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
