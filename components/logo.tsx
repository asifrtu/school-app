import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <div>
        <Link href={"/"} className="flex items-center">
            <div className="bg-black rounded-full mr-2">
            <span className="text-white font-bold text-xl">
                <GraduationCap className='w-6 h-6 p-1' />
            </span>
            </div>
            <span className="font-bold text-xl">School <span className="text-black-600">App</span></span>
        </Link>
    </div>
  )
}
