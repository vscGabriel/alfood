/** @format */

import AdminRestaurantes from "components/AdminRestaurante";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import VitrineRestaurantes from "../pages/VitrineRestaurantes";
import FormularioPratos from "./../components/AdminRestaurante/components/index";

function RouterApp() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/Restaurantes' element={<VitrineRestaurantes />} />
			<Route path='/admin/Restaurantes' element={<AdminRestaurantes />} />
			<Route path='/admin/Pratos' element={<FormularioPratos />} />
		</Routes>
	);
}

export default RouterApp;
