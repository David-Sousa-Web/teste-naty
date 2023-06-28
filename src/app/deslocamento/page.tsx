'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import { darkTheme, lightfont } from '../GlobalMUI';
import { api } from '@/lib/api';
import Link from 'next/link';

export interface Displacement {
  id: number;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: string;
  fimDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export default function Deslocamento() {
  const router = useRouter();

  const [deletingDisplacementId, setDeletingDisplacementId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deslocamentos, setDeslocamentos] = useState<Displacement[]>([]);

  const fetchDeslocamentos = async () => {
    try {
      const response = await api.get('/Deslocamento');
      return response.data as Displacement[];
    } catch (error) {
      console.error('falha ao procurar os Deslocamentos', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDeslocamentos = await fetchDeslocamentos();
      setDeslocamentos(fetchedDeslocamentos);
    };
    fetchData();
  }, []);

  const handleUpdateDisplacement = (desloId: number) => {
    router.push(`/deslocamento/atualizar?id=${desloId}`);
    
    setTimeout(() => {
      const currentUrl = window.location.href;
      const refreshedUrl = `${currentUrl}`;
      window.location.href = refreshedUrl;
    }, 5000);
  };

  const handleDeleteDisplacement = (desloId: number) => {
    setDeletingDisplacementId(desloId);
    setOpenDialog(true);
  };

  const confirmDeleteDisplacement = async () => {
    if (!deletingDisplacementId) return;

    try {
      await api.delete(`/Deslocamento/${(deletingDisplacementId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: deletingDisplacementId
        }
        
      });
      setOpenDialog(false);
      setDeletingDisplacementId(null);
      
    } catch (error) {
      console.error('Erro ao excluir o cliente', error);
    }

    setTimeout(() => {
      const currentUrl = window.location.href;
      const refreshedUrl = `${currentUrl}`;
      window.location.href = refreshedUrl;
    }, 1000);
  };

  const cancelDeleteDisplacement = () => {
    setOpenDialog(false);
    setDeletingDisplacementId(null);
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>      
        <h1>Deslocamento</h1>

        <Button variant="contained" color="primary" component={Link} href="/deslocamento/new" sx={{ left: "630px", marginBottom: "5px" }}>
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
                      <TableCell align="left">kmInicial</TableCell>
                      <TableCell align="left">kmFinal</TableCell>
                      <TableCell align="left">inicioDeslocamento</TableCell>
                      <TableCell align="left">fimDeslocamento</TableCell>
                      <TableCell align="left">checkList</TableCell>
                      <TableCell align="left">motivo</TableCell>
                      <TableCell align="left">observacao</TableCell>
                      <TableCell align="left">idCondutor</TableCell>
                      <TableCell align="left">idVeiculo</TableCell>
                      <TableCell align="left">idCliente</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                </ThemeProvider>
                <TableBody>
                  {deslocamentos.map((desl) => (
                    <TableRow key={desl.id} >
                      <TableCell component="th" scope="row">
                        {desl.id}
                      </TableCell>
                      <TableCell align="left">{desl.kmInicial}</TableCell>
                      <TableCell align="left">{desl.kmFinal}</TableCell>
                      <TableCell align="left">{desl.inicioDeslocamento}</TableCell>
                      <TableCell align="left">{desl.fimDeslocamento}</TableCell>
                      <TableCell align="left">{desl.checkList}</TableCell>
                      <TableCell align="left">{desl.motivo}</TableCell>
                      <TableCell align="left">{desl.observacao}</TableCell>
                      <TableCell align="left" >{desl.idCondutor}</TableCell>
                      <TableCell align="left" >{desl.idVeiculo}</TableCell>
                      <TableCell align="left" >{desl.idCliente}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          style={{ marginRight: 10 }}
                          onClick={() => handleUpdateDisplacement(desl.id)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteDisplacement(desl.id)}
                        >
                          <DeleteRoundedIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={cancelDeleteDisplacement}>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogContent>
                Tem certeza que deseja excluir o Deslocamento?
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelDeleteDisplacement}>Cancelar</Button>
                <Button onClick={confirmDeleteDisplacement} color="error">
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
