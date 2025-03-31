import Image from 'next/image'
import { trendingStories} from '../constants/index'

const Trends = () => {
  return (
    <div className='my-8'>
        <h3 className="font-bold text-xl my-6">📈 Trending on Shade's blog</h3>
        <div className='flex w-full'>
            {/* <Image src={author1}></Image> */}
            <div className='flex flex-wrap gap-5'>
              {trendingStories.map((story, index)=>(
                <div key={index} className='flex flex-col p-1 rounded-sm h-auto w-[300px] hover:bg-slate-500'>
                  <div className='flex gap-2 p-1 content-center'>
                    {/* <div className=' flex w-[24px] h-[25px]'><div/> */}
                    <div className="flex w-[25px] h-[24px]">

                      <Image  src={story.photo} alt={story.title} width={24} height={24} />
                    </div>

                    <h6 className='font-semibold text-md mb-2'>{story.title}</h6>
                  </div>
                  <div className='flex text-sm gap-2'>
                    <p className="">{story.author}</p>
                    <p className='text-slate-600'>{story.date}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Trends
{/* <div className=' '> */}