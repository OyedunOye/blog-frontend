import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shade's blog privacy policy",
  description: "Details your data being collected and how we use it.",
};

export default function PrivacyPolicyLayout({
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
