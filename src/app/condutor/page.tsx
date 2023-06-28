'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import { darkTheme, lightfont } from '../GlobalMUI';
import { api } from '@/lib/api';
import Link from 'next/link';

export interface Conductor {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export default function Conductor() {
  const router = useRouter();

  const [deletingCondutoresId, setDeletingCondutoresId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [condutores, setCondutores] = useState<Conductor[]>([]);

  const fetchConductor = async () => {
    try {
      const response = await api.get('/Condutor');
      return response.data as Conductor[];
    } catch (error) {
      console.error('falha ao procurar os codutores', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedConductor = await fetchConductor();
      setCondutores(fetchedConductor);
    };
    fetchData();
  }, []);

  const handleUpdateConductor = (conductorId: number) => {
    router.push(`/condutor/atualizar?id=${conductorId}`);
    
    setTimeout(() => {
      const currentUrl = window.location.href;
      const refreshedUrl = `${currentUrl}`;
      window.location.href = refreshedUrl;
    }, 1000);
  };

  const handleDeleteConductor= (conductorId: number) => {
    setDeletingCondutoresId(conductorId);
    setOpenDialog(true);
  };

  const confirmDeleteConductor = async () => {
    if (!deletingCondutoresId) return;

    try {
      await api.delete(`/Condutor/${(deletingCondutoresId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: deletingCondutoresId
        }
        
      });
      setOpenDialog(false);
      setDeletingCondutoresId(null);
      
    } catch (error) {
      console.error('Erro ao excluir o cliente', error);
    }

    setTimeout(() => {
      const currentUrl = window.location.href;
      const refreshedUrl = `${currentUrl}`;
      window.location.href = refreshedUrl;
    }, 3000);
  };

  const cancelDeleteConductor = () => {
    setOpenDialog(false);
    setDeletingCondutoresId(null);
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>      
        <h1>Condutores</h1>

        <Button variant="contained" color="primary" component={Link} href="/condutor/new" sx={{ left: "450px", marginBottom: "5px" }}>
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
                      <TableCell align="left">nome</TableCell>
                      <TableCell align="left">numero Habilitacao</TableCell>
                      <TableCell align="left">catergoria Habilitacao</TableCell>
                      <TableCell align="left">vencimento Habilitacao</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                </ThemeProvider>
                <TableBody>
                  {condutores.map((cond) => (
                    <TableRow key={cond.id} >
                      <TableCell component="th" scope="row">
                        {cond.id}
                      </TableCell>
                      <TableCell align="left">{cond.nome}</TableCell>
                      <TableCell align="left">{cond.numeroHabilitacao}</TableCell>
                      <TableCell align="left">{cond.catergoriaHabilitacao}</TableCell>
                      <TableCell align="left">{cond.vencimentoHabilitacao}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          style={{ marginRight: 10 }}
                          onClick={() => handleUpdateConductor(cond.id)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteConductor(cond.id)}
                        >
                          <DeleteRoundedIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={cancelDeleteConductor}>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogContent>
                Tem certeza que deseja excluir o condutor?
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelDeleteConductor}>Cancelar</Button>
                <Button onClick={confirmDeleteConductor} color="error">
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

