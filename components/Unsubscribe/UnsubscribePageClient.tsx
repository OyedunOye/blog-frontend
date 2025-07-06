"use client";
import { useSearchParams } from "next/navigation";
import Unsubscribe from "./Unsubscribe";

const UnsubscribePageClient = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  return <Unsubscribe email={email} />;
};

export default UnsubscribePageClient;
