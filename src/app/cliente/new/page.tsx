'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button } from "@mui/material";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation';

export default function NewClient() {
  const router = useRouter();

  async function handleSubmitClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await api.post('/Cliente', {
        numeroDocumento: formData.get('numeroDocumento'),
        tipoDocumento: formData.get('tipoDocumento'),
        nome: formData.get('nome'),
        logradouro: formData.get('logradouro'),
        numero: formData.get('numero'),
        bairro: formData.get('bairro'),
        cidade: formData.get('tipoDocumento'),
        uf: formData.get('uf'),
      },
    )

    router.push('/cliente')
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <ThemeProvider theme={darkTheme}>
        <h1>Cadastro Cliente</h1>
        <Box
          component="form"
          onSubmit={handleSubmitClient}
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
              id="numeroDocumento"
              label="numeroDocumento"
              name="numeroDocumento"
              type="text"
              required
              
            />
            <TextField
              id="tipoDocumento"
              label="tipoDocumento"
              name="tipoDocumento"
              type="text"
              required
            />
            <TextField
              id="nome"
              label="nome"
              name="nome"
              type="text"
              required
            />
            <TextField
              id="logradouro"
              label="logradouro"
              name="logradouro"
              type="text"
              required
            />
            <TextField
              id="numero"
              label="numero"
              name="numero"
              type="text"
              required
            />
            <TextField
              id="bairro"
              label="bairro"
              name="bairro"
              type="text"
              required
            />
            <TextField
              id="cidade"
              label="cidade"
              name="cidade"
              type="text"
              required
            />
            <TextField
              id="uf"
              label="uf"
              name="uf"
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