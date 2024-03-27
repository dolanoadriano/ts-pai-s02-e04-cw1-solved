import express from 'express';
import animals from './animals';

const api = express.Router();

api.use('/animals', animals);

export default api;
