"use client";

import { useSearchParams } from "next/navigation";
import Unsubscribe from "@/components/Unsubscribe/Unsubscribe";

const UnsubscribeScreen = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  // See mire comment in the `Unsubscribe` component
  return (
    <section className="">
      <Unsubscribe email={email} />
    </section>
  );
};

export default UnsubscribeScreen;
