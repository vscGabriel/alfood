import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import IRestaurante from './../../../interfaces/IRestaurante';

export default function FormularioRestaurante() {
    const paramets = useParams()

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const submitionForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (paramets.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${paramets.id}/`, {
                nome: nomeRestaurante,
            })
                .then(() => {
                    alert("Atualizado com sucesso");
                })

        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso.");
                })
        }

    }

    useEffect(() => {
        if (paramets.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${paramets.id}/`)
                .then(response => setNomeRestaurante(response.data.nome))
        }
    }, [paramets])

    return (
        <form onSubmit={submitionForm}>
            <TextField
                value={nomeRestaurante}
                onChange={element => setNomeRestaurante(element.target.value)}
                id="standard-basic"
                label="Standard"
                variant="standard" />
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}