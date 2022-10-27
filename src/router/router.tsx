import AdminRestaurantes from 'components/AdminRestaurante';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import VitrineRestaurantes from '../pages/VitrineRestaurantes';
import FormularioRestaurante from './../components/AdminRestaurante/components/index';

function RouterApp() {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
    </Routes>
  );
}

export default RouterApp;
