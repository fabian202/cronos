import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import indexRoutes from './routes'

const app = express();

// app.get('/', (req, res) => {
//   res.send('Hellor world...');
// });
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

//Body parser
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/api', indexRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

//Mongoose
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

app.listen(process.env.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    // console.log(`Server listen on port ${process.env.PORT}`);
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  }
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  console.log(`Mongoose conectado y el server arriba ${process.env.PORT}`);
});