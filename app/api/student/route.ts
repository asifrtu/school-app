import db from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { studentSchema } from "@/schemas/studentSchema";


// GET: Fetch all students (users)
export async function GET() {
  try {
    const students = await db.user.findMany();
    return NextResponse.json(
      { success: true, data: students, message: "Students fetched successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "INTERNAL_SERVER_ERROR", message: "Failed to fetch students." },
      { status: 500 }
    );
  }
}

// POST: Add a student


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // ✅ Validate with Zod using plainData
    const validatedData = studentSchema.parse(data);

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
      rollNumber,
      admissionDate,
      dateOfBirth,
      gender,
      religion,
      caste,
      bloodGroup,
      disability,
      disease,
      fatherName,
      motherName,
      guardianName,
      emergencyContact,
      address1,
      address2,
      notes,
      studentImage
    } = validatedData;

    // ❌ Check duplicates
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 409 }
      );
    }

    const existingUserPhone = await db.user.findUnique({ where: { phoneNumber } });
    if (existingUserPhone) {
      return NextResponse.json(
        {message: "Phone number already exists." },
        { status: 409 }
      );
    }

    // ✅ Ensure role exists or skip this if handled elsewhere
    // await db.role.create({
    //   data:{name: "student"} // Replace with the actual role name);
    // });

    const newUserWithAcademicInfo = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        roleId,
        status,
        StudentAcademicInfo: {
          create: {
            session,
            classSt,
            rollNumber,
          },
        },
        Student: {
          create: {
            admissionDate,
            dateOfBirth,
            gender,
            religion,
            caste,
            bloodGroup,
            disability,
            disease,
            fatherName,
            motherName,
            guardianName,
            emergencyContact,
            address1,
            address2,
            notes,
            studentImage,
          },
        },
      },
      include: {
        Student: true,
        StudentAcademicInfo: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student created successfully.",
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
          message: "Invalid student data.",
          issues: error.errors
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "Failed to create student on server.",
      },
      { status: 500 }
    );
  }
}
