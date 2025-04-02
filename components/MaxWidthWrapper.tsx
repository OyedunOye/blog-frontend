import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface MaxWidthProps {
  children: ReactNode
  className?: String
}

const MaxWidth = ({children, className}: MaxWidthProps) => {
  return (
    <div className={cn('max-lg:max-w-[1366px] flex flex-col justify-center content-center px-16', className)}>
        {children}
    </div>
  )
}

export default MaxWidth