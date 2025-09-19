import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import TextInput from "@/components/FormInputs/TextInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSectionApi } from "@/features/section/sectionApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { sectionInput, sectionSchema } from "@/schemas/sectionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function Section() {
  const dispatch = useAppDispatch();
  const { data, error } = useSelector((state: any) => state.teacher);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [newTeacherName, setNewTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState([]);
  type Option = {
    value: string; // ❗ Change this from `string | number` to `string`
    label: string;
    [key: string]: any;
  };
  const teachers: Option[] = [
    { label: "John", value: "John" },
    { label: "Alferd", value: "Alferd" },
    { label: "Omar", value: "Omar" },
  ];
  const classes: Option[] = [
    { label: "Class 1", value: "1" },
    { label: "Class 2", value: "2" },
    { label: "Class 3", value: "3" },
    { label: "Class 4", value: "4" },
    { label: "Class 5", value: "5" },
  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<sectionInput>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      name: "",
      classId: "",
      teacherId: "",
    },
  });

  const onSubmit = async (data: sectionInput) => {
    const payload = {
      ...data,
    };
    dispatch(createSectionApi(payload));
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
        <Button
          onClick={() => setShowAddSection(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </Button>
      </div>

      {/* Add Section Form */}
      {showAddSection && (
        <form id="section-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add New Section
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                  label="Section Name"
                  control={control}
                  name="name"
                  type="text"
                  placeholder="Enter Class Name"
                  errors={errors}
                  tooltipText=""
                />
              
                <FormSelectInput
                  name="classId"
                  label="Class"
                  options={classes}
                  control={control}
                  errors={errors}
                />
                <FormSelectInput
                  name="teacherId"
                  label="Teacher"
                  options={teachers}
                  control={control}
                  errors={errors}
                />
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" size="sm">
                Add Section
              </Button>
              <Button
                onClick={() => {
                  setShowAddSection(false);
                }}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}

    </div>
  );
}

export default Section;
