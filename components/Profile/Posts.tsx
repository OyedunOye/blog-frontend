"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const Posts = () => {
  const num = 7; // Get from logged in user blog

  const dummyData = [
    {
      id: "1",
      title: "The Art of Programming",
      descrription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem error molestiae suscipit? Non commodi, perspiciatis facere laudantium sunt accusantium qui et nesciunt numquam! Blanditiis doloribus minus laborum vel! Voluptas, incidunt? ...",
    },
    {
      id: "2",
      title: "Being Resolute",
      descrription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem error molestiae suscipit? Non commodi, perspiciatis facere laudantium sunt accusantium qui et nesciunt numquam! Blanditiis doloribus minus laborum vel! Voluptas, incidunt? ...",
    },
    {
      id: "3",
      title: "Console dot log - The saver of Men",
      descrription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem error molestiae suscipit? Non commodi, perspiciatis facere laudantium sunt accusantium qui et nesciunt numquam! Blanditiis doloribus minus laborum vel! Voluptas, incidunt? ...",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-y-6">
      <h5 className="text-sm text-gray-600">
        You have created{" "}
        <span className="font-semibold text-gray-800">{num} </span>
        Posts
      </h5>

      <div className="flex flex-col gap-y-8 w-full">
        {dummyData.map((data) => (
          <div
            key={data.id}
            className="bg-gray-200 w-full p-5 flex gap-x-10 rounded-tl-xl rounded-br-xl shadow-md hover:shadow-lg"
          >
            <div className="w-[20%]">
              <Image
                src={"/user-dummy.png"}
                alt="blog cover image"
                height={860}
                width={848}
                className="object-cover"
              />
            </div>
            <div className="w-[75%] flex flex-col gap-y-4">
              <h4 className="text-lg font-bold">{data.title}</h4>
              <p className="text-gray-600 text-sm">{data.descrription}</p>

              <div className="flex items-center justify-end gap-x-4 mt-5">
                <Button
                  variant="default"
                  className="bg-green-400 hover:bg-green-300 rounded-md w-30"
                  onClick={() => {}}
                >
                  Edit Blog
                </Button>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => {}}
                >
                  Delete Blog
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6 pr-4">
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
  );
};

export default Posts;
