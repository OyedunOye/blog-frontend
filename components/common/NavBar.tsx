import { Search, Sun } from "lucide-react"
import { Button } from "../ui/button"
import { NavBarMenuList } from "@/constants"
import Logo from '@/public/Logo.png'
import Image from "next/image"

const NavBar = () => {
  return (
    <div className="flex mt-6">
        <nav className="flex justify-between w-full">
            <ul className="flex h-8 content-center">
                <Image src={Logo} alt='logo' className="w-30 cursor-pointer" />
                {NavBarMenuList.map((menu)=>(
                    <Button key={menu} variant='ghost' className="hover:bg-slate-400">{menu}</Button>
                ))}
            </ul>

            <div className="flex w-[22%] justify-between content-center">
                <Sun className="content-center flex h-full cursor-pointer"/>
                <Search className="content-center flex h-full cursor-pointer" />
                <Button variant='default'className="rounded-full bg-indigo-600">Get Started</Button>
            </div>
        </nav>
    </div>
  )
}

export default NavBar