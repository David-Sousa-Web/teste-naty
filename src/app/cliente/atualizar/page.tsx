'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button } from "@mui/material";
import { FormEvent} from "react";


export default function UpdateClient() {

  async function handleAttClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await api.put(`/Cliente/${id}`);
    console.log(response.data); // Faça algo com a resposta, se necessário
  };


  
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
          <div>
            <input type="hidden" name="id" /*value={String(id)}*/ />

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

          <Button variant="contained" color="success" sx={{ left: "410px" }} type="submit">
            Atualizar
          </Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}
