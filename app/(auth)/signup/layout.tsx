import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shade's blog register page",
  description:
    "New users are welcome to register here so that they have full access to all site functionalities.",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
