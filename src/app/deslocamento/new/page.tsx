'use client'
import { darkTheme } from "@/app/GlobalMUI";
import { api } from "@/lib/api";
import { Box, TextField, ThemeProvider, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Client } from "@/app/cliente/page";
import { Conductor } from "@/app/condutor/page";
import { Vehicles } from "@/app/veiculo/page";

export default function NewDisplacement() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Client[]>([]);
  const [condutores, setCondutores] = useState<Conductor[]>([]);
  const [veiculos, setVeiculos] = useState<Vehicles[]>([]);

  useEffect(() => {
    fetchData('/Cliente', setClientes);
    fetchData('/Condutor', setCondutores);
    fetchData('/Veiculo', setVeiculos);
  }, []);

  const fetchData = async (endpoint: string, setData: Function) => {
    try {
      const response = await api.get(endpoint);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(`Falha ao procurar os dados em ${endpoint}`, error);
    }
  };

  console.log(clientes)
  console.log(condutores)
  console.log(veiculos)

  async function handleSubmitDisplacement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await api.post('/Deslocamento/IniciarDeslocamento', {
      kmInicial: formData.get('kmInicial'),
      inicioDeslocamento: formData.get('inicioDeslocamento'),
      checkList: formData.get('checkList'),
      motivo: formData.get('motivo'),
      observacao: formData.get('observacao'),
      idCondutor: formData.get('idCondutor'),
      idVeiculo: formData.get('idVeiculo'),
      idCliente: formData.get('idCliente'),
    });

    router.push('/deslocamento');
  }

  const dataAtual: Date = new Date();
  const dataFormatada: string = dataAtual.toISOString();
  console.log(dataFormatada);

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <ThemeProvider theme={darkTheme}>
        <h1>Cadastro Deslocamento</h1>
        <Box
          component="form"
          onSubmit={handleSubmitDisplacement}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            width: '536px',
            height: '500px',
            bgcolor: '#202024',
            borderRadius: '10px',
            alignItems: 'center',
            paddingBottom: '10px',
          }}
          autoComplete="off"
        >
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <TextField
              id="kmInicial"
              label="kmInicial"
              name="kmInicial"
              type="text"
              required
            />
            <TextField
              id="inicioDeslocamento"
              label="inicioDeslocamento"
              name="inicioDeslocamento"
              type="text"
              value={dataFormatada}
              required
            />
            <TextField
              id="checkList"
              label="checkList"
              name="checkList"
              type="text"
              required
            />
            <TextField
              id="motivo"
              label="motivo"
              name="motivo"
              type="text"
              required
            />
            <TextField
              id="observacao"
              label="observacao"
              name="observacao"
              type="text"
              required
            />
            <InputLabel id="labelCondutor">Escolha o Condutor</InputLabel>
            <Select
              labelId="labelCondutor"
              id="idCondutor"
              label="Escolha o Condutor"
              name="idCondutor"
              required
            >
              {condutores.map((condutor) => (
                <MenuItem key={condutor.id} value={condutor.id}>{condutor.nome}</MenuItem>
              ))}
            </Select>
            <InputLabel id="labelVeiculo">Escolha o Veiculo</InputLabel>
            <Select
              labelId="labelVeiculo"
              id="idVeiculo"
              label="idVeiculo"
              name="idVeiculo"
              required
            >
              {veiculos.map((veiculo) => (
                <MenuItem key={veiculo.id} value={veiculo.id}>{veiculo.marcaModelo}</MenuItem>
              ))}
            </Select>
            
            <InputLabel id="labelCliente">Escolha o Cliente</InputLabel>
            <Select
              labelId="labelCliente"
              id="idCliente"
              label="idCliente"
              name="idCliente"
              defaultValue=""
              required
            >
              {clientes.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente.id}>{cliente.nome}</MenuItem>
              ))}
            </Select>
          
          </div>

          <Button variant="contained" color="success" sx={{left: '450px' }} type="submit">Criar</Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}
