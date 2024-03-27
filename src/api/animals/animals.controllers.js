let animals = [
  { id: 1, kind: 'dog', name: 'Rocky' },
  { id: 2, kind: 'dog', name: 'Max' },
  { id: 3, kind: 'cat', name: 'Whiskers' },
];
let nextId = 4;

export const listAnimals = (req, res) => {
  const { params, body, query } = req;
  const { kind } = query;

  const filteredAnimals = animals.filter(
    (animal) => !kind || animal.kind === kind
  );

  res.status(200).json({ data: filteredAnimals });
};

export const retrieveAnimal = (req, res) => {
  const { params, body, query } = req;
  const { id } = params;

  const animal = animals.find((animal) => animal.id === Number(id)) || null;

  res.status(200).json({ data: animal });
};

export const createAnimal = (req, res) => {
  const { params, body, query } = req;

  const newAnimal = { ...body, id: nextId++ };
  animals = [...animals, newAnimal];

  res.status(201).json({ data: newAnimal });
};

export const updateAnimal = (req, res) => {
  const { params, body, query } = req;
  const { id } = params;

  const animalIndex = animals.findIndex((animal) => animal.id === Number(id));
  const newAnimal = { ...body, id };
  animals = animals.with(animalIndex, newAnimal);

  res.status(200).json({ data: newAnimal });
};

export const modifyAnimal = (req, res) => {
  const { params, body, query } = req;
  const { id } = params;

  const animalIdx = animals.findIndex((animal) => animal.id === Number(id));
  const oldAnimal = animals[animalIdx];
  const newAnimal = { ...oldAnimal, ...body };
  animals = animals.with(animalIdx, newAnimal);

  res.status(200).json({ data: newAnimal });
};

export const deleteAnimal = (req, res) => {
  const { params, body, query } = req;
  const { id } = params;

  animals = animals.filter((animal) => animal.id !== Number(id));
  res.status(204).json();
};
