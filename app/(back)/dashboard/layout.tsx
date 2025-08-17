"use client"
import AppSidebar from '@/components/dashboard/sidebar/app-sidebar'
import SidebarHeader from '@/components/dashboard/sidebar/sidebar-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'

export default function DashboardLayout({children}:{children:ReactNode}) {
  return (
    <div className="dark:bg-black dark:text-white flex h-screen w-full flex-col fixed-inset-0">
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Sidebar Header */}
        <SidebarHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
    </div>
  )
}
