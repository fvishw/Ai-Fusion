import React from 'react'

function authLayout({
    children
}:
{children: React.ReactNode}) {
  return (
    <div className='flex justify-center items-center h-full'>
        {children}
    </div>
  )
}

export default authLayout