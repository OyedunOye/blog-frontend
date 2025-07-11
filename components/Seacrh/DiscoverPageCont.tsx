"use client";
import { useGetAllBlogs } from "@/hooks/blog/useGetBlogs";
import React, { useEffect, useState } from "react";
import SearchHero from "./SearchHero";
import ArticleSection from "./ArticleSection";
import ExploreAuthors from "./ExploreAuthors";
import BecomeAuthor from "./BecomeAuthor";
import SearchNewsletter from "./NewsLetter";

const DiscoverPageCont = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllBlogs();

  const [allBlogs, setAllBlogs] = useState<[]>([]);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess && data?.blogs) {
      setAllBlogs(data.blogs);
    }
    if (isError) {
      setErrorStatus(isError);
    }
  }, [data, isSuccess, isError]);

  return (
    <div>
      <SearchHero allBlogs={allBlogs} />
      <ArticleSection
        allBlogs={allBlogs}
        errorStatus={errorStatus}
        loadingStatus={isLoading}
      />
      <ExploreAuthors />
      <BecomeAuthor />

      <SearchNewsletter />
    </div>
  );
};

export default DiscoverPageCont;
