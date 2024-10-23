const User = require('../models/user');

// Update Bio
exports.updateBio = async (req, res) => {
  const { bio } = req.body;
  try {
    await User.findByIdAndUpdate(req.user.id, { bio });
    res.json({ message: 'Bio updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};