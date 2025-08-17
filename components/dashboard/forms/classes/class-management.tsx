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

  const handleAddClass = () => {
    if (newClassName.trim()) {
      const newClass: ClassData = {
        id: Math.max(...classes.map((c) => c.id)) + 1,
        name: newClassName,
        students: 0,
        sections: 0,
        subjects: 0,
      }
      setClasses([...classes, newClass])
      setNewClassName("")
      setShowAddClass(false)
    }
  }

  const handleEditClass = (classId: number) => {
    const classToEdit = classes.find((c) => c.id === classId)
    if (classToEdit) {
      setEditingClass(classId)
      setEditClassName(classToEdit.name)
    }
  }

  const handleSaveClassEdit = () => {
    if (editClassName.trim() && editingClass) {
      const updatedClasses = classes.map((cls) => (cls.id === editingClass ? { ...cls, name: editClassName } : cls))
      setClasses(updatedClasses)
      if (selectedClass.id === editingClass) {
        setSelectedClass((prev) => ({ ...prev, name: editClassName }))
      }
      setEditingClass(null)
      setEditClassName("")
    }
  }

  const handleDeleteClass = (classId: number) => {
    if (confirm("Are you sure you want to delete this class? This action cannot be undone.")) {
      const updatedClasses = classes.filter((cls) => cls.id !== classId)
      setClasses(updatedClasses)

      // Remove sections and subjects for this class
      const updatedSections = { ...sectionsState }
      const updatedSubjects = { ...subjectsState }
      delete updatedSections[classId]
      delete updatedSubjects[classId]
      setSectionsState(updatedSections)
      setSubjectsState(updatedSubjects)

      // If deleted class was selected, select first available class
      if (selectedClass.id === classId && updatedClasses.length > 0) {
        setSelectedClass(updatedClasses[0])
      }
    }
  }

  const handleAddSection = () => {
    if (newSectionName.trim() && newTeacherName.trim()) {
      const newSection: SectionData = {
        id: `${selectedClass.id}${newSectionName}`,
        name: `${selectedClass.id}${newSectionName}`,
        teacher: newTeacherName,
        students: 0,
      }

      const updatedSections = {
        ...sectionsState,
        [selectedClass.id]: [...(sectionsState[selectedClass.id] || []), newSection],
      }
      setSectionsState(updatedSections)

      // Update class sections count
      const updatedClasses = classes.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, sections: cls.sections + 1 } : cls,
      )
      setClasses(updatedClasses)
      setSelectedClass((prev) => ({ ...prev, sections: prev.sections + 1 }))

      setNewSectionName("")
      setNewTeacherName("")
      setShowAddSection(false)
    }
  }

  const handleAddSubject = () => {
    if (newSubjectName.trim() && newSubjectTeacher.trim() && newSubjectCode.trim()) {
      const newSubject: SubjectData = {
          id: newSubjectCode,
          name: newSubjectName,
          teacher: newSubjectTeacher,
          code: newSubjectCode,
          fullMarks: newSubjectFullMarks,
          passMarks: newSubjectPassMarks
      }

      const updatedSubjects = {
        ...subjectsState,
        [selectedClass.id]: [...(subjectsState[selectedClass.id] || []), newSubject],
      }
      setSubjectsState(updatedSubjects)

      // Update class subjects count
      const updatedClasses = classes.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, subjects: cls.subjects + 1 } : cls,
      )
      setClasses(updatedClasses)
      setSelectedClass((prev) => ({ ...prev, subjects: prev.subjects + 1 }))

      setNewSubjectName("")
      setNewSubjectTeacher("")
      setNewSubjectCode("")
      setShowAddSubject(false)
    }
  }

  const handleEditSection = (sectionId: string) => {
    const section = currentSections.find((s) => s.id === sectionId)
    if (section) {
      setEditingSection(sectionId)
      setEditSectionName(section.name)
      setEditTeacherName(section.teacher)
    }
  }

  const handleSaveSectionEdit = () => {
    if (editSectionName.trim() && editTeacherName.trim() && editingSection) {
      const updatedSections = {
        ...sectionsState,
        [selectedClass.id]: sectionsState[selectedClass.id].map((section) =>
          section.id === editingSection ? { ...section, name: editSectionName, teacher: editTeacherName } : section,
        ),
      }
      setSectionsState(updatedSections)
      setEditingSection(null)
      setEditSectionName("")
      setEditTeacherName("")
    }
  }

  const handleDeleteSection = (sectionId: string) => {
    if (confirm("Are you sure you want to delete this section? This action cannot be undone.")) {
      const updatedSections = {
        ...sectionsState,
        [selectedClass.id]: sectionsState[selectedClass.id].filter((section) => section.id !== sectionId),
      }
      setSectionsState(updatedSections)

      // Update class sections count
      const updatedClasses = classes.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, sections: cls.sections - 1 } : cls,
      )
      setClasses(updatedClasses)
      setSelectedClass((prev) => ({ ...prev, sections: prev.sections - 1 }))
    }
  }

  const handleEditSubject = (subjectId: string) => {
    const subject = currentSubjects.find((s) => s.id === subjectId)
    if (subject) {
      setEditingSubject(subjectId)
      setEditSubjectName(subject.name)
      setEditSubjectTeacher(subject.teacher)
      setEditSubjectCode(subject.code)
    }
  }

  const handleSaveSubjectEdit = () => {
    if (editSubjectName.trim() && editSubjectTeacher.trim() && editSubjectCode.trim() && editingSubject) {
      const updatedSubjects = {
        ...subjectsState,
        [selectedClass.id]: subjectsState[selectedClass.id].map((subject) =>
          subject.id === editingSubject
            ? { ...subject, name: editSubjectName, teacher: editSubjectTeacher, code: editSubjectCode }
            : subject,
        ),
      }
      setSubjectsState(updatedSubjects)
      setEditingSubject(null)
      setEditSubjectName("")
      setEditSubjectTeacher("")
      setEditSubjectCode("")
    }
  }

  const handleDeleteSubject = (subjectId: string) => {
    if (confirm("Are you sure you want to delete this subject? This action cannot be undone.")) {
      const updatedSubjects = {
        ...subjectsState,
        [selectedClass.id]: subjectsState[selectedClass.id].filter((subject) => subject.id !== subjectId),
      }
      setSubjectsState(updatedSubjects)

      // Update class subjects count
      const updatedClasses = classes.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, subjects: cls.subjects - 1 } : cls,
      )
      setClasses(updatedClasses)
      setSelectedClass((prev) => ({ ...prev, subjects: prev.subjects - 1 }))
    }
  }

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
              <div className="mx-6 mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Class</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
                    <Input
                      placeholder="Enter class name..."
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddClass()}
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddClass} size="sm">
                    Add Class
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddClass(false)
                      setNewClassName("")
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Classes Grid */}
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((cls) => (
                  <Card key={cls.id} className="hover:shadow-md transition-shadow group relative">
                    {editingClass === cls.id ? (
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Class</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
                            <Input
                              value={editClassName}
                              onChange={(e) => setEditClassName(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && handleSaveClassEdit()}
                              className="bg-white"
                            />
                          </div>
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
                      </CardContent>
                    ) : (
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-900">{cls.name}</h3>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
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

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="w-4 h-4" />
                              <div>
                                <p className="text-sm text-gray-600">Students</p>
                                <p className="font-medium text-gray-900">{cls.students}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-600 rounded"></div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Sections</p>
                                <p className="font-medium text-gray-900">{cls.sections}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <BookOpen className="w-4 h-4" />
                            <div>
                              <p className="text-sm text-gray-600">Subjects</p>
                              <p className="font-medium text-gray-900">{cls.subjects}</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedClass(cls)
                              setActiveTab("sections")
                            }}
                            variant="outline"
                            size="sm"
                            className="w-full mt-4"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
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
              <div className="mx-6 mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Name</label>
                    <Input
                      placeholder="e.g., A, B, C..."
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class Teacher</label>
                    <Input
                      placeholder="Enter teacher name..."
                      value={newTeacherName}
                      onChange={(e) => setNewTeacherName(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddSection} size="sm">
                    Add Section
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddSection(false)
                      setNewSectionName("")
                      setNewTeacherName("")
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Sections Grid */}
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSections.map((section) => (
                  <Card key={section.id} className="hover:shadow-md transition-shadow group relative">
                    {editingSection === section.id ? (
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Section</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Section Name</label>
                            <Input
                              value={editSectionName}
                              onChange={(e) => setEditSectionName(e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Class Teacher</label>
                            <Input
                              value={editTeacherName}
                              onChange={(e) => setEditTeacherName(e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSaveSectionEdit} size="sm" className="flex-1">
                              Save
                            </Button>
                            <Button
                              onClick={() => {
                                setEditingSection(null)
                                setEditSectionName("")
                                setEditTeacherName("")
                              }}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    ) : (
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">{section.name}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditSection(section.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteSection(section.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Class Teacher:</p>
                            <p className="font-medium text-gray-900">{section.teacher}</p>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{section.students} students</span>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
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
              <div className="mx-6 mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Subject</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                    <Input
                      placeholder="e.g., Mathematics, English..."
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Teacher</label>
                    <Input
                      placeholder="Enter teacher name..."
                      value={newSubjectTeacher}
                      onChange={(e) => setNewSubjectTeacher(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Code</label>
                    <Input
                      placeholder="e.g., MATH5, ENG5..."
                      value={newSubjectCode}
                      onChange={(e) => setNewSubjectCode(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 mt-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Full Marks</label>
                    <Input
                      placeholder="e.g., Full Marks..."
                      value={newSubjectFullMarks}
                      onChange={(e) => setNewSubjectFullMarks(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Passing Marks</label>
                    <Input
                      placeholder="Enter teacher name..."
                      value={newSubjectPassMarks}
                      onChange={(e) => setNewSubjectPassMarks(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddSubject} size="sm">
                    Add Subject
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddSubject(false)
                      setNewSubjectName("")
                      setNewSubjectTeacher("")
                      setNewSubjectCode("")
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Subjects Grid */}
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSubjects.map((subject) => (
                  <Card key={subject.id} className="hover:shadow-md transition-shadow group relative">
                    {editingSubject === subject.id ? (
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Subject</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                            <Input
                              value={editSubjectName}
                              onChange={(e) => setEditSubjectName(e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Teacher</label>
                            <Input
                              value={editSubjectTeacher}
                              onChange={(e) => setEditSubjectTeacher(e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Code</label>
                            <Input
                              value={editSubjectCode}
                              onChange={(e) => setEditSubjectCode(e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSaveSubjectEdit} size="sm" className="flex-1">
                              Save
                            </Button>
                            <Button
                              onClick={() => {
                                setEditingSubject(null)
                                setEditSubjectName("")
                                setEditSubjectTeacher("")
                                setEditSubjectCode("")
                              }}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    ) : (
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditSubject(subject.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteSubject(subject.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Subject Teacher:</p>
                            <p className="font-medium text-gray-900">{subject.teacher}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Subject Code:</p>
                            <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subject.code}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600 mb-1">FM:</p>
                            <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subject.fullMarks}</p>
                        
                            <p className="text-sm text-gray-600 mb-1">PS:</p>
                            <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subject.passMarks}</p>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
