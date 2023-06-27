'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button } from "@mui/material";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation';

export default function NewVehicle() {
  const router = useRouter();

  async function handleSubmitConductor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    
    await api.post('/Veiculo', {
        placa: formData.get('placa'),
        marcaModelo: formData.get('marcaModelo'),
        anoFabricacao: formData.get('anoFabricacao'),
        kmAtual: formData.get('kmAtual')
      },
    )

    router.push('/veiculo')
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <ThemeProvider theme={darkTheme}>
        <h1>Cadastro Condutor</h1>
        <Box
          component="form"
          onSubmit={handleSubmitConductor}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            width: '536px',
            Height: '500px',
            bgcolor: '#202024',
            borderRadius: '10px',
            alignItems: 'center',
            paddingBottom: '10px',     
          }}
          autoComplete="off"
        >
          <div>
            <TextField
              id="placa"
              label="placa"
              name="placa"
              type="placa"
              required             
            />
            <TextField
              id="marcaModelo"
              label="marca Modelo"
              name="marcaModelo"
              type="text"
              required
            />
            <TextField
              id="anoFabricacao"
              label="ano de Fabricação"
              name="anoFabricacao"
              type="text"
              required
            />
            <TextField
              id="kmAtual"
              label="km Atual"
              name="kmAtual"
              type="text"
              required
            />
          </div>

          <Button variant="contained" color="success" sx={{left: '450px', }} type={"submit"}>Criar</Button>
        </Box>
      </ThemeProvider>
    </div>
  )
}