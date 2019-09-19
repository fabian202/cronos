import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'
const saltRounds = 10;

const UserSchema = new Schema({
  name: {
   type: String,
   trim: true,  
   required: true,
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,  
    required: true,
  },
  password: {
   type: String,
   trim: true,
   required: true
  },
   active: {
     type: Boolean,
     default: true
   }
 });

// hash user password before saving into database
UserSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

export default mongoose.model('User', UserSchema);