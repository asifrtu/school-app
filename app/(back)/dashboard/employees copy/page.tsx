import React from 'react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default function page() {
  return (
    <div>
      <h2>Employees</h2>
      <Button>
        <Link href="/dashboard/students/new">New Employees</Link>
      </Button>
    </div>
  )
}
