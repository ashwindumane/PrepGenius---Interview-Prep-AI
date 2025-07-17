import React, { useState, useContext } from 'react';
import image2 from "../assets/image2.jpg";
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { APP_FEATURES } from '../utils/data';
import Modal from '../components/Modal'; 
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className='w-full min-h-screen bg-[#F0F4FF] relative'>
        {/* Background Blur Effect */}
        <div className='w-[500px] h-[500px] bg-blue-200/20 blur-[65px] absolute top-0 left-0'></div>

        {/* Main Content */}
        <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
          {/* Header */}
          <header className='flex justify-between items-center mb-16'>
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-text-glow cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              PrepGenius
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className='bg-gradient-to-r from-[#4F46E5] to-[#9333EA] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer'
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className='flex flex-col md:flex-row items-center'>
            {/* Left Content */}
            <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
              <div className='flex items-center gap-2 text-[13px] text-indigo-700 font-semibold bg-indigo-100 px-3 py-1 rounded-full border border-indigo-300 mb-2 w-max'>
                <LuSparkles />
                AI powered
              </div>

              <h1 className='text-5xl text-gray-900 font-medium mb-6 leading-tight'>
                Ace Interview with <br />
                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,#4F46E5_0%,#9333EA_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right Content */}
            <div className='w-full md:w-1/2'>
              <p className='text-[17px] text-gray-800 mb-6'>
                Get personalized interview preparation with questions and model answers tailored to your specific role, experience level, and focus areas. Whether you're preparing for a frontend, backend, full-stack, or data-related position, our AI dynamically generates questions that match your expertise and career stage—helping you focus on what truly matters for your next opportunity.
              </p>

              <button
                className="bg-[#4F46E5] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <section className="flex items-center justify-center -mt-36 relative z-10">
          <img
            src={image2}
            alt="AI Interview Assistant illustration"
            className='w-[80vw] max-h-[80vh] rounded-lg shadow-lg object-contain'
          />
        </section>

        {/* Features Section */}
        <div className='w-full min-h-full bg-gradient-to-b from-[#F0F4FF] to-[#E0E7FF] mt-10'>
          <div className='container mx-auto px-4 pt-10 pb-20'>
            <section className='mt-5'>
              <h2 className='text-2xl font-medium text-center text-gray-900 mb-12'>Features that make you Shine</h2>
              <div className='flex flex-col items-center gap-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div 
                      key={feature.id}
                      className='bg-white p-6 rounded-xl shadow-xs hover:shadow-lg shadow-indigo-100 transition border border-indigo-100'
                    >
                      <h3 className='text-base font-semibold mb-3 text-indigo-800'>{feature.title}</h3>
                      <p className='text-gray-600'>{feature.description}</p>
                    </div>
                  ))}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div 
                      key={feature.id}
                      className='bg-white p-6 rounded-xl shadow-xs hover:shadow-lg shadow-indigo-100 transition border border-indigo-100'
                    >
                      <h3 className='text-base font-semibold mb-3 text-indigo-800'>{feature.title}</h3>
                      <p className='text-gray-600'>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5 flex flex-col items-center gap-2'>
          <div>Designed & Developed by <span className="font-semibold">Ashwin Dumane</span></div>
          <div className="flex gap-4 justify-center text-xl text-gray-600">
            <a href="https://github.com/ashwindumane   " target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaGithub />
            </a>
            <a href="https://www.instagram.com/ashwin_kshatriya_/ " target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/ashwindumane/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </footer>
      </div>

      <Modal 
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className='relative'>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
