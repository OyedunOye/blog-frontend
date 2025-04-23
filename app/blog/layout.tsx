import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";

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
