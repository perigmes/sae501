import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import materielData from './assets/bdd/matériel.materiel.json';
import { setObjects } from './features/demande/demandeSlice';
import ListObjects from './pages/ListObjects';
import MainHeader from './components/MainHeader';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/styles/commun.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setObjects(materielData));
  }, [dispatch]);
  
  
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <MainHeader/>
          <Routes>
            <Route path="/" element={<ListObjects />} />
            <Route path="/list-objects" element={<ListObjects />} />
          </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;