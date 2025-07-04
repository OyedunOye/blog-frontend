"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Unsubscribe from "@/components/Unsubscribe/Unsubscribe";

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
