import React from "react";

// Define the type for each question
interface Question {
  question: string;
  answer: string;
}

// Define the props for Questionpage
interface QuestionPageProps {
  jsonMockResp: string | { questions: Question[] }; // It could be a JSON string or an object with questions
  currentindex: number;
  onIndexChange: (index: number) => void;
}

const Questionpage: React.FC<QuestionPageProps> = ({
  jsonMockResp,
  currentindex,
  onIndexChange,
}) => {
  let parsedResp: { questions: Question[] } = { questions: [] };

  if (typeof jsonMockResp === "string") {
    try {
      parsedResp = JSON.parse(jsonMockResp);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  } else {
    parsedResp = jsonMockResp;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-6">
      {/* Top Section: Question Buttons */}
      <div className="flex justify-center space-x-4 overflow-x-auto scrollbar-hide mb-8">
        {parsedResp.questions && parsedResp.questions.length > 0 ? (
          parsedResp.questions.map((item, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`px-6 py-2 text-sm sm:text-base rounded-lg font-medium transition-all duration-300 ease-in-out ${
                currentindex === index
                  ? "bg-gray-700 text-white shadow-md scale-105 border border-gray-500"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {`Q${index + 1}`}
            </button>
          ))
        ) : (
          <p className="text-gray-400">No questions available.</p>
        )}
      </div>

      {/* Bottom Section: Selected Question Details */}
      <div className="flex justify-center items-center flex-grow">
        <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-400">
            {`Question #${currentindex + 1}`}
          </h3>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            {parsedResp.questions[currentindex]?.question || "No question found."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questionpage;
