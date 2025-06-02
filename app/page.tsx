import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import LatestArticles from "@/components/Home/LatestArticles";
import Videos from "@/components/Home/Videos";
import Subscribe from "@/components/Home/Subscribe";
import TheAuthors from "@/components/Home/TheAuthors";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const HomePageScreen = () => {
  return (
    <main className="flex flex-col">
      <NavBar />
      <Hero />
      <LatestArticles />
      <Categories />
      <Videos />
      <Subscribe />
      <TheAuthors />
      <Footer />
    </main>
  );
};

export default HomePageScreen;
