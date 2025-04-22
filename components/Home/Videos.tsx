"use client";
import MaxWidth from "../common/MaxWidthWrapper";

// I think the video is corrupted, so I will use a placeholder video
const Videos = () => {
  return (
    <MaxWidth className="w-full">
      <h3 className="font-bold text-xl capitalize my-2">🎬 The videos</h3>
      <p className="text-md text-slate-600 w-1/3 mb-2">
        Read and share new perspectives on just about any topic. Everyone’s
        welcome.
      </p>
      <div className="w-full h-100 flex justify-center my-10">
        <video
          width="500"
          height="340"
          autoPlay
          muted
          controls
          playsInline
          preload="auto"
          className="object-cover w-full rounded-lg"
        >
          <source src="/lifeshow.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </MaxWidth>
  );
};

export default Videos;
