import { dbConnect } from "@/lib/db";
import MockJob from "@/models/MockJob";
import moment from "moment";

// POST method: Create a new mock job
export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const { jobPosition, jobDesc, jobExp, jsonMockResp, createdBy = "anonymous" } = body;

    if (!jobPosition || !jobDesc || !jobExp || !jsonMockResp) {
      return new Response(
        JSON.stringify({ message: "Missing required fields", status: 404 }),
        { status: 404 }
      );
    }

    const newMockJob = new MockJob({
      jobPosition,
      jobDesc,
      jobExp,
      createdBy,
      jsonMockResp,
      createdAt: moment().format("YYYY-MM-DD"),
    });

    const savedMockJob = await newMockJob.save();

    return new Response(
      JSON.stringify({
        message: "Mock job created successfully",
        job: savedMockJob,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving mock job:", error);
    return new Response(
      JSON.stringify({ message: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}

// GET method: Fetch a mock job by interview ID
export async function GET(req: Request, { params }: any) {
  const { interviewid } = params;

  try {
    await dbConnect();
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

// Custom method: Get user by interview ID
export async function GetUserbyId(req: Request, { params }: any) {
  const { interviewid } = params;

  try {
    await dbConnect();
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
