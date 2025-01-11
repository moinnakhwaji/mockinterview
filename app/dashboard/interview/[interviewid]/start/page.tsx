"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Questionpage from "../../../../../components/shared/Questionpage";
import Answer from "@/components/shared/Answer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface InterviewData {
  interview: {
    _id: string;
    jsonMockResp: any;
    jobPosition: string;
    jobDesc: string;
    jobExp: number;
    createdBy: string;
    createdAt: string;
  };
}

const Start = ({ params }: { params: { interviewid: string } }) => {
  const [userData, setUserData] = useState<InterviewData | null>(null);
  const [jsonMockResp, setJsonMockResp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentindex, setCurrentindex] = useState(0);
  const [interviewId, setInterviewId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const resolvedParams = await params;
        setInterviewId(resolvedParams.interviewid);
        const response = await axios.get(
          `/api/getjobs/${resolvedParams.interviewid}`
        );

        if (response.status === 200) {
          setUserData(response.data);
          setJsonMockResp(response.data?.interview?.jsonMockResp || "");
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserId();
  }, [params]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-black p-6 sm:p-8 md:p-10">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 animate-pulse">
            Loading...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Questionpage Section */}
          <div className="bg-[#2e2e3a] p-6 sm:p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500">
            <Questionpage
              currentindex={currentindex}
              jsonMockResp={jsonMockResp || ""}
              onIndexChange={setCurrentindex} // Pass the callback to update index
            />
          </div>

          {/* Answer Section */}
          <div className="bg-[#2e2e3a] p-6 sm:p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500">
            <Answer
              interviewId={interviewId}
              currentindex={currentindex}
              jsonMockResp={jsonMockResp || ""}
            />
          </div>
        </div>
      )}

      {/* Buttons Section */}
      <div className="mt-8 flex flex-row items-center justify-center gap-4">
        {/* Previous Button */}
        {currentindex > 0 && (
          <Button
            className="bg-black text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-white hover:text-black border border-white"
            onClick={() => setCurrentindex((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </Button>
        )}

        {/* Next Button - Visible only if currentindex <= 3 */}
        {jsonMockResp && currentindex < jsonMockResp.length - 1 && currentindex <= 3 && (
          <Button
            className="bg-black text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-white hover:text-black border border-white"
            onClick={() => setCurrentindex((prev) => Math.min(prev + 1, jsonMockResp.length - 1))}
          >
            Next
          </Button>
        )}

        {/* End Interview Button - Visible only if currentindex is 4 */}
        {jsonMockResp && currentindex === 4 && (
          <Link href={`/dashboard/interview/${interviewId}/feedback`}>
            <Button className="bg-black text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-white hover:text-black border border-white">
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Start;
