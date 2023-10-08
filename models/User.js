const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    id: false,
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: Boolean,
      required: true,
      unique: true,
      validate: {
        validator: function(value) {
          // Regular expression to validate email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Please enter a valid email address'
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Friend',
        }
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

userSchema.virtual('friendCount ').get(function (){
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;
