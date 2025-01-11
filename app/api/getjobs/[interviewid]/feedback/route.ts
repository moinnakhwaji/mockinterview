import { dbConnect } from "@/lib/db";
import MockJob from "@/models/MockJob";
import User from "@/models/User";

export async function GET(req: Request, { params }: any) {
    const resolvedParams = await params;

  const { interviewid } = resolvedParams; // Extract the interview ID from the request parameters

  try {
    // Ensure the database connection is established
    await dbConnect();

    const mockJob = await MockJob.findById(interviewid);
    if (!mockJob) {
      return new Response(
        JSON.stringify({ message: "Mock Job not found", status: 404 }),
        { status: 404 }
      );
    }
    
    // Find users associated with the same `mockId`
  //@ts-ignore
    const users = await User.find({ mockId: mockJob._id.toString() });
    if (!users.length) {
      return new Response(
        JSON.stringify({
          message: "No users found for the given mock job",
          status: 404,
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Mock Job and associated users found",
        mockJob,
        users,
      }),
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Error fetching mock job and users:", error);
    return new Response(
      JSON.stringify({
        message: "An error occurred while fetching the data",
        error: error.message,
        status: 500,
      }),
      { status: 500 }
    );
  }
}


