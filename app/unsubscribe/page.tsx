"use client";

import { useSearchParams } from "next/navigation";
import { lazy, Suspense } from "react";
// import Unsubscribe from "@/components/Unsubscribe/Unsubscribe";

// Force dynamic rendering at runtime (no static generation)
export const dynamic = "force-dynamic";
const Unsubscribe = lazy(() => import("@/components/Unsubscribe/Unsubscribe"));

const UnsubscribeScreen = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  // See more comment in the `Unsubscribe` component
  return (
    <section className="">
      <Suspense fallback={<div>Loading...</div>}>
        <Unsubscribe email={email} />
      </Suspense>
    </section>
  );
};

export default UnsubscribeScreen;
