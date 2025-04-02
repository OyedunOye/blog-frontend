import { tags } from "@/constants"
import { AriticleCards } from "./LatestArticles"
import { Button } from "./ui/button"

// import { }
const ExpandedArticles = () => {
  return (
    <div className="">
        <div className="flex gap-4">
            <AriticleCards />
            <div className="flex- flex-col w-1/2">

                <div className="flex flex-col border p-2 rounded-md bg-[#F3F4F6]">
                    <div className="flex justify-between">
                        <h4 className="font-bold text-md">🏷️ Discover more tags</h4>
                        <Button variant='ghost' >View all</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Button key={tag} variant='outline' >{tag}</Button>
                        ))}
                    </div>
                </div>

                <div className="bg-[#F3F4F6]">
                    
                </div>

            </div>
        </div>
    </div>
  )
}

export default ExpandedArticles