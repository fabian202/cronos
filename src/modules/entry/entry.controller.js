import Entry from './entry.model'
import { getTokenFromHeaders } from '../../services/auth'

export const get = async (req, res, next) => {
 try {
       //Get the user _id from the token
    const { _id } = getTokenFromHeaders(req);
    const date = new Date(req.query.date)
    let tomorrow = new Date(date);
    tomorrow.setDate(date.getDate()+1);
    const entries = await Entry.find({ 
        user: _id,
        createdAt: {
            $gte: date,
            $lte: tomorrow
        }
    }).populate('project');
    // const entries = await Entry.find({}).populate('user').populate('project');
    res.send(entries);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
}

export const getById = async (req, res, next) => {
    try {
        const entry = await Entry.findById(req.params.id);
        res.send(stage);
    } catch (error) {
       res.status(400).json({ message: error.message });
    }
   }

export const create = async (req, res, next) => {
      //Get the user _id from the token
    const { _id } = getTokenFromHeaders(req);
    const { 
        hours, comment, billable, project
     } = req.body;

    const entry = new Entry({
        hours, comment, billable, project, user: _id
    });

    try {
        const newEntry = await entry.save();
        res.send(201);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const put = async (req, res, next) => {
    try {
        const entry = await Entry.findOneAndUpdate(
            { _id: req.params.id },
            req.body
          );
          res.send(200);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

export const del = async (req, res, next) => {
    try {
        const entry = await Entry.findOneAndRemove({
            _id: req.params.id
        });
        res.send(204);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}