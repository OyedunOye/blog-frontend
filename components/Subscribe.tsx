import { Button } from './ui/button'
import { Input } from './ui/input'

const Subscribe = () => {
  return (
    <div className='flex justify-center content-center w-full h-50'>
        <div className="flex flex-col justify-center mx-10 gap-2">
            <h3 className="font-bold text-xl text-center">📬 Subscribe to our newsletter</h3>
            <p className="text-md text-slate-600 text-center">Read and share new perspectives on just about any topic. Everyone's welcome.👋</p>
            <div className="flex justify-center  content-center mx-auto w-[80%] gap-2">
                <Input type="email" placeholder="Email" />
                <Button variant='default'>Sign up</Button>
            </div>
            <p className="text-slate-600 text-sm text-center">We care about the protection of your data. Read our Privacy Policy.</p>
        </div>
    </div>
  )
}

export default Subscribe