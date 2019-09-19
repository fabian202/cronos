import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: String,
    //5d38d7893cf02524746ad990
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    active: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true },
);

export default mongoose.model('Project', ProjectSchema);