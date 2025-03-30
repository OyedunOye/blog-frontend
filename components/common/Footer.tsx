import React from 'react'
import { socialMedia } from '@/constants/index'
import Logo from '@/public/assets/Logo.png'
import Image from 'next/image'


const Footer = () => {
  return (
    <section>
        <Image src={Logo} alt='logo' />
        <ul>
            {socialMedia.map((item) => (
                <li key={item.alt}><item.img /> {item.name} </li>
            ))} 
        </ul>
    </section>
  )
}

export default Footer