import { loginSocialMedia } from '@/constants'
import React from 'react'
import { Button } from '../ui/button'

const LoginButtons = () => {
  return (
    <div className="flex w-1/2 flex-col mx-auto py-5 gap-5">
        {loginSocialMedia.map((item)=> (
            <div key={item.name}  className="w-full ">
                <Button variant='outline' className="p-2 gap-5 w-full">
                    <item.img /> Continue with {item.name}
                </Button>
            </div>

        ))}
    </div>
  )
}

export default LoginButtons