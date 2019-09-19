import User from './User.model'
import bcrypt from 'bcrypt'
import 'dotenv/config';
import { createToken } from '../../services/auth'

export const authenticate = async (req, res, next) => {
 try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     console.log(user)
     if(user) {
         const { name, _id } = user;
    
         if(bcrypt.compareSync(password, user.password)) {
            const token = createToken(user);
            res.send({...token, name, email, _id });
         } else {
            res.status(400).json({ message: 'invalid' });
         }
     } else {
        res.status(400).json({ message: 'invalid' });
     }
    //  next();
 } catch (error) {
    res.status(400).json({ message: error.message });
    // next();
 }
}

export const create = async (req, res, next) => {
    const { 
        name,
        email,
        password,
        lastName
     } = req.body;


    const user = new User({
        name,
        password, 
        email,
        lastName
    });

    try {

        //Save the User
        const newUser = await user.save();

        res.send(201);
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
        next();
    }
}