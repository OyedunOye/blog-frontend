import Image from "next/image";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import { Button } from "../ui/button";
import MaxWidth from "../common/MaxWidthWrapper";
import illustration from "../assets/author-illustration.png";

const BecomeAuthor = () => {
  return (
    <MaxWidth className="mb-24">
      <div className="w-full py-10 flex items-center justify-between">
        <div className={cn("flex flex-col gap-y-4", poppins.className)}>
          <p className="text-gray-500 uppercase font-semibold text-sm">
            super change your planning powers
          </p>
          <h3 className="max-w-[470px] text-4xl font-semibold text-gray-800">
            Become an author and share your great stories
          </h3>
          <p className="max-w-[473px] text-gray-600 mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            sequi ut perferendis. Perspiciatis ab quidem vel. Omnis sequi
            inventore doloribus dolorum illum corrupti nihil natus consequuntur
            eveniet! Doloremque, suscipit odit!
          </p>
          <Button size="lg" className="rounded-full mt-2 w-[180px] h-11">
            Become an author
          </Button>
        </div>
        <div className="h-full max-w-[763px]">
          <Image
            alt="Become an author illustration"
            src={illustration}
            width={763}
            height={555}
            className="object-cover scale-90"
          />
        </div>
      </div>
    </MaxWidth>
  );
};

export default BecomeAuthor;
