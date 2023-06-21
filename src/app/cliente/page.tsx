'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from '@mui/material';
import { darkTheme, lightfont } from '../GlobalMUI';
import { api } from '@/lib/api';
import Link from 'next/link';

export interface Client {
  id: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export default function Cliente() {
  const router = useRouter();

  const [deletingClientId, setDeletingClientId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [clientes, setClientes] = useState<Client[]>([]);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/Cliente');
      return response.data as Client[];
    } catch (error) {
      console.error('falha ao procurar os clientes', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedClientes = await fetchClientes();
      setClientes(fetchedClientes);
    };
    fetchData();
  }, []);

  const handleUpdateClient = (clientId: number) => {
    router.push(`/cliente/atualizar?id=${clientId}`);
  };

  const handleDeleteClient = (clientId: number) => {
    setDeletingClientId(clientId);
    setOpenDialog(true);
  };

  const confirmDeleteClient = async () => {
    if (!deletingClientId) return;

    try {
      await api.delete(`/Cliente/${(deletingClientId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: deletingClientId
        }
        
      });
      setOpenDialog(false);
      setDeletingClientId(null);
      
    } catch (error) {
      console.error('Erro ao excluir o cliente', error);
    }

    setTimeout(() => {
      const currentUrl = window.location.href;
      const refreshedUrl = `${currentUrl}`;
      window.location.href = refreshedUrl;
    }, 1000);
    
    
  };

  const cancelDeleteClient = () => {
    setOpenDialog(false);
    setDeletingClientId(null);
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '38px'}}> 
        <h1>Clientes</h1>
        <div>
          <ThemeProvider theme={darkTheme}>
            <TableContainer>
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
                  {clientes.map((client) => (
                    <TableRow key={client.id}>
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
                        >
                          Atualizar
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ThemeProvider>
        </div>
        <Button variant="contained" color="primary" component={Link} href="/cliente/new">
          Criar
        </Button>
      </div>
      <Dialog open={openDialog} onClose={cancelDeleteClient}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir o cliente?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteClient}>Cancelar</Button>
          <Button onClick={confirmDeleteClient} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
