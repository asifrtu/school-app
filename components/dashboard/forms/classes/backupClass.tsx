"use client"

import { useState } from "react"
import { Search, GraduationCap, ChevronLeft, Users, Plus, MoreVertical, Edit, Trash2, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ClassData {
  id: number
  name: string
  students: number
  sections: number
  subjects: number
}

interface SectionData {
  id: string
  name: string
  teacher: string
  students: number
}

interface SubjectData {
  id: string
  name: string
  teacher: string
  code: string
  fullMarks: string
  passMarks: string
}

const classesData: ClassData[] = [
  { id: 5, name: "Class 5", students: 120, sections: 3, subjects: 5 },
  { id: 6, name: "Class 6", students: 80, sections: 2, subjects: 6 },
  { id: 7, name: "Class 7", students: 160, sections: 4, subjects: 7 },
  { id: 8, name: "Class 8", students: 115, sections: 3, subjects: 8 },
  { id: 9, name: "Class 9", students: 75, sections: 2, subjects: 9 },
]

const sectionsData: Record<number, SectionData[]> = {
  5: [
    { id: "5A", name: "5A", teacher: "Ms. Sarah", students: 40 },
    { id: "5B", name: "5B", teacher: "Mr. John", students: 38 },
    { id: "5C", name: "5C", teacher: "Ms. Emily", students: 42 },
  ],
  6: [
    { id: "6A", name: "6A", teacher: "Mr. David", students: 42 },
    { id: "6B", name: "6B", teacher: "Ms. Lisa", students: 38 },
  ],
  7: [
    { id: "7A", name: "7A", teacher: "Mr. Michael", students: 40 },
    { id: "7B", name: "7B", teacher: "Ms. Anna", students: 39 },
    { id: "7C", name: "7C", teacher: "Mr. Robert", students: 41 },
    { id: "7D", name: "7D", teacher: "Ms. Jennifer", students: 40 },
  ],
  8: [
    { id: "8A", name: "8A", teacher: "Mr. James", students: 38 },
    { id: "8B", name: "8B", teacher: "Ms. Maria", students: 39 },
    { id: "8C", name: "8C", teacher: "Mr. Thomas", students: 38 },
  ],
  9: [
    { id: "9A", name: "9A", teacher: "Ms. Patricia", students: 37 },
    { id: "9B", name: "9B", teacher: "Mr. William", students: 38 },
  ],
}

const subjectsData: Record<number, SubjectData[]> = {
  5: [
    { id: "MATH5", name: "Mathematics", teacher: "Mr. Anderson", code: "MATH5", fullMarks: "100", passMarks: "30",},
    { id: "ENG5", name: "English", teacher: "Ms. Johnson", code: "ENG5", fullMarks: "100", passMarks: "30",},
    { id: "SCI5", name: "Science", teacher: "Dr. Smith", code: "SCI5", fullMarks: "100", passMarks: "30",},
    { id: "HIST5", name: "History", teacher: "Ms. Brown", code: "HIST5", fullMarks: "100", passMarks: "30",},
    { id: "ART5", name: "Art", teacher: "Mr. Wilson", code: "ART5", fullMarks: "100", passMarks: "30",},
  ],
  6: [
    { fullMarks: "100", passMarks: "30", id: "MATH6", name: "Mathematics", teacher: "Mr. Davis", code: "MATH6" },
    { fullMarks: "100", passMarks: "30", id: "ENG6", name: "English", teacher: "Ms. Miller", code: "ENG6" },
    { fullMarks: "100", passMarks: "30", id: "SCI6", name: "Science", teacher: "Dr. Garcia", code: "SCI6" },
    { fullMarks: "100", passMarks: "30", id: "HIST6", name: "History", teacher: "Ms. Rodriguez", code: "HIST6" },
    { fullMarks: "100", passMarks: "30", id: "GEO6", name: "Geography", teacher: "Mr. Martinez", code: "GEO6" },
    { fullMarks: "100", passMarks: "30", id: "ART6", name: "Art", teacher: "Ms. Lopez", code: "ART6" },
  ],
}

export default function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState<ClassData>(classesData[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [classes, setClasses] = useState<ClassData[]>(classesData)
  const [newClassName, setNewClassName] = useState("")
  const [showAddSection, setShowAddSection] = useState(false)
  const [showAddSubject, setShowAddSubject] = useState(false)
  const [newSectionName, setNewSectionName] = useState("")
  const [newTeacherName, setNewTeacherName] = useState("")
  const [newSubjectName, setNewSubjectName] = useState("")
  const [newSubjectTeacher, setNewSubjectTeacher] = useState("")
  const [newSubjectCode, setNewSubjectCode] = useState("")
  const [newSubjectFullMarks, setNewSubjectFullMarks] = useState("")
  const [newSubjectPassMarks, setNewSubjectPassMarks] = useState("")
  const [sectionsState, setSectionsState] = useState(sectionsData)
  const [subjectsState, setSubjectsState] = useState(subjectsData)
  const [editingClass, setEditingClass] = useState<number | null>(null)
  const [editClassName, setEditClassName] = useState("")
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editSectionName, setEditSectionName] = useState("")
  const [editTeacherName, setEditTeacherName] = useState("")
  const [editingSubject, setEditingSubject] = useState<string | null>(null)
  const [editSubjectName, setEditSubjectName] = useState("")
  const [editSubjectTeacher, setEditSubjectTeacher] = useState("")
  const [editSubjectCode, setEditSubjectCode] = useState("")
  const [activeTab, setActiveTab] = useState("classes")
  const [showAddClass, setShowAddClass] = useState(false)

  
  

  const filteredClasses = classes.filter((cls) => cls.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const currentSections = sectionsState[selectedClass.id] || []
  const currentSubjects = subjectsState[selectedClass.id] || []

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-gray-700" />
            <h1 className="text-xl font-semibold text-gray-900">Classes</h1>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Classes List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="relative">
                {editingClass === cls.id ? (
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <Input
                      value={editClassName}
                      onChange={(e) => setEditClassName(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSaveClassEdit()}
                      className="mb-2 bg-white"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSaveClassEdit} size="sm" className="flex-1">
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingClass(null)
                          setEditClassName("")
                        }}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "relative p-4 rounded-lg border transition-colors group",
                      selectedClass.id === cls.id
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-gray-200 hover:bg-gray-50",
                    )}
                  >
                    <button onClick={() => {
                              setSelectedClass(cls)
                              setActiveTab("sections")
                            }} className="w-full text-left">
                      <div className="flex justify-between items-start mb-2 pr-8">
                        <h3 className="font-medium text-gray-900">{cls.name}</h3>
                        <div className="text-sm text-gray-500">
                          <div>{cls.sections} sections</div>
                          <div>{cls.subjects} subjects</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{cls.students} students</span>
                      </div>
                    </button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClass(cls.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClass(cls.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button variant="ghost" size="sm" className="p-1">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {activeTab === "classes" ? "All Classes" : selectedClass.name}
                </h1>
              </div>
              <div className="text-sm text-gray-500">
                {activeTab === "classes" ? "Manage all classes" : `Classes / ${selectedClass.name}`}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
            <TabsList className="grid w-full max-w-lg grid-cols-3">
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          {/* Classes Tab */}
          <TabsContent value="classes" className="flex-1 flex flex-col mt-0">
            <div className="bg-white border-b border-gray-200 p-6">
              <Button onClick={() => setShowAddClass(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Class
              </Button>
            </div>

            {/* Add Class Form */}
            {showAddClass && (
              // Class Form
            )}

            {/* Classes Grid */}
            
          </TabsContent>

          {/* Sections Tab */}
          <TabsContent value="sections" className="flex-1 flex flex-col mt-0">
            <div className="bg-white border-b border-gray-200 p-6">
              <Button onClick={() => setShowAddSection(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Section
              </Button>
            </div>

            {/* Add Section Form */}
            {showAddSection && (
              // Section Form
            )}

            {/* Sections Grid */}
            
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="flex-1 flex flex-col mt-0">
            <div className="bg-white border-b border-gray-200 p-6">
              <Button onClick={() => setShowAddSubject(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Subject
              </Button>
            </div>

            {/* Add Subject Form */}
            {showAddSubject && (
              // Subject Form
            )}

            {/* Subjects Grid */}
            
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
