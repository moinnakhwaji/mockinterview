import { dbConnect } from "@/lib/db";
import MockJob from "@/models/MockJob";


export async function GET(req: Request, { params }: any) {
    const resolvedSearchParams = await params
  const { interviewid } = resolvedSearchParams;

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
