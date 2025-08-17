export async function POST(request: NextRequest) {
  try {

    const formData = await request.formData();
    const file = formData.get("studentImage");

    if (file && file instanceof File) {
      const fileName = file.name;

      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
      await writeFile(uploadPath, bytes);

      // if (!fileUploaded) {
      //   return NextResponse.json(
      //     { success: false, error: "FILE_UPLOAD_ERROR", message: "Failed to upload file." },
      //     { status: 500 }
      //   );
        
      // }

  // const imageFile = formData.get("studentImage");
  // let imageName = "";
  
  // if (imageFile instanceof File) {
  //     imageName = imageFile.name;
  //   }
     
  //   await fs.writeFile(`./public/uploads/${imageName}`, buffer);

    // Convert FormData to plain object for Zod validation
    const plainData: Record<string, any> = {};
    formData.forEach((value: any, key: string | number) => {
      plainData[key] = value;
    });

    // Add image name manually if your schema expects it
    plainData.image = fileName;
    
    console.log("Submitted Data:", plainData);
    // Validate input using Zod
    const validatedData = singleStudentSchema.parse(plainData);
    if(!validatedData){
      return NextResponse.json(
        { success: false, error: "INVALID_INPUT", message: "Invalid input." },
        { status: 400 }
      );
    }
    const { firstName, lastName, email, phoneNumber, password, roleId, status, session, classSt, rollNumber, admissionDate, dateOfBirth, gender, religion, caste, bloodGroup, disability, disease, fatherName, motherName, guardianName, emergencyContact, address1, address2, notes, studentImage } = validatedData;
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
        { data: {success: false, error: "PHONE_NUMBER_ALREADY_EXISTS", message: "Phone number already exists."} },
        { status: 409 }
      );
    } 
    
    await db.role.create({
      data: {
        name: "student",
      }, 
    })

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
                studentImage: fileName,
              },
            }
          },
          include: {
            Student: true,
            StudentAcademicInfo: true,
          },
    });

    return NextResponse.json(
      {
        success: true,
        ...newUserWithAcademicInfo,
        message: "Student created successfully."
      },
      { status: 201 }
    );
  }
  } catch (error) {
    // Handle Zod validation errors (client input error)
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "VALIDATION_ERROR",
          message: "Invalid student data.",
          issues: error.errors // Array of validation errors
        },
        { status: 402 }
      );    
    }

    // Prisma/database errors
    // Optionally, inspect the error type for more specific messages

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "Failed to create student on server."
        // Optionally, add error: error.message in dev environment
      },
      { status: 500 }
    );
  }
}
