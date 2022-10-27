import IRestaurante from './../../interfaces/IRestaurante';
import { useState, useEffect } from 'react';
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function AdminRestaurantes() {
    const [restaurante, setRestaurante] = useState<IRestaurante[]>([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState<number>()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const paramets = useParams()

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const submitionForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        })
            .then(() => {
                handleClose();
            })

    }

    const submitionEdit = (evento: React.FormEvent<HTMLFormElement>) => {

        axios.put(`http://localhost:8000/api/v2/restaurantes/${id}/`, {
            nome: nomeRestaurante,
        })
            .then(() => {
                alert("Cadastrado com sucesso");
            })
    }

    const del = (restDel: IRestaurante) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restDel.id}/`)
            .then(() => {
                const listRest = restaurante.filter(el => el.id !== restDel.id);

                setRestaurante(listRest);

            })
    }

    useEffect(() => {
        if (paramets.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${paramets.id}/`)
                .then(response => setNomeRestaurante(response.data.nome))
        }
    }, [paramets, open])


    useEffect(() => {
        axios.get('http://localhost:8000/api/v2/restaurantes/')
            .then(response => setRestaurante(response.data));
    }, [])




    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                        <TableCell>
                            <Button variant='outlined' onClick={handleOpen}>Novo</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description" >
                                <Box sx={style}>
                                    <form onSubmit={submitionForm}>
                                        <TextField
                                            value={nomeRestaurante}
                                            onChange={element => setNomeRestaurante(element.target.value)}
                                            id="standard-basic"
                                            label="Nome restaurante"
                                            variant="standard"
                                            required />
                                        <Button type="submit" variant="outlined" >Salvar</Button>
                                    </form>
                                </Box>
                            </Modal>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurante.map(element =>
                        <TableRow key={element.id}>
                            <TableCell>
                                {element.nome}
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' onClick={handleOpen}>Editar</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description" >
                                    <Box sx={style}>
                                        <form onSubmit={submitionEdit}>
                                            <TextField
                                                value={nomeRestaurante}
                                                onChange={element => setNomeRestaurante(element.target.value)}
                                                id="standard-basic"
                                                label="Nome Restaurante"
                                                variant="standard"
                                                required />
                                            <Button type="submit" variant="outlined" onClick={() => setId(element.id)}>Salvar</Button>
                                        </form>
                                    </Box>
                                </Modal>
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color="error" onClick={() => del(element)}>
                                    Deletar
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}