'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import { darkTheme, lightfont } from '../GlobalMUI';
import { api } from '@/lib/api';
import Link from 'next/link';

export interface Vehicles {
  id: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number
}

export default function Vehicles() {
  const router = useRouter();

  const [deletingVeiculosId, setDeletingVeiculosId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [veiculos, setVeiculos] = useState<Vehicles[]>([]);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/Veiculo');
      return response.data as Vehicles[];
    } catch (error) {
      console.error('falha ao procurar os Veiculo', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedVehicles = await fetchVehicles();
      setVeiculos(fetchedVehicles);
    };
    fetchData();
  }, []);

  const handleUpdateVehicles = (veiculoId: number) => {
    router.push(`/veiculo/atualizar?id=${veiculoId}`);
    
    setTimeout(() => {
      const currentUrl = window.location.href;
      const refreshedUrl = `${currentUrl}`;
      window.location.href = refreshedUrl;
    }, 3000);
  };

  const handleDeleteVehicles= (veiculoId: number) => {
    setDeletingVeiculosId(veiculoId);
    setOpenDialog(true);
  };

  const confirmDeleteVehicle = async () => {
    if (!deletingVeiculosId) return;

    try {
      await api.delete(`/Veiculo/${(deletingVeiculosId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: deletingVeiculosId
        }
        
      });
      setOpenDialog(false);
      setDeletingVeiculosId(null);
      
    } catch (error) {
      console.error('Erro ao excluir o veiculo', error);
    }

    setTimeout(() => {
      const currentUrl = window.location.href;
      const refreshedUrl = `${currentUrl}`;
      window.location.href = refreshedUrl;
    }, 1000);
  };

  const cancelDeleteVehicle = () => {
    setOpenDialog(false);
    setDeletingVeiculosId(null);
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>      
        <h1>Veiculos</h1>

        <Button variant="contained" color="primary" component={Link} href="/veiculo/new" sx={{ left: "320px", marginBottom: "5px" }}>
          Criar
        </Button>
        <div>
          <ThemeProvider theme={darkTheme}>
            <TableContainer>
              <Table sx={{ Width: 1780 }} aria-label="a dense table" size="small">
                <ThemeProvider theme={lightfont}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="left">placa</TableCell>
                      <TableCell align="left">marca Modelo</TableCell>
                      <TableCell align="left">ano Fabricacao</TableCell>
                      <TableCell align="left">km Atual</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                </ThemeProvider>
                <TableBody>
                  {veiculos.map((vec) => (
                    <TableRow key={vec.id} >
                      <TableCell component="th" scope="row">
                        {vec.id}
                      </TableCell>
                      <TableCell align="left">{vec.placa}</TableCell>
                      <TableCell align="left">{vec.marcaModelo}</TableCell>
                      <TableCell align="left">{vec.anoFabricacao}</TableCell>
                      <TableCell align="left">{vec.kmAtual}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          style={{ marginRight: 10 }}
                          onClick={() => handleUpdateVehicles(vec.id)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteVehicles(vec.id)}
                        >
                          <DeleteRoundedIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={cancelDeleteVehicle}>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogContent>
                Tem certeza que deseja excluir o condutor?
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelDeleteVehicle}>Cancelar</Button>
                <Button onClick={confirmDeleteVehicle} color="error">
                  Excluir
                </Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
        </div>
      </div>
      
    </>
  );
}

