import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs"; // Assuming you're using Clerk for authentication
import Card from "./Card"; // Import the Card component

const PreviousMock = () => {
  const [userData, setUserData] = useState<any[]>([]); // Array to hold multiple jobs data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useUser(); // Get user data from Clerk

  const fetchData = useCallback(async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress; // Get user email

      if (!email) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(`/api/wait?email=${email}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data.data); // Store the fetched data in state
      } else {
        throw new Error(data.message || "Failed to fetch data");
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message); // Set error message
      setLoading(false);
    }
  }, [user]); // Memoize fetchData and add 'user' as a dependency

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]); // Add fetchData to the dependency array

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {userData.length > 0 ? (
        userData.map((job: any) => (
          <Card
            key={job._id || job.jobPosition} // Set a unique key for each job
            jobPosition={job.jobPosition}
            jobExp={job.jobExp}
            createdAt={job.createdAt}
            interviewid={job._id}
          />
        ))
      ) : (
        <p className="text-white">No jobs found for this user</p>
      )}
    </div>
  );
};

export default PreviousMock;
