import React from 'react'

function SectionList() {
  return (
    <div>
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
    </div>
  )
}

export default SectionList