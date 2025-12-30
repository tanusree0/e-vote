const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Candidate = require('../models/Candidate');

router.get('/candidates', async (req, res) => {
  const list = await Candidate.find().select('-voteCount');
  res.json(list);
});

router.post('/cast', auth, async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user.id, hasVoted: false },
    { hasVoted: true }
  );

  if (!user) {
    return res.status(400).json({ error: "Already voted" });
  }

  await Candidate.findByIdAndUpdate(
    req.body.candidateId,
    { $inc: { voteCount: 1 } }
  );

  res.json({ slip: "VOTE-" + Date.now() });
});

module.exports = router;
