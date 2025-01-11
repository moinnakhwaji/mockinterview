"use client";

import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import axios from "axios";

interface FeedbackData {
  _id: string;
  email: string;
  question: string;
  correctAnswer: string;
  userAnswer?: string;
  rating?: number;
  feedback?: string;
  createdAt?: string;
  mockId?: any;
}

interface FeedbackProps {
  params: Promise<{ interviewid: string }>;
}

const Feedback: React.FC<FeedbackProps> = ({ params }) => {
  const [userData, setUserData] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const resolvedParams = await params; // Unwrap the params Promise
        const response = await axios.get(
          `/api/getjobs/${resolvedParams.interviewid}/feedback`
        );
        setUserData(response.data.users || []);
        console.log(response.data.users)
      } catch (err:any) {
        setError("Failed to fetch feedback data. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader border-t-4 border-green-500 rounded-full w-10 h-10 animate-spin"></div>
        <p className="ml-3 text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 px-4 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto">
      <h1 className="text-green-500 text-3xl capitalize font-bold text-center mb-4">
        Congratulations!
      </h1>
      <h2 className="text-2xl font-bold capitalize text-center mb-6">
        Here is your interview feedback
      </h2>
      <p className="text-lg text-gray-400 text-center mb-8">
        Find below the interview questions with correct answers:
      </p>

      {userData.length > 0 ? (
        userData.map((item, index) => (
          <Collapsible key={item._id} className="mb-4 border border-gray-700 rounded-lg">
            <CollapsibleTrigger
              className="font-medium text-lg text-left p-4 bg-gray-800 hover:bg-gray-700 transition-all rounded-t-lg"
              aria-expanded="false"
            >
              {`Q${index + 1}: ${item.question}`}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-gray-900 rounded-b-lg text-gray-300">
              <p className="mb-2">
                <strong>Correct Answer:</strong> {item.correctAnswer}
              </p>
              {item.userAnswer && (
                <p className="mb-2">
                  <strong>Your Answer:</strong> {item.userAnswer}
                </p>
              )}
              {item.feedback && (
                <p>
                  <strong>Feedback:</strong> {item.feedback}
                </p>
              )}
              {
                item.rating && (
                  <p>
                    <strong>rating:</strong>{item?.rating}
                  </p>
                )
              }
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No feedback data available.
        </p>
      )}
    </div>
  );
};

export default Feedback;
