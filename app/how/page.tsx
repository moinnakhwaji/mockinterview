"use client"
import { FaClipboardList, FaPlayCircle, FaCommentDots, FaThumbsUp, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'; // Importing icons
import { motion } from 'framer-motion'; // Adding animations
import Header from '@/components/shared/Header';


const HowItWorks = () => {
  return (
    <>
   <Header/>
    <div className="bg-[#1f1e24] text-white min-h-screen">
      {/* Title Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl font-semibold text-[#6556cd] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            How Our Mock Interview Platform Works
          </motion.h1>
          <motion.p
            className="text-lg text-[#d1d1d1] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Our goal is to help you prepare for interviews effectively. Here’s how you can get started and improve your skills.
          </motion.p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Step 1 */}
          <motion.div
            className="bg-[#2e2e38] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="flex justify-center mb-6">
              <FaClipboardList size={50} className="text-[#6556cd]" />
            </div>
            <h2 className="text-xl font-semibold text-[#6556cd] mb-3">Step 1: Choose a Role</h2>
            <p className="text-[#d1d1d1]">
              Pick the job role you are preparing for. We offer a wide range of roles to help you practice real-life interview scenarios.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="bg-[#2e2e38] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="flex justify-center mb-6">
              <FaPlayCircle size={50} className="text-[#6556cd]" />
            </div>
            <h2 className="text-xl font-semibold text-[#6556cd] mb-3">Step 2: Start the Mock Interview</h2>
            <p className="text-[#d1d1d1]">
              Engage in a mock interview with tailored questions that simulate real interview experiences.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="bg-[#2e2e38] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <div className="flex justify-center mb-6">
              <FaCommentDots size={50} className="text-[#6556cd]" />
            </div>
            <h2 className="text-xl font-semibold text-[#6556cd] mb-3">Step 3: Get Feedback</h2>
            <p className="text-[#d1d1d1]">
              Receive personalized feedback on your answers, highlighting strengths and areas for improvement.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            className="bg-[#2e2e38] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <div className="flex justify-center mb-6">
              <FaThumbsUp size={50} className="text-[#6556cd]" />
            </div>
            <h2 className="text-xl font-semibold text-[#6556cd] mb-3">Step 4: Improve & Reattempt</h2>
            <p className="text-[#d1d1d1]">
              Use the feedback to refine your responses and reattempt the mock interview to boost your confidence.
            </p>
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-lg text-[#d1d1d1] mb-4">
            Ready to start your mock interview journey? Choose a role and get started today!
          </p>
          <a
            href="/dashboard"
            className="inline-block px-8 py-4 bg-[#6556cd] text-white rounded-lg text-xl hover:bg-[#5346b1] transition-colors duration-200"
          >
            Get Started
          </a>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#1f1e24] py-12 text-center text-sm text-[#d1d1d1]">
        <div className="mb-4">
          <p>&copy; 2025 Mock Interview Platform. All Rights Reserved.</p>
        </div>
        <div className="mt-6 flex justify-center gap-6">
          <a
            href="https://github.com/moinnakhwaji"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#6556cd] transition-all duration-300"
          >
            <FaGithub size={24} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/moin-nakhwaji-8353b72aa/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#6556cd] transition-all duration-300"
          >
            <FaLinkedin size={24} />
            LinkedIn
          </a>
          <a
            href="mailto:moinnakhwaji@gmail.com"
            className="flex items-center gap-2 hover:text-[#6556cd] transition-all duration-300"
          >
            <FaEnvelope size={24} />
            Gmail
          </a>
        </div>
      </footer>
    </div>
    </>
  );
};

export default HowItWorks;

