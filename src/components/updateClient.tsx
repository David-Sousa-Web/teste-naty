'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { Client } from "@/app/cliente/page";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FormEvent, useEffect, useState} from "react";
import React from 'react'

const { id } = queryString.parse(window.location.search);

export default function UpdateClient() { 
  const router = useRouter();
  
  const [data, setData] = useState<Client>({
    id: 1,
    numeroDocumento: '',
    tipoDocumento: '',
    nome: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await api.get(`/Cliente/${id}`);
        const clientData = response.data;
        setData(clientData);
        console.log(clientData, 'dados do client puxados');     
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientData();
  }, [id]);

  const handleAttClient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.put(`/Cliente/${id}`, {     
      id: new Number(id),
      nome: data.nome,
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
    });
    console.log(response.data); // Do something with the response, if necessary

  };

  const handleSucessAtt = () => {
    setOpenDialog(true)
  }

  const handleReturnClientConfirm = () => {
    router.push('/cliente')
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <ThemeProvider theme={darkTheme}>
        <h1>Atualizar Cliente</h1>
        <Box
          component="form"
          onSubmit={handleAttClient}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            width: "536px",
            Height: "500px",
            bgcolor: "#202024",
            borderRadius: "10px",
            alignItems: "center",
            paddingBottom: "10px",
          }}
          autoComplete="off"
        >
          <TextField
            id="numeroDocumento"
            label="numero Documento"
            name="numeroDocumento"
            type="text"
            disabled
            value={data.numeroDocumento}
            onChange={(e) => setData({ ...data, numeroDocumento: e.target.value })}
            required
          />
          <TextField
            id="tipoDocumento"
            label="tipo Documento"
            name="tipoDocumento"
            type="text"
            disabled
            value={data.tipoDocumento}
            onChange={(e) => setData({ ...data, tipoDocumento: e.target.value })}
            required
          />
          <TextField
            id="nome"
            label="nome"
            name="nome"
            type="text"
            value={data.nome}
            onChange={(e) => setData({ ...data, nome: e.target.value })}
            required
          />
          <TextField
            id="logradouro"
            label="logradouro"
            name="logradouro"
            type="text"
            value={data.logradouro}
            onChange={(e) => setData({ ...data, logradouro: e.target.value })}
            required
          />
          <TextField
            id="numero"
            label="numero"
            name="numero"
            type="text"
            value={data.numero}
            onChange={(e) => setData({ ...data, numero: e.target.value })}
            required
          />
          <TextField
            id="bairro"
            label="bairro"
            name="bairro"
            type="text"
            value={data.bairro}
            onChange={(e) => setData({ ...data, bairro: e.target.value })}
            required
          />
          <TextField
            id="cidade"
            label="cidade"
            name="cidade"
            type="text"
            value={data.cidade}
            onChange={(e) => setData({ ...data, cidade: e.target.value })}
            required
          />
          <TextField
            id="uf"
            label="uf"
            name="uf"
            type="text"
            value={data.uf}
            onChange={(e) => setData({ ...data, uf: e.target.value })}
            required
          />
          <Button variant="contained" color="success" sx={{ left: "415px" }} type="submit" onClick={handleSucessAtt}>
            Atualizar
          </Button>

          <Dialog open={openDialog}>
            <DialogTitle>Atualização</DialogTitle>
            <DialogContent>
              Cliente Atualizado com Sucesso
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReturnClientConfirm} color="success">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </ThemeProvider>
    </div>
  );
}
