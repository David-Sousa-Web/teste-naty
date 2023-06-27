'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button } from "@mui/material";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation';

export default function NewConductor() {
  const router = useRouter();

  async function handleSubmitConductor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    
    await api.post('/Condutor', {
        nome: formData.get('nome'),
        numeroHabilitacao: formData.get('numeroHabilitacao'),
        categoriaHabilitacao: formData.get('categoriaHabilitacao'),
        vencimentoHabilitacao: formData.get('vencimentoHabilitacao')
      },
    )

    router.push('/condutor')
  }

  const dataAtual: Date = new Date();
  const dataFormatada: string = dataAtual.toISOString();
  console.log(dataFormatada);

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
              id="nome"
              label="nome"
              name="nome"
              type="text"
              required             
            />
            <TextField
              id="numeroHabilitacao"
              label="numeroHabilitacao"
              name="numeroHabilitacao"
              type="text"
              required
            />
            <TextField
              id="categoriaHabilitacao"
              label="categoriaHabilitacao"
              name="categoriaHabilitacao"
              type="text"
              required
            />
            <TextField
              id="vencimentoHabilitacao"
              label="vencimentoHabilitacao"
              name="vencimentoHabilitacao"
              type="text"
              value={dataFormatada}
              required
            />
          </div>

          <Button variant="contained" color="success" sx={{left: '450px', }} type={"submit"}>Criar</Button>
        </Box>
      </ThemeProvider>
    </div>
  )
}