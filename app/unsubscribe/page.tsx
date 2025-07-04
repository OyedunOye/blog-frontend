"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Unsubscribe from "@/components/Unsubscribe/Unsubscribe";

function SearchEmail() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";
  return email;
}
const UnsubscribeScreen = () => {
  // See mire comment in the `Unsubscribe` component
  return (
    <section className="">
      <Suspense>
        <Unsubscribe email={SearchEmail()} />
      </Suspense>
    </section>
  );
};

export default UnsubscribeScreen;
