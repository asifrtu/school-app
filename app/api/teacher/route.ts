import db from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { TeacherSchema } from "@/schemas/teacherSchema";


// GET: Fetch all teachers (users)
export async function GET() {
  try {
    const teachers = await db.user.findMany();
    return NextResponse.json(
      { success: true, data: teachers, message: "teachers fetched successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "INTERNAL_SERVER_ERROR", message: "Failed to fetch teachers." },
      { status: 500 }
    );
  }
}

// POST: Add a teacher


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // ✅ Validate with Zod using plainData
    const validatedData = TeacherSchema.parse(data);
    console.log(validatedData);
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      roleId,
      status,
      session,
      classSt,
      subject,
      joiningDate,
      dateOfBirth,
      gender,
      religion,
      caste,
      bloodGroup,
      disability,
      fatherName,
      motherName,
      emergencyContact,
      address1,
      address2,
      notes,
      teacherImage
    } = validatedData;
    // if (!teacherImage) {
      
    // }
    // ❌ Check duplicates
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "EMAIL_ALREADY_EXISTS", message: "Email already exists." },
        { status: 409 }
      );
    }

    const existingUserPhone = await db.user.findUnique({ where: { phoneNumber } });
    if (existingUserPhone) {
      return NextResponse.json(
        { success: false, error: "PHONE_NUMBER_ALREADY_EXISTS", message: "Phone number already exists." },
        { status: 409 }
      );
    }

   db.role.create({
     data: {
       name: "teacher",
       description: "teacher",
     }, 
   });


    const newUserWithAcademicInfo = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        roleId,
        status,
        TeacherAcademicInfo: {
          create: {
            session,
            classSt,
            subject,
          },
        },
        Teacher: {
          create: {
            joiningDate,
            dateOfBirth,
            gender,
            religion,
            caste,
            bloodGroup,
            disability,
            fatherName,
            motherName,
            emergencyContact,
            address1,
            address2,
            notes,
            teacherImage: teacherImage,
          },
        },
      },
      include: {
        TeacherAcademicInfo: true,
        Teacher: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "teacher created successfully.",
        data: newUserWithAcademicInfo,
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "VALIDATION_ERROR",
          message: "Invalid teacher data.",
          issues: error.errors
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "Failed to create teacher on server.",
      },
      { status: 500 }
    );
  }
}
