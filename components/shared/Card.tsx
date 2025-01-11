import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface CardProps {
  jobPosition: string;
  jobExp: number;
  createdAt: string;
  interviewid: any;
}

const Card: React.FC<CardProps> = ({ jobPosition, jobExp, createdAt, interviewid }) => {
  return (
    <div className="bg-[#2e2e38] p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-bold text-[#6556cd] mb-2">Job Position: {jobPosition}</h2>
      <p className="text-sm text-[#d1d1d1] mb-2"><strong>Experience Required:</strong> {jobExp} years</p>
      <p className="text-sm text-[#d1d1d1] mb-4"><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>

      <div className="flex space-x-6 mt-4">
        <Link href={`/dashboard/interview/${interviewid}/start`}>
          <Button className="bg-[#6556cd] text-white hover:bg-[#5346b1] transition-colors duration-200 w-full py-3">Start</Button>
        </Link>

        <Link href={`/dashboard/interview/${interviewid}/feedback`}>
          <Button className="bg-[#555555] text-white hover:bg-[#444444] transition-colors duration-200 w-full py-3">Feedback</Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
