import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shade's blog log in page",
  description: "Log in to enable you publish your blog on our site.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
