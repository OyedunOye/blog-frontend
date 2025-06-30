import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full flex flex-col gap-6 my-[20%] content-center text-center">
        <h2 className="text-2xl font-bold">Not Found</h2>
        <p>Could not find the requested resource</p>
        <Link className="text-lg font-bold" href="/">
          <Button variant="default">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
