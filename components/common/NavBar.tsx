import { Search, Sun } from "lucide-react"
import { Button } from "../ui/button"
import { NavBarMenuList } from "@/constants"
import Logo from '@/public/Logo.png'
import Image from "next/image"
import MaxWidth from "../MaxWidthWrapper"


const NavBar = () => {
  return (
    <nav className=" py-4 shadow-indigo-600/10 shadow-lg sticky top-0 left-0 bg-white z-99 flex w-full flex-col">

        <MaxWidth className='flex flex-col w-full'>
            <div className="flex justify-between">
            <ul className="flex h-8 content-center">
                <Image src={Logo} alt='logo' className="w-30 cursor-pointer" />
                {NavBarMenuList.map((menu)=>(
                    <Button key={menu} variant='ghost' className="hover:bg-slate-400">{menu}</Button>
                ))}
            </ul>

            <div className="flex w-[22%] justify-between content-center">
                <Sun className="content-center flex h-full cursor-pointer"/>
                <Search className="content-center flex h-full cursor-pointer" />
                <Button variant='default'className="">Get Started</Button>
            </div>
            </div>
        </MaxWidth>

    </nav>
  )
}

export default NavBar