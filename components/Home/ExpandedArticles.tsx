import { authors, popularPostsList, tags, trendingTopics } from "@/constants";
import { Button } from "../ui/button";
import MaxWidth from "../common/MaxWidthWrapper";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArticleCards } from "./ArticleCards";

const ExpandedArticles = () => {
  return (
    <section className="my-4">
      <MaxWidth className="">
        <h3 className="font-bold text-xl pb-3">🎉 Latest Articles</h3>
        <div className="flex gap-4">
          <div className="">
            <ArticleCards />
            <div className="flex justify-between my-3">
              <Pagination className="justify-start mx-0 w-1/2">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <Button variant="default">See more</Button>
            </div>
          </div>

          <div className="flex flex-col w-1/2 gap-3">
            <div className="flex flex-col border p-2 rounded-md bg-[#F3F4F6]">
              <div className="flex justify-between">
                <h4 className="font-bold text-md">🏷️ Discover more tags</h4>
                <Button variant="ghost">View all</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Button key={tag} variant="outline">
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* <div className="bg-[#F3F4F6] flex-col border p-2 rounded-md ">
              <div className="flex justify-between">
                <h4 className="font-bold text-md">✨ Trending topic</h4>
                <Button variant="ghost">View all</Button>
              </div>
              <div className="flex flex-col gap-2">
                {trendingTopics.map((topic) => (
                  <div key={topic.category} className="my-2">
                    <div className="flex gap-4 content-center">
                      <Image
                        src={topic.img}
                        alt={topic.category}
                        width={50}
                        height={40}
                      />
                      <div className="flex flex-col gap-2 p-1">
                        <h5 className="font-bold text-md content-center">
                          {topic.category}
                        </h5>
                        <p className="text-sm text-gray-500 content-center">
                          {topic.counter} Articles
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            <div className="bg-[#F3F4F6] flex-col border p-2 rounded-md">
              <div className="flex justify-between">
                <h4 className="font-bold text-md">✍️ Discover Authors</h4>
                <Button variant="ghost">View all</Button>
              </div>
              <div className="flex flex-col gap-2">
                {authors.map((author) => (
                  <div key={author.name} className="my-2">
                    <div className="flex gap-4 content-center">
                      <Image
                        src={author.img}
                        alt={author.name}
                        width={50}
                        height={40}
                      />
                      <div className="flex flex-col gap-2">
                        <h5 className="font-bold text-md content-center">
                          {author.name}
                        </h5>
                        <p className="text-sm text-gray-500 content-center">
                          {author.field}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="bg-[#F3F4F6] flex-col border p-2 rounded-md">
              <div className="flex justify-between">
                <h4 className="font-bold text-md">🎯 Popular Posts</h4>
                <Button variant="ghost">View all</Button>
              </div>
              <div className="flex flex-col gap-2 my-2">
                {popularPostsList.map((post) => (
                  <div key={post.topic} className="my-2">
                    <div className="flex gap-4 content-center justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          <Image src={post.authImg} alt={post.topic} />
                          <p className="text-gray-500 text-sm">{post.author}</p>
                          <p className="text-gray-500 text-sm">{post.date}</p>
                        </div>
                        <h3 className="font-bold text-md content-center">
                          {post.topic}
                        </h3>
                      </div>
                      <div className="flex">
                        <Image src={post.storyImg} alt={post.topic} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </MaxWidth>
    </section>
  );
};

export default ExpandedArticles;
