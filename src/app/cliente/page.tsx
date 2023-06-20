'use client'

import '../../app/globals.css'
import { api } from '@/lib/api';
import Link from 'next/link';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from '@mui/material';
import { darkTheme, lightfont } from '../GlobalMUI';
import { useRouter } from 'next/navigation';

export interface Client{
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


export default async function Cliente() {
  const router = useRouter();

  const response = await api.get('/Cliente')
  const cliente: Client[] = response.data

  const handleUpdateClient = (clientId: number) => {
    router.push(`/cliente/atualizar?id=${clientId}`);
  };

  const handleDeleteClient = async (clientId: number) => {
    try {
      await api.delete(`/Cliente/${clientId}`);
      // Atualize a lista de clientes após a exclusão, se necessário
    } catch (error) {
      console.error(error);
      // Trate o erro, se necessário
    }
  };
  

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '38px'}}> 
        <h1>Clientes</h1>
              
        <ThemeProvider theme={darkTheme}>
          <TableContainer >
            <Table sx={{ maxWidth: 950 }} aria-label="a dense table" size="small">
              <ThemeProvider theme={lightfont}>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="left">Numero do Documento</TableCell>
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
                      {client.id}
                    </TableCell>
                    <TableCell align="left">{client.numeroDocumento}</TableCell>
                    <TableCell align="left">{client.tipoDocumento}</TableCell>
                    <TableCell align="left">{client.nome}</TableCell>
                    <TableCell align="left">{client.logradouro}</TableCell>
                    <TableCell align="left">{client.numero}</TableCell>
                    <TableCell align="left">{client.bairro}</TableCell>
                    <TableCell align="left">{client.cidade}</TableCell>
                    <TableCell align="left">{client.uf}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        style={{ marginRight: 10 }}
                        onClick={() => handleUpdateClient(client.id)}
                      > Atualizar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" color="error" onClick={() => handleDeleteClient(client.id)}>
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
        <Button variant="contained"  color='primary' LinkComponent={Link} href='/cliente/new'>Criar</Button>
      </div>
    </>
  );
}

