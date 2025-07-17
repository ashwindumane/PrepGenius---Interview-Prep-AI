const Session = require('../models/Session');
const Question = require('../models/Question');

// @desc    Create a new session and link questions
// @route   POST /api/sessions/create
// @access  Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;

    const session = await Session.create({
      user: req.user._id,
      role,
      experience,
      topicsToFocus,
      description,
    });

    // Create each question and link it to this session
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const createdQuestion = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer
        });
        return createdQuestion._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({
      success: true,
      message: 'Session created successfully',
      session,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get all sessions for the logged-in user
// @route   GET /api/sessions/my-sessions
// @access  Private
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('questions');

    res.json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get a session by ID with populated questions
// @route   GET /api/sessions/:id
// @access  Private
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('questions')
      .exec();

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a session and its questions
// @route   DELETE /api/sessions/:id
// @access  Private
  exports.deleteSession = async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);

      if (!session) {
        return res.status(404).json({ success: false, message: 'Session not found' });
      }

      if (session.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized' });
      }

      await Question.deleteMany({ session: session._id });
      await session.deleteOne();

      res.status(200).json({ success: true, message: 'Session and related questions deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };
