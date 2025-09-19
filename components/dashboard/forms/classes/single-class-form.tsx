import TextInput from '@/components/FormInputs/TextInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClassApi } from '@/features/class/classApi'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { classInput, classSchema } from '@/schemas/classSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

function SingleClassForm() {
  const [showAddClass, setShowAddClass] = useState(false);
  const dispatch = useAppDispatch();
    const { data, error } = useSelector((state: any) => state.class);
  const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<classInput>({
      resolver: zodResolver(classSchema),
      defaultValues: {
        name: '',
      },
    });

    const onSubmit = async (data: classInput) => {
        const payload = {
          ...data,
        };
        dispatch(createClassApi(payload));
      };
      useEffect(() => {
        if (data) {
          toast.success(data.message);
        }
        if (error) {
          toast.error(error.message);
        }
      }, [data, error]);

  return (
          <div>
            <div className="bg-white border-b border-gray-200 p-6">
              <Button onClick={() => setShowAddClass(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Class
              </Button>
            </div>

            {/* Add Class Form */}
            {showAddClass && (
              <form id="single-student-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-6 mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Class</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Class Name"
                      control={control}
                      name="name"
                      type="text"
                      placeholder="Enter Class Name"
                      errors={errors}
                      tooltipText=""
                    />
                    
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type='submit' size="sm">
                    Add Class
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddClass(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              </form>
            )}
          </div>
  )
}

export default SingleClassForm