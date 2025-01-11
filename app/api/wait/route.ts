import MockJob from "@/models/MockJob";  // Adjust the path as necessary
import User from "@/models/User";  // Adjust the path as necessary
import { dbConnect } from "@/lib/db";

// Modify the GET request to handle fetching mock job data created by a specific user
export async function GET(req: Request) {
  try {
    // Ensure the database connection
    await dbConnect();

    // Get the email from the query parameter
    const url = new URL(req.url);
    const email = url.searchParams.get('email');  // Get email from query parameter

    console.log("Email from query parameter:", email); // Debugging: Log the email

    // Validate that an email was provided
    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required", status: 400 }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch all mock jobs created by the user based on email
    const userJobs = await MockJob.find({ createdBy: email });

    // Check if any mock jobs were found
    if (!userJobs || userJobs.length === 0) {
      return new Response(
        JSON.stringify({ message: "No mock jobs found for the user", status: 404 }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch feedback for each job from the User collection
    const jobsWithFeedback = await Promise.all(
      userJobs.map(async (job) => {
        const feedback = await User.find({ mockId: job._id });

        // Add the feedback to the job object
        return {
          ...job.toObject(),
          feedback,
        };
      })
    );

    return new Response(
      JSON.stringify({
        message: "Mock jobs fetched successfully",
        data: jobsWithFeedback,
        status: 200
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", status: 500 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
