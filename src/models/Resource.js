import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    fileUrl: {
      type: String,
      required: [true, 'file url required']
    },

    course: {
      type: String,
      required: [true, 'course is required']
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'uploader is required']
    }
  },

  { timestamps: true}
);

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;