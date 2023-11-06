const { Thought, User, reactionSchema } = require('../models');

module.exports = {

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtsId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThoughts(req, res) {
    try {
      const user = await Thought.create(req.body);
      const thought = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: {thoughts: user._id}},
        { runValidators: true, new: true });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtsId });

      if (!thought) {
        return res.status(404).json({
          message: 'Thought created but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        {$push: {reactions: req.body}});
      if (!thought) {
        return res.status(404).json({
          message: 'Reaction created but no user with this id!',
        });
      }

      res.json({ message: 'Reaction successfully created!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async deleteReaction(req, res) {
    try {
      const thought = await User.findByIdAndUpdate(req.params.thoughtsId, {$pull: {reactions: reactionSchema}});

      if (!thought) {
        return res.status(404).json({
          message: 'Reaction deleted in this id!',
        });
      }

      res.json({ message: 'Reaction successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  }


};
