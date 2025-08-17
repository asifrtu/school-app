import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
export default function BulkTeacherForm() {
  return (
    <div>
      <Card>
            <CardHeader>
              <CardTitle>Bulk Teachers Form</CardTitle>
              <CardDescription>
                Upload a CSV file to add multiple Teacherss at once.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
    </div>
  )
}
