import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a tittle'],
    },

    content: {
      type: String,
      required: [true, 'Please provide a content'],
    },

    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },

  {timestamps: true}
);

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;