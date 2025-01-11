// import { dbConnect } from "@/lib/db";
// import User from "@/models/User"; // Adjust path based on your project structure
// import moment from "moment";


// export async function POST(req: Request, { params }: { params: { interviewid: any } }) {
//   await dbConnect();

//   try {
//     const resolvedSearchParams = await params
//   const { interviewid } = resolvedSearchParams;

//     const body = await req.json();
//     const { question, correctAnswer, userAnswer, email, rating, feedback } = body;

//     if (!interviewid || !question || !correctAnswer || !email) {
//       return new Response(
//         JSON.stringify({ message: "Missing required fields", status: 400 }),
//         { status: 400 }
//       );
//     }

//     // Create a new User document
//     const newUser = new User({
//       question,
//       correctAnswer,
//       userAnswer,
//       email,
//       rating,
//       feedback,
//       createdAt: moment().toDate(),
//     });

//     // Save the new user to the database
//     const savedUser = await newUser.save();

//     return new Response(
//       JSON.stringify({ message: "User saved successfully", user: savedUser }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error saving user:", error);
//     return new Response(
//       JSON.stringify({ message: "Internal server error", error }),
//       { status: 500 }
//     );
//   }
// }


import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import moment from "moment";

export async function POST(req: Request, { params }: { params: Promise<{ interviewid: string }> }) {
  await dbConnect();

  try {
    // If params is a Promise, await its resolution
    const resolvedParams = await params;
    const { interviewid } = resolvedParams;

    const body = await req.json();
    const { question, correctAnswer, userAnswer, email, rating, feedback } = body;

    if (!interviewid || !question || !correctAnswer || !email) {
      return new Response(
        JSON.stringify({ message: "Missing required fields", status: 400 }),
        { status: 400 }
      );
    }

    // Create a new User document
    const newUser = new User({
      question,
      correctAnswer,
      userAnswer,
      email,
      rating,
      feedback,
      createdAt: moment().toDate(),
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    return new Response(
      JSON.stringify({ message: "User saved successfully", user: savedUser }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error }),
      { status: 500 }
    );
  }
}
