"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full flex flex-col gap-6 px-4 my-[15%] content-center text-center">
        <h2 className="text-2xl font-bold">Not Found</h2>
        <p>Could not find the requested blog, it might have been deleted.</p>

        <Link className="text-lg font-bold" href="/">
          <Button variant="default">Return Home</Button>
        </Link>

        <button
          className="cursor-pointer"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
