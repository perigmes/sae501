// src/App.jsx
import React, { useEffect } from 'react';
import ObjectCard from './components/objectCard';
import { useDispatch } from 'react-redux';
import materielData from './assets/bdd/matériel.materiel.json';
import { setObjects } from './features/demande/demandeSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setObjects(materielData));
  }, [dispatch]);

  const object = {
    "_id": {
      "$oid": "66e91f52a81b36504c2a5aa2"
    },
    "name": "Canon 1000 D",
    "picture": "",
    "description": "Un excellent boîtier photo.",
    "categorie": "Boitiers photo",
    "isLate": false,
    "state": "Libre"
  };

  return (
    <div className="App">
      <ObjectCard object={object} />

    </div>
  );
}

export default App;
