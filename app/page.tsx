import Hero from "@/components/Home/Hero";
import Trends from "@/components/Home/Trends";
import Categories from "@/components/Home/Categories";
import LatestArticles from "@/components/Home/LatestArticles";
import Videos from "@/components/Home/Videos";
import Subscribe from "@/components/Home/Subscribe";
import ExpandedArticles from "@/components/Home/ExpandedArticles";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const HomePageScreen = () => {
  return (
    <main className="flex flex-col">
      <NavBar />
      <Hero />
      {/* <Trends /> */}
      <LatestArticles />
      <Categories />
      <Videos />
      <Subscribe />
      <ExpandedArticles />
      <Footer />
    </main>
  );
};

export default HomePageScreen;
