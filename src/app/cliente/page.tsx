'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import '../../app/globals.css'
import { api } from '@/lib/api';
import Link from 'next/link';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from '@mui/material';

interface Client{
  id: number 
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightfont = createTheme({
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          color: '#272221',
          background: '#F3F2F2',
          fontSize: '24px',
          textTransform: 'uppercase',
          fontWeight: 'bold',  
        }
      }
    },
  },
})

export default async function DataGridDemo() {

  const response = await api.get('/Cliente', {})
  const cliente: Client[] = response.data

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '38px'}}>
      <h1>Clientes</h1>
      <ThemeProvider theme={darkTheme}>
        <TableContainer >
          <Table sx={{ maxWidth: 950 }} aria-label="a dense table" size="small">
            <ThemeProvider theme={lightfont}>
              <TableHead>
                <TableRow sx={{color: 'white'}}>
                  <TableCell>Numero do Documento</TableCell>
                  <TableCell align="left">tipoDocumento</TableCell>
                  <TableCell align="left">nome</TableCell>
                  <TableCell align="left">logradouro</TableCell>
                  <TableCell align="left">numero</TableCell>
                  <TableCell align="left">bairro</TableCell>
                  <TableCell align="left">cidade</TableCell>
                  <TableCell align="left">uf</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
            </ThemeProvider>
            <TableBody>
              {cliente.map((client) => (
                <TableRow
                  key={client.id}
                >
                  <TableCell component="th" scope="row">
                    {client.numeroDocumento}
                  </TableCell>
                  <TableCell align="left">{client.tipoDocumento}</TableCell>
                  <TableCell align="left">{client.nome}</TableCell>
                  <TableCell align="left">{client.logradouro}</TableCell>
                  <TableCell align="left">{client.numero}</TableCell>
                  <TableCell align="left">{client.bairro}</TableCell>
                  <TableCell align="left">{client.cidade}</TableCell>
                  <TableCell align="left">{client.uf}</TableCell>
                  <TableCell>
                    <Button variant="outlined" style={{marginRight: 10}} LinkComponent={Link} href='/cliente/new'>Atualizar</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined"  color='error'>excluir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>  

    </div>
  );
}

