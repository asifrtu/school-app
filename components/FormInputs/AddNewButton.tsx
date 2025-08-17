import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
type AddNewButtonProps = {
    href: string;
    tooltipText: string;
};

export default function AddNewButton({ href, tooltipText }: AddNewButtonProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={href}>
                        <Button variant="outline" size="icon">
                            <Plus />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}