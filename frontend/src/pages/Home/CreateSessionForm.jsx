import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

const CreateSessionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    if (!formData.role || !formData.experience) {
      toast.error('Role and Experience are required.');
      return;
    }

    try {
      setIsLoading(true);

      // Step 1: Generate AI questions
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: formData.role,
        experience: formData.experience,
        topicsToFocus: formData.topicsToFocus,
        numberOfQuestions: 10,
      });

      // Use the AI response directly (should be an array of { question, answer })
      const generatedQuestions = Array.isArray(aiResponse.data.questions) ? aiResponse.data.questions : [];

      // Step 2: Create session with questions
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        toast.success('Session created successfully!');
        onSuccess && onSuccess();
        navigate(`/interview-prep/${response.data.session._id}`);
      } else {
        toast.error('Low LLM Response. Please wait, we are generating interview questions for you...');

      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to create session.');
      } else {
        setError('Failed to create session. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Interview Session</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleCreateSession} className="space-y-4">
        {/* Role */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Frontend Developer"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Experience</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., 2 Years"
            value={formData.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            required
          />
        </div>

        {/* Topics to Focus */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Topics to Focus</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., React, JavaScript, CSS"
            value={formData.topicsToFocus}
            onChange={(e) => handleChange('topicsToFocus', e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Brief description about the session"
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {isLoading ? 'Creating...' : 'Create Session'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;