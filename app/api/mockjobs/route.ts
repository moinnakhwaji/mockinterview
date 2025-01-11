
import { dbConnect } from "@/lib/db";
import MockJob from "@/models/MockJob";
import moment from "moment";

export async function POST(req:Request) {
  // Connect to the database
  await dbConnect();

  try {
    // Parse the request body
    const body = await req.json();

    // Extract fields from the request body and additional sources
    const jobPosition = body.jobPosition;
    const jobDesc = body.jobDesc;
    const jobExp = body.jobExp;
    const jsonMockResp = body.jsonMockResp;
  

    // Additional data from Clerk or Gemini
    const createdBy =
      body.createdBy || // If `createdBy` is sent in the request body
      "anonymous"; // Default value if Clerk/Gemini data is not available

    // Ensure all required fields are present
    if (!jobPosition || !jobDesc || !jobExp || !jsonMockResp) {
      return new Response(
        JSON.stringify({ message: "Missing required fields", status: 404 }),
        { status: 404 }
      );
    }

    // Create a new mock job
    const newMockJob = new MockJob({
      jobPosition,
      jobDesc,
      jobExp,
      createdBy,
      jsonMockResp,
      createdAt: moment().format("YYYY-MM-DD"), // Add createdAt field
    });

    // Save the job to the database
    const savedMockJob = await newMockJob.save();

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Mock job created successfully",
        job: savedMockJob,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving mock job:", error);

    // Return error response
    return new Response(
      JSON.stringify({ message: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}




// Server-side function to fetch interview by ID
// Server-side function to fetch interview by ID


export async function GET(req: Request, { params }: any) {
  const { interviewid } = params;

  try {
    // Ensure the database connection is established
    await dbConnect();

    // Fetch the mock job by interviewid
    const result = await MockJob.findById(interviewid);
    if (!result) {
      return new Response(
        JSON.stringify({ message: "Interview ID not found", status: 404 }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Interview found", interview: result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching interview:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred while fetching the interview", error, status: 500 }),
      { status: 500 }
    );
  }
}




export async function GetUserbyId(req: Request, { params }: any) {
    const { interviewid } = params;
  
    try {
      // Ensure the database connection is established
      await dbConnect();
  
      // Fetch the mock job by interviewid
      const result = await MockJob.findById(interviewid);
      if (!result) {
        return new Response(
          JSON.stringify({ message: "Interview ID not found", status: 404 }),
          { status: 404 }
        );
      }
  
      return new Response(
        JSON.stringify({ message: "Interview found", interview: result }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching interview:", error);
      return new Response(
        JSON.stringify({ message: "An error occurred while fetching the interview", error, status: 500 }),
        { status: 500 }
      );
    }
  }



