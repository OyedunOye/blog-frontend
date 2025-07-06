import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Unsubscribe from our newsletter",
};

export default function UnsubscribeLayout({
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
