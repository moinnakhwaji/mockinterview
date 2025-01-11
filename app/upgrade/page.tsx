"use client"
import Header from '@/components/shared/Header';
import { FaLock } from 'react-icons/fa';

const SaasPackageUpdate = () => {
  // Simulating available packages
  const packages = [
    { 
      id: 1, 
      name: 'Basic', 
      price: '$19/month', 
      features: [
        '1-on-1 Mock Interviews with Experts', 
        'Access to Recorded Sessions', 
        'Basic Analytics and Feedback',
        'Email Support'
      ]
    },
    { 
      id: 2, 
      name: 'Pro', 
      price: '$49/month', 
      features: [
        '1-on-1 Mock Interviews with Experts', 
        'Access to Recorded Sessions', 
        'Detailed Analytics and Feedback',
        'Personalized Interview Recommendations', 
        'Priority Email Support',
        'Access to Interview Resources and Guides'
      ]
    },
    { 
      id: 3, 
      name: 'Enterprise', 
      price: '$99/month', 
      features: [
        'Unlimited Mock Interviews with Experts', 
        'Access to Recorded Sessions',
        'Advanced Analytics and Performance Reports',
        'Personalized Interview Coaching',
        'Priority 24/7 Support',
        'Access to Custom Interview Question Bank', 
        'Team Collaboration Features', 
        'Integration with Calendar and Scheduling Tools'
      ]
    },
  ];
  

  // The package that the user is currently using
  const currentPackage = packages[1]; // Assume the user is on the Pro package

  // Message when the update button is disabled
  const disabledMessage = "Currently working on this feature. Please check back later.";

  return (
    <>
    <Header/>
    <div className="bg-[#1f1e24] text-white min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#6556cd]">Choose Your Plan</h1>
          <p className="text-lg text-[#d1d1d1] max-w-2xl mx-auto mt-4">Browse available plans and features. The update feature is currently under development.</p>
        </div>

        {/* Available Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-[#2e2e38] p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-[#6556cd] mb-4">{pkg.name}</h2>
              <p className="text-xl text-[#d1d1d1] mb-4">{pkg.price}</p>
              <p className="text-sm text-[#d1d1d1] mb-4">Features:</p>
              <ul className="text-sm text-[#d1d1d1] mb-4">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="mb-2">{feature}</li>
                ))}
              </ul>

              {currentPackage.id === pkg.id ? (
                <button
                  disabled
                  className="w-full px-6 py-3 mt-4 rounded-lg bg-[#555555] text-[#d1d1d1] cursor-not-allowed"
                >
                  <FaLock className="inline mr-2" />
                  {disabledMessage}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full px-6 py-3 mt-4 rounded-lg bg-[#555555] text-[#d1d1d1] cursor-not-allowed"
                >
                  <FaLock className="inline mr-2" />
                  {disabledMessage}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* The footer or additional info */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#d1d1d1]">{disabledMessage}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default SaasPackageUpdate;
