"use client";
import MaxWidth from "./MaxWidthWrapper";

// I think the video is corrupted, so I will use a placeholder video
const Videos = () => {
  return (
    <MaxWidth>
      <div className="w-full h-100">
        <video
          width="500"
          height="340"
          autoPlay
          muted
          controls
          playsInline
          preload="auto"
          className="object-cover"
        >
          <source src="/sample_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </MaxWidth>
  );
};

export default Videos;
