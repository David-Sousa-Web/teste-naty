'use client'

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from '@/app/GlobalMUI';
import { useRouter } from 'next/navigation';

const pages = ['Products', 'Pricing', 'Blog'];

export default function Header() {
  const router = useRouter()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function handleClientPage() {
    router.push('/cliente')
  }

  function handleCondutorPage() {
    router.push('/condutor')
  }

  function handleVeiculoPage() {
    router.push('/veiculo')
  }

  function handleDisplacementPage() {
    router.push('/deslocamento')
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <EditNoteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Naty
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem>
                  <Typography textAlign="center" onClick={handleClientPage}>Cliente</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={handleCondutorPage}>Condutor</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={handleVeiculoPage}>Veiculo</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={handleDisplacementPage}>Deslocamento</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <EditNoteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Naty
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={handleClientPage}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Cliente
                </Button>
                <Button
                  onClick={handleCondutorPage}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Condutor
                </Button>
                <Button
                  onClick={handleVeiculoPage}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Veiculo
                </Button>
                <Button
                  onClick={handleDisplacementPage}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Deslocamento
                </Button>
              
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={'profile pick'}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="David Sousa" src='@/assets/Pigeon2.png'/>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}