"use client";

import { useSearchParams } from "next/navigation";
// import { lazy, Suspense } from "react";
import { Suspense } from "react";
// import Unsubscribe from "@/components/Unsubscribe/Unsubscribe";

// Force dynamic rendering at runtime (no static generation)
// export const dynamic = "force-dynamic";
import dynamic from "next/dynamic";
// const Unsubscribe = lazy(() => import("@/components/Unsubscribe/Unsubscribe"));
const Unsubscribe = dynamic(
  () => import("@/components/Unsubscribe/Unsubscribe"),
  {
    ssr: false,
    loading: () => <p>Loading unsubscribe page...</p>,
  }
);

const UnsubscribeScreen = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  // See more comment in the `Unsubscribe` component
  return (
    <Suspense>
      <section className="">
{/*         <Unsubscribe email={email} /> */}
        "Hello world"
      </section>
    </Suspense>
  );
};

export default UnsubscribeScreen;
