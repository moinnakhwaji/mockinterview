'use client'; // Add this line for client-side functionality

import React, { useState, FormEvent } from "react";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { chatSession } from "@/lib/Giminiai";
import {dbConnect} from "@/lib/db";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';



const AddNewInterview: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExp, setJobExp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const { user } = useUser();
  

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dbConnect();
  
    if (!jobPosition || !jobDesc || !jobExp) {
      alert("Please fill all fields");
      return;
    }
  
    setLoading(true);
  
    try {
      const inputPrompt = `
        Job Position: ${jobPosition}
        Job Description: ${jobDesc}
        Years of Experience: ${jobExp}
        Based on this information, provide ${process.env.NEXT_PUBLIC_Question} questions with answers in JSON format.
      `;
      const ress = await chatSession.sendMessage(inputPrompt);
      const mockjson = ress.response.text().replace('```json', '').replace('```', '');
     
      const response = await axios.post("/api/mockjobs", {
       
        jobPosition,
        jobDesc,
        jobExp,
        jsonMockResp: mockjson,
        createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
        createdAt: moment().format("YYYY-MM-DD"),
      });

    

      if(response){
        setJobDesc("")
        setJobExp("");
        setJobPosition("")
        setOpen(false);
        setLoading(false);
        router.push( `/dashboard/interview/${response?.data?.job?._id}`) // Redirect to the new interview page
        
      }
  
      if (response.status !== 201) {
        throw new Error(response.data.message || "Failed to create mock interview");
      }
  
      toast("successfully create mock interview",{
        theme: "dark", // Built-in dark theme
      });
   
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("An error occurred...");
      setLoading(false);
    }
  };
  
  return (
    <div className="pt-2 md:pt-4">
      <div className="p-10 border bg-[#25232a] border-[#d1d1d1] rounded-lg flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="text-lg font-bold text-[#9b9b9b] hover:text-[#4e45b5]"
        >
          + Add New
        </button>
      </div>

      {open && (
        <div className="flex fixed inset-0 items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg p-6 bg-[#25232a] border border-[#3a3a3d] rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-[#6556cd] mb-2 text-center">
              Tell us more about job interviewing
            </h1>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Provide details about the job position, role, and description.
            </p>

            <form className="flex flex-col gap-4" onSubmit={submit}>
              <div>
                <label htmlFor="jobRole" className="block text-sm font-semibold mb-2">
                  Job Role/Position
                </label>
                <input
                  type="text"
                  id="jobRole"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="w-full px-4 py-2 bg-[#1f1e24] border border-[#3a3a3d] rounded-md text-gray-200 focus:ring-2 focus:ring-[#6556cd] outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="jobDescription" className="block text-sm font-semibold mb-2">
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  rows={3}
                  placeholder="Write a brief description"
                  className="w-full px-4 py-2 bg-[#1f1e24] border border-[#3a3a3d] rounded-md text-gray-200 focus:ring-2 focus:ring-[#6556cd] outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-semibold mb-2">
                  Years of Experience
                </label>
                <input
                  id="experience"
                  type="number"
                  value={jobExp}
                  onChange={(e) => setJobExp(e.target.value)}
                  placeholder="e.g., 3"
                  max={50}
                  min={0}
                  className="w-full px-4 py-2 bg-[#1f1e24] border border-[#3a3a3d] rounded-md text-gray-200 focus:ring-2 focus:ring-[#6556cd] outline-none"
                  required
                />
              </div>

              <div className="mt-4 flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#6556cd] text-gray-200 font-semibold rounded-md hover:bg-[#4e45b5] transition"
                >
                  {loading ? "Processing..." : "Start Interview"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 bg-[#3a3a3d] text-gray-200 font-semibold rounded-md hover:bg-[#2f2f34] transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default AddNewInterview;
