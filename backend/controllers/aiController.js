const { GoogleGenerativeAI } = require("@google/generative-ai");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc Generate interview questions and answers using Gemini
// @route POST /api/ai/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role,experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role||! experience||! topicsToFocus||! numberOfQuestions) {
      return res.status(400).json({ message: "Missing  required fields" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = questionAnswerPrompt (role, experience, topicsToFocus, numberOfQuestions) ;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanedText=text.replace(/^```json\s*/,"").replace(/```$/,"").trim();
    const data=JSON.parse(cleanedText);

    res.status(200).json({ questions: data }); // where data is an array of { question, answer }
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc Generate explanation for a technical concept
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Fix: Use 'question' instead of undefined 'concept'
    const prompt = conceptExplainPrompt(question);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    const data = JSON.parse(cleanedText);

    res.status(200).json(data); // where data is an array of { question, answer }
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message,
    });
  }
};


module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
