import NavBar from "@/components/common/NavBar"
import Footer from "@/components/common/Footer"
import Hero from "@/components/Hero"
import Trends from "@/components/Trends"
import Categories from "@/components/Categories"
import LatestArticles from "@/components/LatestArticles"

const HomePageScreen = () => {
  return (
    <section className="mx-[10%] min-h-screen  flex flex-col">
      <NavBar />
      <Hero />
      <Trends />
      <Categories />
      <LatestArticles />
      <Footer />
    </section>
  )
}

export default HomePageScreen