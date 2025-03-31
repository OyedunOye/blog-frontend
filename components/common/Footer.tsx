import React from 'react'
import { categoriesList, ourConditionsList, socialMedia, useCasesList } from '@/constants/index'
import Logo from '@/public/Logo.png'
import Image from 'next/image'


const Footer = () => {
  return (
    <section className='flex w-full justify-between my-5'>
      <div className='flex flex-col'>
        <Image src={Logo} alt='logo' className="w-30 cursor-pointer mt-2 mb-4"/>
        <ul className='flex flex-col'>
            {socialMedia.map((item) => (
                <li key={item.alt} className='flex h-10 gap-2 content-center py-1'><item.img className='flex h-full'/> {item.name} </li>
            ))}
        </ul>
      </div>

      <div className='flex flex-col'>
        <h3 className='font-semibold text-xl capitalize'>Use cases</h3>
          <ul className="">
            {useCasesList.map((usecase)=>(
              <li key={usecase}>{usecase}</li>
            ))}
          </ul>
      </div>

      <div className='flex flex-col'>
        <h3 className='font-semibold text-xl capitalize'>categories</h3>
          <ul className="">
            {categoriesList.map((category)=>(
              <li key={category}>{category}</li>
            ))}
          </ul>
      </div>

      <div className='flex flex-col'>
        <h3 className='font-semibold text-xl capitalize'>Documentation</h3>
          <ul className="">
            {useCasesList.map((item)=>(
              <li key={item}>{item}</li>
            ))}
          </ul>
      </div>

      <div className='flex flex-col'>
        <h3 className='font-semibold text-xl capitalize'>Our Conditions</h3>
          <ul className="">
            {ourConditionsList.map((condition)=>(
              <li key={condition}>{condition}</li>
            ))}
          </ul>
      </div>

    </section>
  )
}

export default Footer