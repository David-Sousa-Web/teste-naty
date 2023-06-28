'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { Conductor } from "@/app/condutor/page";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FormEvent, useEffect, useState} from "react";
import React from 'react'



export default function UpdateConductor() {
  const { id } = queryString.parse(window.location.search);
  const router = useRouter();
  
  const [data, setData] = useState<Conductor>({
    id: 1,
    nome: '',
    numeroHabilitacao: '',
    catergoriaHabilitacao: '',
    categoriaHabilitacao: '',
    vencimentoHabilitacao: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchConductorData = async () => {
      try {
        const response = await api.get(`/Condutor/${id}`);
        const conductorData = response.data;
        setData(conductorData);
        console.log(conductorData, 'dados do conductor puxados');     
      } catch (error) {
        console.error(error);
      }
    };

    fetchConductorData();
  }, [id]);

  const handleAttConductor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.put(`/Condutor/${id}`, {     
      id: new Number(id),
      categoriaHabilitacao: data.catergoriaHabilitacao,
      vencimentoHabilitacao: data.vencimentoHabilitacao
    });
    console.log(response.data); // Do something with the response, if necessary

  };

  const handleSucessAtt = () => {
    setOpenDialog(true)
  }

  const handleReturnConductorConfirm = () => {
    router.push('/condutor')
  }


  const dataAtual: Date = new Date();
  const dataFormatada: string = dataAtual.toISOString();
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <ThemeProvider theme={darkTheme}>
        <h1>Atualizar Condutor</h1>
        <Box
          component="form"
          onSubmit={handleAttConductor}
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
            id="nome"
            label="nome"
            name="nome"
            type="text"
            value={data.nome}
            onChange={(e) => setData({ ...data, nome: e.target.value })}
            disabled
          />
          <TextField
            id="categoriaHabilitacao"
            label="categoriaHabilitacao"
            name="categoriaHabilitacao"
            type="text"
            value={data.catergoriaHabilitacao}
            onChange={(e) => setData({ ...data, catergoriaHabilitacao: e.target.value })}
            required
          />
          <TextField
            id="vencimentoHabilitacao"
            label="vencimentoHabilitacao"
            name="vencimentoHabilitacao"
            type="text"
            value={dataFormatada}
            onChange={(e) => setData({ ...data, vencimentoHabilitacao: e.target.value })}
            required
          />
          <TextField
            id="numeroHabilitacao"
            label="numeroHabilitacao"
            name="numeroHabilitacao"
            type="text"
            value={data.numeroHabilitacao}
            onChange={(e) => setData({ ...data, numeroHabilitacao: e.target.value })}
            disabled
          />

          <Button variant="contained" color="success" sx={{ left: "415px" }} type="submit" onClick={handleSucessAtt}>
            Atualizar
          </Button>

          <Dialog open={openDialog}>
            <DialogTitle>Atualização</DialogTitle>
            <DialogContent>
              Condutor Atualizado com Sucesso
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReturnConductorConfirm} color="success">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </ThemeProvider>
    </div>
  );
}
