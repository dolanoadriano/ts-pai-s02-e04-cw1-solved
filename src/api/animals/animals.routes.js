import express from 'express';
import {
  listAnimals,
  retrieveAnimal,
  createAnimal,
  updateAnimal,
  modifyAnimal,
  deleteAnimal,
} from './animals.controllers';

const animals = express.Router();

animals.get('/', listAnimals);
animals.get('/:id', retrieveAnimal);
animals.post('/', createAnimal);
animals.put('/:id', updateAnimal);
animals.patch('/:id', modifyAnimal);
animals.delete('/:id', deleteAnimal);

export default animals;
