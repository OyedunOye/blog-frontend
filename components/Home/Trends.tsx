import Image from "next/image";
import { trendingStories } from "../../constants/index";
import MaxWidth from "../common/MaxWidthWrapper";

const Trends = () => {
  return (
    <section className="">
      <MaxWidth className="mb-8 w-full">
        <h3 className="font-bold text-xl my-6 ">📈 Trending on Shade's blog</h3>
        <div className="flex w-full">
          <div className="flex flex-wrap gap-5">
            {trendingStories.map((story, index) => (
              <div
                key={index}
                className="flex  p-1 rounded-sm h-auto w-[300px] hover:bg-[#F3F4F6] cursor-pointer"
              >
                <div className="flex gap-2 p-1 content-center">
                  <div className="flex w-[25px] h-[24px]">
                    <Image
                      src={story.photo}
                      alt={story.title}
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h6 className="font-semibold text-md mb-2">{story.title}</h6>
                  <div className="flex text-sm gap-2">
                    <p className="">{story.author}</p>
                    <p className="text-slate-600">{story.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidth>
    </section>
  );
};

export default Trends;
