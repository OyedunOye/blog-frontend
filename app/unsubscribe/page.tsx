"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Unsubscribe from "@/components/Unsubscribe/Unsubscribe";

// Force dynamic rendering at runtime (no static generation)
export const dynamic = "force-dynamic";

const UnsubscribeScreen = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  // See more comment in the `Unsubscribe` component
  return (
      <Suspense fallback={<div>Loading...</div>}>
    <section className="">
        <Unsubscribe email={email} />
    </section>
      </Suspense>
  );
};

export default UnsubscribeScreen;
