import Hero from "@/components/Home/Hero";
import Trends from "@/components/Home/Trends";
import Categories from "@/components/Home/Categories";
import LatestArticles from "@/components/Home/LatestArticles";
import Videos from "@/components/Home/Videos";
import Subscribe from "@/components/Home/Subscribe";
import ExpandedArticles from "@/components/Home/ExpandedArticles";

const HomePageScreen = () => {
  return (
    <main className="">
      <Hero />
      <Trends />
      <Categories />
      <LatestArticles />
      <Videos />
      <Subscribe />
      <ExpandedArticles />
    </main>
  );
};

export default HomePageScreen;
