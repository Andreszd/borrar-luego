import { useEffect, useState } from 'react';
import { getAll, update, remove } from '../services/aulas';

export const useAulas = () => {
  const [aulas, setAulas] = useState([]);
  const [aula, setAula] = useState(null);

  useEffect(() => {
    getAll().then(setAulas);
  }, []);

  const updateAula = (id, body) => {
    const newAulas = aulas.map((aula) => (aula.id === id ? body : aula));
    setAulas(newAulas);
    update(body, id);
  };

  const removeAula = (id) => {
    const newAulas = aulas.filter((aula) => aula.id !== id);
    setAulas(newAulas);
    remove(id);
  };

  const focusAula = (aula) => {
    console.log(aula);
    setAula(aula);
  };

  return { aulas, updateAula, removeAula, focusAula, aula };
};

