import { categories } from "@/constants"
import Image from "next/image"

const Categories = () => {
  return (
    <div>
        <h3 className="font-bold text-xl mb-6">Categories</h3>
    <div className="flex w-full flex-wrap  gap-4">
        {categories.map((category)=>(

            <div key={category.category}className="flex w-90 h-auto gap-2 border cursor-pointer">
                <div className="w-[80px] h-[80px]">

                <Image  src={category.photo} alt={category.category} width={80} height={80}/>
                </div>
                <div className="flex flex-col content-center py-3">
                    <h6 className="flex font-semibold text-md">{category.category}</h6>
                    <p className="flex   text-slate-600 text-sm">{category.counter}</p>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Categories