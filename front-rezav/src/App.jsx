import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListObjects from './pages/ListObjects';
import MainHeader from './components/MainHeader';
import { Formulaire } from './pages/Formulaire';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/styles/commun.scss';
import './assets/styles/card.scss';
import { loadMateriel } from './features/demande/reservationsAsyncAction';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMateriel());
  }, [dispatch]);

  return (
    <main>
      <BrowserRouter>
      <MainHeader/>
        <Routes>
          <Route path="/" element={<ListObjects />} />
          <Route path="/list-objects" element={<ListObjects />} />
          <Route path="/formulaire-reservation" element={<Formulaire />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;