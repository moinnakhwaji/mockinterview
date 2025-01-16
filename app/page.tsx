import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const HomePage = () => {
  return (
    <>
   
      <div className="bg-[#1f1e24] text-white min-h-screen flex flex-col justify-between">
        {/* Hero Section */}
        <div className="relative flex items-center justify-center text-center py-32 bg-gradient-to-r from-[#6556cd] to-[#5346b1]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 px-6 sm:px-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Ace Your Next Interview with Personalized Mock Sessions
            </h1>
            <p className="text-lg text-[#d1d1d1] mb-6 max-w-lg mx-auto">
              Prepare like a pro. Get real-time feedback and improve your interview skills for the job you want.
            </p>
            <Link href="/dashboard">
              <Button className="bg-[#6556cd] text-white hover:bg-[#5346b1] px-6 py-3 rounded-full transition-all ease-in-out duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-6 md:px-12">
          <h2 className="text-3xl font-semibold text-center text-[#6556cd] mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center bg-[#2e2e38] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#6556cd] mb-4">Personalized Mock Interviews</h3>
              <p className="text-[#d1d1d1]">
                Tailor your mock interview experience with custom job roles and difficulty levels.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center bg-[#2e2e38] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#6556cd] mb-4">Real-Time Feedback</h3>
              <p className="text-[#d1d1d1]">
                Receive valuable feedback right after the mock interview to help you improve.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center bg-[#2e2e38] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#6556cd] mb-4">Flexible Scheduling</h3>
              <p className="text-[#d1d1d1]">
                Schedule interviews at your convenience to match your busy life.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-[#2e2e38] py-16 px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold text-[#6556cd] mb-8">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-[#3a3a44] p-6 rounded-lg shadow-md max-w-md">
              <p className="text-[#d1d1d1] mb-4">
                &quot;I landed my dream job thanks to this platform! The mock interviews felt just like the real thing.&quot;
              </p>
              <span className="block text-[#6556cd] font-semibold">John Doe</span>
              <span className="text-[#d1d1d1]">Software Engineer</span>
            </div>
            <div className="bg-[#3a3a44] p-6 rounded-lg shadow-md max-w-md">
              <p className="text-[#d1d1d1] mb-4">
                &quot;The feedback I received was invaluable. It helped me pinpoint my weaknesses and improve quickly.&quot;
              </p>
              <span className="block text-[#6556cd] font-semibold">Jane Smith</span>
              <span className="text-[#d1d1d1]">Data Scientist</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-[#1f1e24] py-8 text-center text-sm text-[#d1d1d1]">
        <p>&copy; 2025 Mock Interview Application. All Rights Reserved. Designed by Moin.</p>

          <div className="mt-4 flex justify-center gap-6">
            <a
              href="https://github.com/moinnakhwaji"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#6556cd] transition-all duration-300"
            >
              <FaGithub size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/moin-nakhwaji-8353b72aa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#6556cd] transition-all duration-300"
            >
              <FaLinkedin size={20} />
              LinkedIn
            </a>
            <a
              href="mailto:moinnakhwaji@gmail.com"
              className="flex items-center gap-2 hover:text-[#6556cd] transition-all duration-300"
            >
              <FaEnvelope size={20} />
              Gmail
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
