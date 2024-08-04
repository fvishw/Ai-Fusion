import React from 'react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
function landingPage() {
  return (
    <div className='bg-zinc-600 h-full'>
        <Link href="sign-in">
        <Button>Login</Button>
        </Link>
        <Link href="sign-up">
        <Button>signup</Button>
        </Link>
    </div>
  )
}

export default landingPage