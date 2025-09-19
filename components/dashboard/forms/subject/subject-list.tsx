import React from 'react'

function SubjectList() {
  return (
    <div>
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
    </div>
  )
}

export default SubjectList