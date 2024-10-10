// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import materielData from './assets/bdd/matériel.materiel.json';
import { setObjects } from './features/demande/demandeSlice';
import ObjectList from './components/objectList';
import './assets/styles/commun.css';
import './assets/styles/card.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setObjects(materielData));
  }, [dispatch]);
  
  
  return (
    <div className="App">
      <ObjectList/>
    </div>
  );
}

export default App;
