import type { Metadata } from "next";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "Author's detailed profile page",
};

export default function ProfilePageLayout({
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
