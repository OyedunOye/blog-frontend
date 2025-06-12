import Image from "next/image";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import { Button } from "../ui/button";
import MaxWidth from "../common/MaxWidthWrapper";
import illustration from "../assets/newsletter-illustration.png";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";

const SearchNewsletter = () => {
  return (
    <MaxWidth className="mb-24 dark:dark:bg-slate-800">
      <h3 className="max-w-[470px] text-4xl max-md:text-xl max-lg:mt-4 font-semibold text-gray-800 dark:text-white">
        Join our newsletter 🎉
      </h3>
      <div className="w-full py-10 flex items-center justify-between max-md:flex-col-reverse">
        <div className={cn("flex flex-col gap-y-4", poppins.className)}>
          <p className="max-w-[473px] text-gray-600 dark:text-gray-300 mt-2">
            Read and share new perspectives on just about any topic.
            Everyone&apos;s welcome.👋
          </p>
          {/* <div className="flex flex-col gap-y-1 mt-2 items-start">
            <div className="flex items-center justify-center gap-x-3">
              <div className="flex items-center justify-center px-3 py-1 bg-[#065F46]/10 rounded-full">
                <p className="text-[#065F46] text-xs">01</p>
              </div>
              <p className="text-[#374151] font-semibold">Get more discount</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 mt-2 items-start">
            <div className="flex items-center justify-center gap-x-3">
              <div className="flex items-center justify-center px-3 py-1 bg-[#1E40AF]/10 rounded-full">
                <p className="text-[#1E40AF] text-xs">02</p>
              </div>
              <p className="text-[#374151] font-semibold">
                Get premium magazines
              </p>
            </div>
          </div> */}
          <form className="flex flex-col gap-y-3 w-[] relative mt-4">
            <Input
              className="h-[52px] py-2 rounded-full pl-4"
              placeholder="Enter your email..."
            />
            <Button className="h-[43px] w-[43px] bg-indigo-600 rounded-full flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2">
              <ArrowRight className="h-4 w-4 text-white" />
            </Button>
          </form>
        </div>
        <div className="h-full max-w-[763px]">
          <Image
            alt="Join our newsletter illustration"
            src={illustration}
            width={747}
            height={536}
            className="object-cover scale-90"
          />
        </div>
      </div>
    </MaxWidth>
  );
};

export default SearchNewsletter;
