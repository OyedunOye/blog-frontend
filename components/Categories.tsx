import { categories } from "@/constants"
import Image from "next/image"
import MaxWidth from "./MaxWidthWrapper"

const Categories = () => {
  return (
    <MaxWidth className="bg-[#F3F4F6]">
        <h3 className="font-bold text-xl mb-6">📚 Categories</h3>
        <div className="flex w-full flex-wrap ">
            {categories.map((category)=>(

                <div key={category.category}className="flex w-60 h-auto m-3 gap-2 cursor-pointer">
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
    </MaxWidth>
  )
}

export default Categories