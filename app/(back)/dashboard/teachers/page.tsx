import React from 'react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default function page() {
  return (
    <div>
      <h2>Teachers</h2>
      <Button>
        <Link href="/dashboard/teachers/new">New Teachers</Link>
      </Button>
    </div>
  )
}
