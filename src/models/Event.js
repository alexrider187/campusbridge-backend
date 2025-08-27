import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Please add a date']
    },

    location: {
      type: String,
      required: [true, 'Please enter your location']
    },

    description: {
      type: String,
      required: [true, 'please enter a description' ]
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },

  {timestamps: true}
);

const Event = mongoose.model('Event', eventSchema);

export default Event;