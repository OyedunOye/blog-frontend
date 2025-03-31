import NavBar from "@/components/common/NavBar"
import Footer from "@/components/common/Footer"
import Hero from "@/components/Hero"
import Trends from "@/components/Trends"
import Categories from "@/components/Categories"

const HomePageScreen = () => {
  return (
    <div className="mx-[10%] min-h-screen  flex flex-col">
      <NavBar />
      <Hero />
      <Trends />
      <Categories />
      <Footer />
    </div>
  )
}

export default HomePageScreen