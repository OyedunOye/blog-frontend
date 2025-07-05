import { Suspense } from "react";
import UnsubscribePageClient from "@/components/Unsubscribe/UnsubscribePageClient";

// Force dynamic rendering at runtime (no static generation)
export const dynamic = "force-dynamic";
// const Unsubscribe = lazy(() => import("@/components/Unsubscribe/Unsubscribe"));

const UnsubscribeScreen = () => {
  return (
    <Suspense fallback={<div>Loading unsubscribe page...</div>}>
      <UnsubscribePageClient />
    </Suspense>
  );
};

export default UnsubscribeScreen;
