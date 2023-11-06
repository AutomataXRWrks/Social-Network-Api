const { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
    // Updates and user using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  // Deletes an application from the database. Looks for an app by ID.
  // Then if the app exists, we look for any users associated with the app based on he app ID and update the applications array for the User.
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({
          message: 'User created but no user with this id!',
        });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {$push: {friends: req.params.friendId}});

      if (!user) {
        return res.status(404).json({
          message: 'Friend created in this id!',
        });
      }

      res.json({ message: 'Friend successfully created!' });
    } catch (err) {
      res.status(500).json(err);
    }
  }


};
