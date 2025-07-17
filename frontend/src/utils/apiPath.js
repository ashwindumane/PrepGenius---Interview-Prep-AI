export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: `${BASE_URL}/api/auth/register`,           // Signup
    LOGIN: `${BASE_URL}/api/auth/login`,                 // Authenticate user & return JWT token
    GET_PROFILE: `${BASE_URL}/api/auth/profile`,         // Get user profile
  },

  IMAGE: {
    UPLOAD: `${BASE_URL}/api/auth/upload-image`,         // Upload image
  },

  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/api/ai/generate-questions`,   // Generate interview questions and answers
    GENERATE_EXPLANATION: `${BASE_URL}/api/ai/generate-explanation`, // Generate concept explanation
  },

  SESSION: {
    CREATE: `${BASE_URL}/api/sessions/create`,           // Create a new session
    GET_ALL: `${BASE_URL}/api/sessions/my-sessions`,     // Get all user sessions
    GET_ONE: (id) => `${BASE_URL}/api/sessions/${id}`,   // Get session by ID
    DELETE: (id) => `${BASE_URL}/api/sessions/${id}`,    // Delete a session
  },

  QUESTION: {
    ADD_TO_SESSION: `${BASE_URL}/api/questions/add`,     // Add question to session
    PIN: (id) => `${BASE_URL}/api/questions/${id}/pin`,  // Pin or unpin question
    UPDATE_NOTE: (id) => `${BASE_URL}/api/questions/${id}/note`, // Update question note
  },
};
