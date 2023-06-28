'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { Vehicles } from "@/app/veiculo/page";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FormEvent, useEffect, useState} from "react";
import React from 'react'



export default function UpdateVehicle() {
  const { id } = queryString.parse(window.location.search);
  const router = useRouter();
  
  const [data, setData] = useState<Vehicles>({
    id: 1,
    placa: '',
    marcaModelo: '',
    anoFabricacao: 1,
    kmAtual: 1,

  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await api.get(`/Veiculo/${id}`);
        const vehicleData = response.data;
        setData(vehicleData);
        console.log(vehicleData, 'dados do veiculos puxados');     
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicleData();
  }, [id]);

  const handleAttVehicle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.put(`/Veiculo/${id}`, {     
      id: new Number(id),
      marcaModelo: data.marcaModelo,
      anoFabricacao: data.anoFabricacao,
      kmAtual: data.kmAtual
    });
    console.log(response.data); // Do something with the response, if necessary

  };

  const handleSucessAtt = () => {
    setOpenDialog(true)
  }

  const handleReturnVehicleConfirm = () => {
    router.push('/veiculo')
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <ThemeProvider theme={darkTheme}>
        <h1>Atualizar Veiculo</h1>
        <Box
          component="form"
          onSubmit={handleAttVehicle}
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
            id="placa"
            label="placa"
            name="placa"
            type="text"
            value={data.placa}
            onChange={(e) => setData({ ...data, placa: e.target.value })}
            disabled
          />
          <TextField
            id="marcaModelo"
            label="marca Modelo"
            name="marcaModelo"
            type="text"
            value={data.marcaModelo}
            onChange={(e) => setData({ ...data, marcaModelo: e.target.value })}
            required
          />
          <TextField
            id="anoFabricacao"
            label="ano Fabricacao"
            name="anoFabricacao"
            type="text"
            value={data.anoFabricacao}
            onChange={(e) => {
              const value = e.target.value;
              const newValue = value !== '' ? parseInt(value) : 0;
            
              setData({ ...data, anoFabricacao: newValue });
            }}
            required
          />
          <TextField
            id="kmAtual"
            label="km Atual"
            name="kmAtual"
            type="text"
            value={data.kmAtual}
            onChange={(e) => {
              const value = e.target.value;
              const newValue = value !== '' ? parseInt(value) : 0;
            
              setData({ ...data, kmAtual: newValue });
            }}
            required
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
