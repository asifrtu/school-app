"use client"

import React, { useState } from "react";
import { User, Users } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import SingleStaffForm from "./single-staff-form";
import BulkStaffForm from "./bulk-staff-form";
export default function AdmissionTabs() {
  const [activeTab, setActiveTab] = useState("single");

  return (
    <div className="flex w-full flex-col mt-2 gap-6 dark:bg-black dark:text-white pr-10 pl-10">
      <Tabs
        defaultValue="single"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-50 dark:bg-black">
          <TabsTrigger
            value="single"
            className="p-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-900 dark:text-white"
          >
            <User className="mr-2 h-4 w-4" />
            <span className="font-medium">Single Form</span>
          </TabsTrigger>
          <TabsTrigger
            value="bulk"
            className="p-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-900 dark:text-white"
          >
            <Users className="mr-2 h-4 w-4" />
            <span className="font-medium">Bulk Form</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <SingleStaffForm />
        </TabsContent>
        <TabsContent value="bulk">
          <BulkStaffForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
