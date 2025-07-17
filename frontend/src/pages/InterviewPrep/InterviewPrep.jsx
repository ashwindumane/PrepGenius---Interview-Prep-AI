import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LuCircleAlert, LuListCollapse, LuLoader } from 'react-icons/lu';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import RoleInfoHeader from './components/RoleInfoHeader';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import QuestionCard from '../../components/Cards/QuestionCard';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Loaders/Drawer';

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data?.session) {
        setSessionData(response.data.session);
        setErrorMsg('');
      } else {
        setErrorMsg('Session not found');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load session data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg('');
      setExplanation(null);
      setOpenLearnMoreDrawer(true);
      setIsLoading(true);
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
      if (response.data?.explanation) {
        setExplanation(response.data);
      } else {
        setErrorMsg('Failed to generate explanation');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Error generating explanation');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      if (response.data?.pinned !== undefined) {
        toast.success('Question pin status updated');
        fetchSessionDetailsById();
      } else {
        toast.error('Failed to update pin status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating pin status');
    }
  };

  const updateMoreQuestions = async () => {
  try {
    setIsGeneratingMore(true);

    const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
      role: sessionData.role,
      experience: sessionData.experience,
      topicsToFocus: sessionData.topicsToFocus,
      numberOfQuestions: 5,
      previousQuestions: sessionData.questions.map(q => q.question)
    });

    // Handle non-array responses
    if (!Array.isArray(aiResponse.data?.questions)) {
      throw new Error('Invalid response format from AI service');
    }

    const generatedQuestions = aiResponse.data.questions;

    const formattedQuestions = generatedQuestions.map((q) => ({
      question: q.question,
      answer: q.answer || "**Explanation will be generated when you click 'Learn More'**"
    }));

    const addRes = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
      sessionId,
      questions: formattedQuestions,
    });

    if (addRes.data?.questions) {
      toast.success(`Added ${formattedQuestions.length} new questions!`);
      await fetchSessionDetailsById();
    } else {
      throw new Error('Failed to update session with new questions');
    }
  } catch (error) {
    console.error('Error generating more questions:', error);
    
    let errorMessage = error.message;
    if (error.response) {
      // Handle backend error responses
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
    }
    
    toast.error(`Error: ${errorMessage}`);
  } finally {
    setIsGeneratingMore(false);
  }
};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <LuLoader className="animate-spin text-3xl text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (errorMsg) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center">
            <LuCircleAlert className="mr-2 text-xl" />
            {errorMsg}
          </div>
          <button
            onClick={fetchSessionDetailsById}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <RoleInfoHeader
          role={sessionData.role}
          topicsToFocus={sessionData.topicsToFocus}
          experience={sessionData.experience}
          questions={sessionData.questions}
          description={sessionData.description}
          lastUpdated={sessionData.updatedAt}
        />

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Interview Questions</h2>
            <button
              onClick={updateMoreQuestions}
              disabled={isGeneratingMore}
              className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center ${
                isGeneratingMore ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isGeneratingMore ? (
                <>
                  <LuLoader className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <LuListCollapse className="mr-2" />
                  Generate More Questions
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            <div className="space-y-4">
              {sessionData.questions?.length > 0 ? (
                sessionData.questions.map((question, index) => (
                  <motion.div
                    key={question._id || `question-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      delay: index * 0.05,
                    }}
                    layout
                  >
                    <QuestionCard
                      question={question.question}
                      answer={question.answer}
                      isPinned={question.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(question._id)}
                      onLearnMore={() => generateConceptExplanation(question.question)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <LuCircleAlert className="mx-auto text-3xl mb-2" />
                  <p>No questions generated yet</p>
                  <button
                    onClick={updateMoreQuestions}
                    disabled={isGeneratingMore}
                    className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                      isGeneratingMore ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isGeneratingMore ? 'Generating...' : 'Generate Questions'}
                  </button>
                </div>
              )}
            </div>
          </AnimatePresence>
        </div>

        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          <div className="max-h-[80vh] overflow-y-auto">
            {errorMsg && (
              <p className="flex items-center text-red-600">
                <LuCircleAlert className="mr-2" />
                {errorMsg}
              </p>
            )}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </div>
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
