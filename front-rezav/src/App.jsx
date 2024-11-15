// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import materielData from './assets/bdd/matériel.materiel.json';
import { setObjects } from './features/demande/demandeSlice';
import ObjectList from './components/objectList';
import './assets/styles/commun.scss';
import './assets/styles/card.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setObjects(materielData));
  }, [dispatch]);
  
  
  return (
    <main>
      <ObjectList/>
    </main>
  );
}

export default App;
