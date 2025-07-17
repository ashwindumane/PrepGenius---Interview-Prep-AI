const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
  return res.status(400).json({ message: "Invalid input data" });
}
const session = await Session.findById(sessionId);
     if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const createQuestions = await Question.insertMany(
      questions.map((q) => ({ session: session._id,question:q.question,
        answer:q.answer,
       }))
    );

    session.questions.push(...createQuestions.map((q) => q._id));
    await session.save();

    res.status(200).json({
      message: "Questions added successfully",
      questions: createQuestions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Pin or unpin a question
// @route   POST /api/questions/:id/pin
// @access  Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
     
    const session = await Session.findById(question.session);
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    question.pinned = !question.pinned;
    await question.save();

    res.status(200).json({
      message: `Question ${question.pinned ? "pinned" : "unpinned"}`,
      pinned: question.pinned,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a note for a question
// @route   POST /api/questions/:id/note
// @access  Private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const session = await Session.findById(question.session);
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    question.note = note||"";
    await question.save();

    res.status(200).json({ message: "Note updated", note: question.note });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
