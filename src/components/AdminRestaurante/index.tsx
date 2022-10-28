/** @format */
import * as React from "react";

import IRestaurante from "./../../interfaces/IRestaurante";
import { useState, useEffect } from "react";
import {
	Button,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import NavAdm from "./components/components";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	height: 100,
	bgcolor: "white",
	border: "1px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function AdminRestaurantes() {
	const [restaurante, setRestaurante] = useState<IRestaurante[]>([]);
	const [openEdit, setOpenEdit] = useState(false);
	const [openNovo, setOpenNovo] = useState(false);

	const [nomeRestaurante, setNomeRestaurante] = useState("");

	const submitionForm = () => {
		axios
			.post("http://localhost:8000/api/v2/restaurantes/", {
				nome: nomeRestaurante,
			})
			.then(() => {
				toast.success("Cadastrado com sucesso");

				setOpenNovo(!openNovo);
			});
	};

	const submitionEdit = (idRest: number) => {
		axios
			.put(`http://localhost:8000/api/v2/restaurantes/${idRest}/`, {
				nome: nomeRestaurante,
			})
			.then(() => {
				toast("Alterado com sucesso");
				setOpenEdit(!openEdit);
			});
	};

	const del = (restDel: IRestaurante) => {
		axios
			.delete(`http://localhost:8000/api/v2/restaurantes/${restDel.id}/`)
			.then(() => {
				const listRest = restaurante.filter((el) => el.id !== restDel.id);

				setRestaurante(listRest);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/v2/restaurantes/")
			.then((response) => setRestaurante(response.data));
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/v2/restaurantes/")
			.then((response) => setRestaurante(response.data));
	}, [openEdit, openNovo]);

	return (
		<>
			<NavAdm />
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell>Editar</TableCell>
							<TableCell>Excluir</TableCell>
							<TableCell>
								<Button
									variant='outlined'
									onClick={() => setOpenNovo(!openNovo)}>
									Novo
								</Button>
								<Modal
									open={openNovo}
									onClose={() => setOpenNovo(!openNovo)}
									aria-labelledby='modal-modal-title'
									aria-describedby='modal-modal-description'>
									<Box sx={style}>
										<form>
											<TextField
												fullWidth
												value={nomeRestaurante}
												onChange={(element) =>
													setNomeRestaurante(element.target.value)
												}
												id='standard-basic'
												label='Nome restaurante'
												variant='standard'
												required
											/>
											<Box sx={{ my: 2 }}>
												<Button
													sx={{ mx: 2 }}
													variant='outlined'
													onClick={submitionForm}>
													Salvar
												</Button>
												<Button
													sx={{ mx: 2 }}
													color='error'
													variant='outlined'
													onClick={() => setOpenNovo(!openNovo)}>
													Cancelar
												</Button>
											</Box>
										</form>
									</Box>
								</Modal>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{restaurante.map((element) => (
							<TableRow key={element.id}>
								<TableCell>{element.nome}</TableCell>
								<TableCell>
									<Button
										variant='outlined'
										onClick={() => setOpenEdit(!openEdit)}>
										Editar
									</Button>
									<Modal
										open={openEdit}
										onClose={() => setOpenEdit(!openEdit)}
										aria-labelledby='modal-modal-title'
										aria-describedby='modal-modal-description'>
										<Box sx={style}>
											<form>
												<TextField
													value={nomeRestaurante}
													onChange={(element) =>
														setNomeRestaurante(element.target.value)
													}
													id='standard-basic'
													label='Nome Restaurante'
													variant='standard'
													required
												/>
												<Button
													variant='outlined'
													onClick={() => submitionEdit(element.id)}>
													Salvar
												</Button>
												<Button
													sx={{ mx: 2 }}
													color='error'
													variant='outlined'
													onClick={() => setOpenEdit(!openEdit)}>
													Cancelar
												</Button>
											</form>
										</Box>
									</Modal>
								</TableCell>
								<TableCell>
									<Button
										variant='outlined'
										color='error'
										onClick={() => del(element)}>
										Deletar
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
