'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { Displacement } from "@/app/deslocamento/page";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FormEvent, useEffect, useState} from "react";
import React from 'react'



export default function UpdateDisplacement() { 
  const { id } = queryString.parse(window.location.search);
  const router = useRouter();
  
  const [data, setData] = useState<Displacement>({
    id: 1,
    kmInicial: 1,
    kmFinal: 1,
    inicioDeslocamento: '',
    fimDeslocamento: '',
    checkList: '',
    motivo: '',
    observacao: '',
    idCondutor: 1,
    idVeiculo: 1,
    idCliente: 1,
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    
    const fetchDisplacementData = async () => {
      try {
        const response = await api.get(`/Deslocamento/${id}`);
        const DisplacementData = response.data;
        setData(DisplacementData);
        console.log(DisplacementData, 'dados do deslocamento puxados');     
      } catch (error) {
        console.error(error);
      }
    };

    fetchDisplacementData();
  }, [id]);

  const handleAttDisplacement = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.put(`/Deslocamento/${id}/EncerrarDeslocamento`, {     
      id: new Number(id),
      kmFinal: data.kmFinal,
      fimDeslocamento: dataFormatadafim,
      observacao: data.observacao
    });
    console.log(response.data); // Do something with the response, if necessary

  };

  

  const handleSucessAtt = () => {
    setOpenDialog(true)
  }

  const handleReturnVehicleConfirm = () => {
    router.push('/deslocamento')
  }

  const dataAtual: Date = new Date();
  const dataFormatadafim: string = dataAtual.toISOString();
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <ThemeProvider theme={darkTheme}>
        <h1>Atualizar Deslocamento</h1>
        <Box
          component="form"
          onSubmit={handleAttDisplacement}
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
            id="kmInicial"
            label="kmInicial"
            name="kmInicial"
            type="kmInicial"
            value={data.kmInicial}
            disabled
          />
          <TextField
            id="kmFinal"
            label="kmFinal"
            name="kmFinal"
            type="kmFinal"
            value={data.kmFinal}
            onChange={(e) => {
              const value = e.target.value;
              const newValue = value !== '' ? parseInt(value) : 0;
            
              setData({ ...data, kmFinal: newValue });
            }}
            required
          />
          <TextField
            id="inicioDeslocamento"
            label="inicioDeslocamento"
            name="inicioDeslocamento"
            type="text"
            value={data.inicioDeslocamento}
            disabled
          />
          <TextField
            id="fimDeslocamento"
            label="fimDeslocamento"
            name="fimDeslocamento"
            type="text"
            value={dataFormatadafim}
            required
          />
          <TextField
            id="checkList"
            label="checkList"
            name="checkList"
            type="text"
            disabled
            value={data.checkList}
          />
          <TextField
            id="motivo"
            label="motivo"
            name="motivo"
            type="text"
            disabled
            value={data.motivo}
          />
          <TextField
            id="observacao"
            label="observação"
            name="observacao"
            type="text"
            value={data.observacao}
            onChange={(e) => setData({ ...data, observacao: e.target.value })}
            required
          />
          <TextField
            id="tipoDocumento"
            label="tipo Documento"
            name="tipoDocumento"
            type="text"
            disabled
            value={data.idCondutor}
          />
          <TextField
            id="tipoDocumento"
            label="tipo Documento"
            name="tipoDocumento"
            type="text"
            disabled
            value={data.idVeiculo}
          />
          <TextField
            id="idCliente"
            label="idCliente"
            name="idCliente"
            type="text"
            disabled
            value={data.idCliente}
          />
          

          <Button variant="contained" color="success" sx={{ left: "415px" }} type="submit" onClick={handleSucessAtt}>
            Atualizar
          </Button>

          <Dialog open={openDialog}>
            <DialogTitle>Atualização</DialogTitle>
            <DialogContent>
              Deslocamento Atualizado com Sucesso
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReturnVehicleConfirm} color="success">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </ThemeProvider>
    </div>
  );
}
