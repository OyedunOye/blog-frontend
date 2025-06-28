import Image from "next/image";
import React from "react";

const WorkInProgress = () => {
  return (
    <div className="flex flex-col gap-y-6 w-full h-full  p-8 max-md:p-4 rounded-sm">
      <h5 className="text-lg text-red-600 font-semibold">
        Delete your account
      </h5>
      <div className="flex mt-6 gap-4 max-md:flex-col">
        <div className="">
          <Image
            src={"/workInProgress.png"}
            alt="work in progress illustration"
            width={200}
            height={150}
          />
        </div>
        <p className="h-full py-auto content-center">
          We are working hard to complete this feature as soon as possible,
          please stay tuned!
        </p>
      </div>
    </div>
  );
};

export default WorkInProgress;
