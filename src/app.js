import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import api from './api';

dotenv.config();

const app = express();

const isDev = process.env.NODE_ENV === 'development';

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: !isDev,
    crossOriginResourcePolicy: !isDev,
    frameguard: !isDev,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;

const z = mongoose
  .connect(process.env.DB_URI, {
    connectTimeoutMS: 10000,
  })
  .then(() => console.log('DB Connected'))
  .catch((error) => console.error('DB Error', error));

const blogSchema = new mongoose.Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

const Blog = mongoose.model('blogs', blogSchema);

app.get('/', async (req, res) => {
  const x = await Blog.find();
  console.log(x);
  res.status(200).json({ name: 'Moje API' });
});

app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'success', timestamp: Date.now() });
});

app.use('/api', api);

app.listen(process.env.PORT || 5050, function () {
  const { port } = this.address();
  console.log(`Server listening on port: ${port}`);
  isDev && console.log(`http://localhost:${port}`);
});
