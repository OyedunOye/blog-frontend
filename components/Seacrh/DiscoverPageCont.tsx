"use client";
import { useGetAllBlogs } from "@/hooks/blog/useGetBlogs";
import React, { useContext, useEffect, useState } from "react";
import SearchHero from "./SearchHero";
import ArticleSection from "./ArticleSection";
import ExploreAuthors from "./ExploreAuthors";
import BecomeAuthor from "./BecomeAuthor";
import SearchNewsletter from "./NewsLetter";
import { AppContext } from "@/context/AppContext";

const DiscoverPageCont = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllBlogs();

  const [allBlogs, setAllBlogs] = useState<[]>([]);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (isSuccess && data?.blogs) {
      setAllBlogs(data.blogs);
    }
    if (isError) {
      setErrorStatus(isError);
    }
  }, [data, isSuccess, isError]);
  // console.log(allBlogs);

  useEffect(() => {
    if (isSuccess && data?.blogs.length < 0) {
      dispatch({
        payload: data.blogs,
        type: "DISPLAY_BLOG_ARRAY",
      });
    }
  }, [data, isSuccess]);

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
