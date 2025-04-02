import Video from 'next-video';
import aquaLife from '../videos/aquaLife.mp4'


const Videos = () => {
  return (
    <div className='w-full h-100'>
        {/* <video width="500" muted height="340" controls preload='none'>
            <source src='/aquaLife.mp4' type='video/mp4' />
            Your browser does not support the video tag.
        </video> */}
        <Video src={aquaLife} />
    </div>
  )
}

export default Videos