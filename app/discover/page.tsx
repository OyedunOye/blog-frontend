import ArticleSection from "@/components/Seacrh/ArticleSection";
import BecomeAuthor from "@/components/Seacrh/BecomeAuthor";
// import DiscoverCategories from "@/components/Seacrh/Discover";
import ExploreAuthors from "@/components/Seacrh/ExploreAuthors";
// import ExploreTags from "@/components/Seacrh/ExploreTags";
import SearchNewsletter from "@/components/Seacrh/NewsLetter";
import SearchHero from "@/components/Seacrh/SearchHero";

const DiscoverPageScreen = () => {
  return (
    <section className="">
      <SearchHero />
      <ArticleSection />
      <ExploreAuthors />
      <BecomeAuthor />
      {/* <DiscoverCategories /> */}
      {/* <ExploreTags /> */}
      <SearchNewsletter />
    </section>
  );
};

export default DiscoverPageScreen;
