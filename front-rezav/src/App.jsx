// src/App.jsx
import React, { useEffect } from 'react';
import ObjectCard from './components/objectCard';
import { useDispatch, useSelector } from 'react-redux';
import materielData from './assets/bdd/matériel.materiel.json';
import { setObjects } from './features/demande/demandeSlice';
import { selectCategories, selectObjects, selectObjectsByCategory } from './features/demande/demandeSelector';

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
    "picture": "test.png",
    "description": "Un excellent boîtier photo.",
    "categorie": "Boitiers photo",
    "isLate": false,
    "state": "Libre"
  };
  const object2 = {
    "_id": {
      "$oid": "66e91f52a81b36504c2a5bb2"
    },
    "name": "Canon 1000 D",
    "picture": "test.png",
    "description": "Un excellent boîtier photo.",
    "categorie": "Boitiers photo",
    "isLate": false,
    "state": "Libre"
  };

  return (
    <div className="App">
      <ObjectCard object={object} />
      <ObjectCard object={object2} />

    </div>
  );
}

export default App;
