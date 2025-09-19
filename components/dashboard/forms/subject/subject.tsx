import React from 'react'

function Subject() {
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
  return (
    <div>
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
    </div>
  )
}

export default Subject