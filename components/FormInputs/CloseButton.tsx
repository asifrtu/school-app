import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function CloseButton({ href, parent = "inventory" }: { href: string, parent?: string }) {
    return (
        <Link href={href}>
            <Button variant="outline" size="icon" className="absolute top-4 right-4">        
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>        
            </Button>        
        </Link>
    )
}