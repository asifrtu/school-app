// // app/api/user/route.ts
// import db from '@/lib/db'
// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json()
//     // const user = await db.testing.create({ data: data })  

//     // console.log("Data is on server:", data)
//     return Response.json({ message: "User created successfully", ...user }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to parse request" }, { status: 500 })
//   }
// }
