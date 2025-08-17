"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Logo from "@/components/logo"

export function TeamSwitcher() {
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Logo />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
