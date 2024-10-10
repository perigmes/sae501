// src/App.jsx
import React, { useEffect } from 'react';
import ObjectCard from './components/objectCard';
import { useDispatch, useSelector } from 'react-redux';
import materielData from './assets/bdd/matériel.materiel.json';
import { setObjects } from './features/demande/demandeSlice';
import { selectCategories, selectObjects, selectObjectsByCategory } from './features/demande/demandeSelector';
import ObjectsByCategory from './components/objectsByCategory';
import ObjectList from './components/objectList';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setObjects(materielData));
  }, [dispatch]);
  
  
  const category = "Boitiers photo"

  return (
    <div className="App">
      <ObjectList/>
    </div>
  );
}

export default App;
