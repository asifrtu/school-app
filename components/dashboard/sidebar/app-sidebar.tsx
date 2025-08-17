"use client";
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowRight,
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  LogOut,
  Map,
  MoreHorizontal,
  Package,
  PieChart,
  Home,
  Users,
  Book,
  MessageCircle,
  DollarSign,
  Bus,
  Box,
  BarChart2,
  Settings,
  GraduationCap,
  UserCog,
  MessageSquare,
  ClapperboardIcon,
  BookA,
} from "lucide-react";
import { TeamSwitcher } from './team-switcher';

const data = {
  
  
  
};

export default function AppSidebar() {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };
  
  const SidebarNavLinks = [
    {
      title: "Dashboard",
      icon: Home, // Lucide React icon for Dashboard
      url: "/dashboard",
      isActive: false,
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
      ],
    },
    {
      title: "Classes",
      icon: ClapperboardIcon, // Lucide React icon for Student Management
      url: "/dashboard/classes",
      items: [
        {
          title: "All Classes",
          url: "/dashboard/classes",
        },
        {
          title: "Add Class",
          url: "/dashboard/classes/new",
        }
      ],
    },
    {
      title: "Subjects",
      icon: BookA, // Lucide React icon for Student Management
      url: "/subjects",
      items: [
        {
          title: "Classes wise Subjects",
          url: "/subjects",
        },
        {
          title: "Assign Subjects",
          url: "/subjects/assign",
        },
      ],
    },
    {
      title: "Students",
      icon: Users, // Lucide React icon for Student Management
      url: "/students",
      items: [
        {
          title: "Student Directory",
          url: "/dashboard/students",
        },
        {
          title: "Fees & Payments",
          url: "/students/fees-payments",
        },
        {
          title: "Student Ids",
          url: "/dashboard/students/student-ids",
        },
        {
          title: "Attendance",
          url: "/students/attendance",
        },
        {
          title: "Performance",
          url: "/students/performance",
        },
        {
          title: "Permote Students",
          url: "/students/permote-students",
        },
      ],
    },
    {
      title: "Academics",
      icon: GraduationCap, // Lucide React icon for Academics
      url: "/academics",
      items: [
        {
          title: "Curriculum",
          url: "/academics/curriculum",
        },
        {
          title: "Timetable",
          url: "/academics/timetable",
        },
        {
          title: "Examinations",
          url: "/academics/examinations",
        },
        {
          title: "Assignments",
          url: "/academics/assignments",
        },
        {
          title: "Report Cards",
          url: "/academics/report-cards",
        },
      ],
    },
    {
      title: "Teachers",
      icon: UserCog, // Lucide React icon for teachers Management
      url: "/teachers",
      items: [
        {
          title: "All Teachers",
          url: "/dashboard/teachers",
        },
        {
          title: "Attendance",
          url: "/teachers/attendance",
        },
        {
          title: "Leave Management",
          url: "/teachers/leave-management",
        },
        {
          title: "Teachers Ids",
          url: "/teachers/performance",
        },
        {
          title: "Jobs & Recruitment",
          url: "/teachers/jobs-recruitment",
        },
        {
          title: "Job Applications",
          url: "/teachers/performance",
        },
        {
          title: "Performance",
          url: "/teachers/performance",
        },
        {
          title: "Manage Logins",
          url: "/teachers/performance",
        },
      ],
    },
    {
      title: "Employees",
      icon: ClapperboardIcon, // Lucide React icon for Student Management
      url: "/employees",
      items: [
        {
          title: "All Employees",
          url: "/dashboard/employees",
        },
        {
          title: "Add Employee",
          url: "/employees/new",
        }
      ],
    },
    {
      title: "Communication",
      icon: MessageSquare, // Lucide React icon for Communication
      url: "/communication",
      items: [
        {
          title: "Messages",
          url: "/communication/messages",
        },
        {
          title: "Announcements",
          url: "/communication/announcements",
        },
        {
          title: "Notice Board",
          url: "/communication/notice-board",
        },
        {
          title: "Emergency Alerts",
          url: "/communication/emergency-alerts",
        },
      ],
    },
    {
      title: "Finance",
      icon: DollarSign, // Lucide React icon for Finance
      url: "/finance",
      items: [
        {
          title: "Fee Management",
          url: "/finance/fee-management",
        },
        {
          title: "Payments",
          url: "/finance/payments",
        },
        {
          title: "Scholarships",
          url: "/finance/scholarships",
        },
        {
          title: "Reports",
          url: "/finance/reports",
        },
      ],
    },
    {
      title: "Transport",
      icon: Bus, // Lucide React icon for Transport
      url: "/transport",
      items: [
        {
          title: "Routes",
          url: "/transport/routes",
        },
        {
          title: "Tracking",
          url: "/transport/tracking",
        },
        {
          title: "Drivers",
          url: "/transport/drivers",
        },
        {
          title: "Maintenance",
          url: "/transport/maintenance",
        },
      ],
    },
    {
      title: "Resources",
      icon: BookOpen, // Lucide React icon for Resources
      url: "/resources",
      items: [
        {
          title: "Library",
          url: "/resources/library",
        },
        {
          title: "Inventory",
          url: "/resources/inventory",
        },
        {
          title: "Facilities",
          url: "/resources/facilities",
        },
        {
          title: "Assets",
          url: "/resources/assets",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      icon: BarChart2, // Lucide React icon for Reports & Analytics
      url: "/reports",
      items: [
        {
          title: "Academic Reports",
          url: "/reports/academic-reports",
        },
        {
          title: "Financial Reports",
          url: "/reports/financial-reports",
        },
        {
          title: "Custom Reports",
          url: "/reports/custom-reports",
        },
        {
          title: "Analytics Dashboard",
          url: "/reports/analytics-dashboard",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings, // Lucide React icon for Settings
      url: "/settings",
      items: [
        {
          title: "School Profile",
          url: "/settings/school-profile",
        },
        {
          title: "User Management",
          url: "/settings/user-management",
        },
        {
          title: "System Settings",
          url: "/settings/system-settings",
        },
        {
          title: "Backup & Security",
          url: "/settings/backup-security",
        },
      ],
    },
  ];
  return (
    <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
        <SidebarHeader className="flex py-3">
          <TeamSwitcher />
        </SidebarHeader>
              {SidebarNavLinks.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarRail />
      </Sidebar>
  )
}
