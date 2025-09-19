import React from 'react'

function ClassList() {
  return (
    <div>
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
    </div>
  )
}

export default ClassList