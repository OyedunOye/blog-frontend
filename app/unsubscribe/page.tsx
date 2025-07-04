"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Unsubscribe from "@/components/Unsubscribe/Unsubscribe";

const UnsubscribeScreen = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  // See mire comment in the `Unsubscribe` component
  return (
    <section className="">
      <Suspense>
        <Unsubscribe email={email} />
      </Suspense>
    </section>
  );
};

export default UnsubscribeScreen;
