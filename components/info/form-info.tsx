import { User } from 'lucide-react'
import React from 'react'

type Props = {
    message: string
}
function FormInfo({message}: Props) {
  return (
    <div
          className={`flex items-start justify-between dark:bg-black dark:text-white gap-4 mb-3 `}>
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 shrink-0" aria-hidden="true" />
            <div> 
              <h3 className="text-base font-medium leading-snug">{message}</h3>
            </div>
          </div>
        </div>
  )
}

export default FormInfo