import Hero from "@/components/Hero"
import Trends from "@/components/Trends"
import Categories from "@/components/Categories"
import LatestArticles from "@/components/LatestArticles"
import Videos from "@/components/Videos"
import Subscribe from "@/components/Subscribe"
import ExpandedArticles from "@/components/ExpandedArticles"


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
  )
}

export default HomePageScreen