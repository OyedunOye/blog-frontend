import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import HeroImg from '@/components/assets/heroImg.png'

const Hero = () => {
  return (
    <div className='flex flex-wrap w-full mt-10'>
        <div className='flex flex-1/5 flex-col h-[280px] content-center my-5 mr-4 gap-6'>
            <h2 className="font-bold text-3xl">👋 Read and share anything.</h2>
            <p>Discover the most outstanding articles in all topics of life. Write your stories and share them.</p>
            <Button variant='default' className=''>Getting Started</Button>
        </div>
        <div className="h-[280px] flex">
            <Image src={HeroImg} alt='hero image' className='content-center my-1' />
        </div>
    </div>
  )
}

export default Hero