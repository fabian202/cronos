import mongoose, { Schema } from 'mongoose';

const EntrySchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    hours: Number,
    comment: String,
    billable: Boolean,
    //5d38d7893cf02524746ad990
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' }
  },
  { timestamps: true },
);

export default mongoose.model('Entry',EntrySchema);