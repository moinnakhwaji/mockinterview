"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuWebcam } from "react-icons/lu";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface InterviewData {
  interview: {
    _id: string;
    jsonMockResp: Record<string, any>;
    jobPosition: string;
    jobDesc: string;
    jobExp: number;
    createdBy: string;
    createdAt: string;
  };
}

const Page = ({ params }: any) => {
  const [userData, setUserData] = useState<InterviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [webcamEnable, setWebcamEnable] = useState(false);
  const [interviewId , setInterviewId] = useState()

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const resolvedParams = await params;
        // console.log(resolvedParams.interviewid)
        setInterviewId(resolvedParams.interviewid)
        // console.log(interviewId,"id")
        const response = await axios.get(
          `/api/getjobs/${resolvedParams.interviewid}`
        );

        if (response.status === 200) {
          setUserData(response.data);
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

  const router = useRouter()

  const changePage = ()=>{
    // Navigate to the next page
     router.push(`/dashboard/interview/${interviewId}/start`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] text-white">
        <div className="text-lg font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row p-8"
      style={{
        background: "linear-gradient(145deg, #1a1a2e, #0f0f1e)",
        boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.9)",
      }}
    >
      {/* Left Side: Text Content */}
      <div className="flex-1 p-6 md:pr-12 flex flex-col justify-center space-y-6">
      <h2 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg">
  Let&apos;s Get Started
</h2>

        <div className="bg-[#1e1e2f] p-6 rounded-lg shadow-lg text-white space-y-4">
          <h3 className="text-xl font-semibold">
            <span className="text-purple-400">Job Role:</span>{" "}
            {userData?.interview?.jobPosition}
          </h3>
          <h3 className="text-xl font-semibold">
            <span className="text-purple-400">Job Description:</span>{" "}
            {userData?.interview?.jobDesc}
          </h3>
          <h3 className="text-xl font-semibold">
            <span className="text-purple-400">Years of Experience:</span>{" "}
            {userData?.interview?.jobExp}
          </h3>
        </div>
        <div className="mt-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-lg text-sm text-gray-300 shadow-md">
          <p className="leading-relaxed">
            {process.env.NEXT_PUBLIC_INFORMATION}
          </p>
        </div>
      </div>

      {/* Right Side: Webcam */}
      <div className="flex-[1.5] flex justify-center items-center flex-col">
        {webcamEnable ? (
          <div className="flex flex-col items-center">
            <Webcam
              onUserMediaError={() => setWebcamEnable(false)}
              onUserMedia={() => setWebcamEnable(true)}
              className="rounded-lg shadow-lg w-full max-w-lg border-4 border-purple-700"
            />
            <Button
              onClick={() => setWebcamEnable(false)}
              className="mt-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-2 rounded-lg shadow-lg"
            >
              Disable Webcam
            </Button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 p-8 rounded-xl shadow-2xl text-center">
            <LuWebcam className="text-white text-8xl mb-6 animate-bounce" />
            <Button
              onClick={() => setWebcamEnable(true)}
              className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg"
            >
              Enable Webcam & Microphone
            </Button>
          </div>
        )}
     <div className="mt-3 ">
  <Button
    onClick={changePage}
    className="bg-gradient-to-r  bg-white text-black px-6 py-3 rounded-lg font-semibold shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-zinc-950 hover:text-white hover:shadow-lg"
  >
    Start
  </Button>
</div>

    
      </div>
      

    </div>
  );
};

export default Page;
