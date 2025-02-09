import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "../ui/button";
import { toast, ToastContainer } from "react-toastify";
import { chatSession } from "@/lib/Giminiai";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LuWebcam } from "react-icons/lu";

interface AnswerProps {
  currentindex: number;
  jsonMockResp: string;
  interviewId: string;
}

const Answer: React.FC<AnswerProps> = ({ currentindex, jsonMockResp, interviewId }) => {
  const [Useranser, setUseranser] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const parsedResp = jsonMockResp
    ? { questions: JSON.parse(jsonMockResp) }
    : { questions: [] };
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(currentindex);
  const [Loading, setIsLoading] = useState<boolean>(false);
  const [webcamOpen, setWebcamOpen] = useState<boolean>(false);

  const router = useRouter();
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const handleRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
      setWebcamOpen(true);
    }
  };

  useEffect(() => {
    if (results?.length > 0) {
      //@ts-ignore
      const newTranscript = results.map((res) => res.transcript).join(" ");
      setUseranser((prev) =>
        prev.includes(newTranscript) ? prev : prev + " " + newTranscript
      );
    }
  }, [results]);

  const Saveuser = async () => {
    if (isRecording) {
      stopSpeechToText();
    }

    if (Useranser.trim().length < 10) {
      toast.error("Error: Your answer is too short.");
      return;
    }

    setIsSaving(true);
    const question = parsedResp.questions[currentindex]?.question || "Unknown question";

    const feedbackPrompt = `
      Question: ${question},
      User's Answer: ${Useranser}.
      Provide feedback in JSON format: {"rating": <number>, "feedback": "<string>"}.
      Focus on specific areas of improvement in 3 to 5 lines.
    `;

    try {
      const chatResponse = await chatSession.sendMessage(feedbackPrompt);
      const rawFeedbackResp = await chatResponse.response.text();
      const feedbackResp = rawFeedbackResp
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\*\*.*?\*\*/g, "");
      const jsonFeedbackResp = JSON.parse(feedbackResp);
      const { rating, feedback } = jsonFeedbackResp;

      if (!rating || !feedback) {
        throw new Error("Incomplete feedback response");
      }

      const response = await axios.post(`/api/User`, {
        rating,
        mockId: interviewId,
        question,
        correctAnswer: parsedResp.questions[currentindex]?.answer || "Unknown answer",
        userAnswer: Useranser,
        email: user?.primaryEmailAddress?.emailAddress || "anonymous",
        feedback,
      });

      if (response) {
        toast.success("Answer saved successfully!");
        router.push(`/`);
      } else {
        toast.error("Error saving answer. Please try again.");
      }
      setUseranser("");
      setIsSaving(false);
    } catch (error: any) {
      toast.error(`Error saving answer: ${error.message || "Please check the console for details"}`);
      console.error("Error during save:", error);
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!isRecording && Useranser.length > 10) {
      UpdateUserAnswer();
    }
  }, [Useranser, isRecording]);

  const UpdateUserAnswer = async () => {
    setIsLoading(true);
    const question = parsedResp.questions[currentindex]?.question || "Unknown question";

    const feedbackPrompt = `
      Question: ${question},
      User's Answer: ${Useranser}.
      Provide feedback in JSON format: {"rating": <number>, "feedback": "<string>"}.
      Focus on specific areas of improvement in 3 to 5 lines.
    `;

    try {
      const chatResponse = await chatSession.sendMessage(feedbackPrompt);
      const rawFeedbackResp = await chatResponse.response.text();
      const feedbackResp = rawFeedbackResp
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\*\*.*?\*\*/g, "");
      const jsonFeedbackResp = JSON.parse(feedbackResp);
      const { rating, feedback } = jsonFeedbackResp;

      if (!rating || !feedback) {
        throw new Error("Incomplete feedback response");
      }

      const response = await axios.post(`/api/User`, {
        rating,
        mockId: interviewId,
        question,
        correctAnswer: parsedResp.questions[selectedQuestionIndex]?.answer || "Unknown answer",
        userAnswer: Useranser,
        email: user?.primaryEmailAddress?.emailAddress || "anonymous",
        feedback,
      });

      if (response) {
        toast.success("Answer saved successfully!");
        setResults([]);
      }
      setResults([]);
      setUseranser("");
      setIsSaving(false);
    } catch (error) {
      console.error("Error during update:", error);
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12">
      <div className="flex flex-col items-center space-y-8">
        {/* Webcam Section */}
        <div className="bg-[#333] p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-300">
            Webcam Preview
          </h2>
          <div className="bg-[#222] p-4 rounded-lg shadow-md">
            {!webcamOpen ? (
              <div className="flex justify-center items-center">
                <LuWebcam className="text-6xl text-gray-500 animate-pulse" />
              </div>
            ) : (
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={{
                  facingMode: "user",
                }}
                className="rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Recording Section */}
        <div className="space-y-6 text-center">
          <h2 className="text-xl font-medium text-gray-300">
            {isRecording ? "Recording... Speak now!" : "Ready to record"}
          </h2>
          <Button
            className={`px-8 py-3 rounded-full font-medium transition duration-300 ${
              isRecording
                ? "bg-white text-black border-2 border-red-600 hover:bg-gray-100 hover:border-red-700"
                : "bg-white text-black border-2 border-green-600 hover:bg-gray-100 hover:border-green-700"
            } shadow-md hover:shadow-lg transform hover:scale-105`}
            onClick={handleRecording}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-center mt-6 text-lg">
          Error: {error || "Speech-to-text not supported"}
        </p>
      )}

      <ToastContainer />
    </div>
  );
};

export default Answer;
