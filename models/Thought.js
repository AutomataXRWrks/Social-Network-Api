const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const toughtSchema = new Schema(
  {
    toughtText: {
      type: String,
      unique: true,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
      username: {
        type: String,
        required: true,
      },
      reactions:[
        reactionSchema
      ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


toughtSchema.virtual('friendCount ').get(function (){
    return this.reactions.length;
});

const Thought = model('Thought', toughtSchema);

module.exports = Thought;
