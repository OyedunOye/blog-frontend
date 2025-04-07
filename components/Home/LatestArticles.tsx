import {
  articleItems,
  articleMenu,
  horizontalArticleCards,
  mainLatestArticle,
} from "@/constants";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Bookmark,
  CircleEllipsis,
  Heart,
  MessageSquareMore,
} from "lucide-react";
import { lightBulbsImg } from "../assets/index";
import MaxWidth from "./MaxWidthWrapper";

export const num = {
  loveCount: 20,
  commentCount: 57,
  readTime: 5,
};

export const AriticleCards = () => {
  return (
    <div className="flex flex-col w-[1/2] gap-4 border rounded-md divide-y">
      {articleItems.map((item) => (
        <div key={item.title} className="flex w-full h-40 p-2 justify-between">
          <div className="flex flex-col h-auto my-auto content-center gap-3 p-2">
            <div className="flex gap-2 text-sm text-gray-500 ">
              <Image
                src={item.authorPhoto}
                alt={item.author}
                width={24}
                height={24}
              />
              <p className="">{item.author}</p>
              <p className="">{item.date}</p>
              <p className="">🏷️ {item.category}</p>
            </div>
            <p className="font-semibold">{item.title}</p>
            <div className="flex justify-between text-gray-500">
              <div className=" flex gap-2">
                <Button variant="outline" className="rounded-full bg-gray-200">
                  <Heart /> {num.loveCount}
                </Button>
                <Button variant="outline" className="rounded-full bg-gray-200">
                  <MessageSquareMore /> {num.commentCount}
                </Button>
              </div>

              <div className="flex content-center gap-2">
                <p>{num.readTime} min read</p>
                <Bookmark className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                <CircleEllipsis className="bg-gray-200 rounded-full h-8 w-8 p-1" />
              </div>
            </div>
          </div>

          <div className="w-[1/4] h-full content-center">
            <Image
              src={item.articlePhoto}
              alt={item.title}
              className="mb-3"
              width={144}
              height={144}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
const LatestArticles = () => {
  return (
    <section className="">
      <MaxWidth className="my-6">
        <div className="flex flex-col w-full ">
          <nav className="flex h-10 content-center gap-3 my-3">
            <h3 className="font-bold text-xl mb-6 pt-0.5">
              🎈 Latest Articles
            </h3>
            <ul className="flex">
              {articleMenu.map((menu) => (
                <li key={menu} className="flex">
                  <Button variant="ghost">{menu}</Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className=" flex w-full gap-2 justify-between">
            <div className="w-[1/2] border rounded-md">
              <Image
                src={lightBulbsImg}
                alt="light image"
                className="rounded-t-md"
              />
              {mainLatestArticle.map((story) => (
                <div key={story.title} className="flex flex-col m-4 gap-2">
                  <div className="flex">
                    <div className="flex gap-2 text-sm text-gray-500">
                      <Image
                        src={story.authorPhoto}
                        alt={story.author}
                        width={24}
                        height={24}
                      />
                      <p className="">{story.author}</p>
                      <p className="">{story.date}</p>
                      <p className="">🏷️ {story.category}</p>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg">
                    UI Interactions of the week #261
                  </h3>
                  <p className="text-sm text-gray-500">{story.title}</p>
                  <div className="flex justify-between text-gray-500 mt-2">
                    <div className=" flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-full bg-gray-200"
                      >
                        <Heart /> {num.loveCount}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full bg-gray-200"
                      >
                        <MessageSquareMore /> {num.commentCount}
                      </Button>
                    </div>

                    <div className="flex content-center gap-2">
                      <p>{num.readTime} min read</p>
                      <Bookmark className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                      <CircleEllipsis className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="">
              <AriticleCards />
            </div>
          </div>
        </div>
        <div className="flex gap-4 my-4">
          {horizontalArticleCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col w-72 gap-2 border rounded-md "
            >
              <div className="flex ">
                <Image
                  src={card.articleImg}
                  alt={card.title}
                  width={288}
                  height={250}
                  className="rounded-t-md"
                />
              </div>
              <div className="flex gap-2 text-sm text-gray-500 p-2">
                <Image
                  src={card.authorImg}
                  alt={card.author}
                  width={24}
                  height={24}
                />
                <p className="">{card.author}</p>
                <p className="">{card.date}</p>
              </div>
              <h3 className="font-semibold text-lg p-2">{card.title}</h3>
            </div>
          ))}
        </div>
      </MaxWidth>
    </section>
  );
};

export default LatestArticles;
