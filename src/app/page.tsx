'use client'

import { Box, Button } from "@mui/material";
import Link from "next/link";
import './globals.css'

export default function Home() {
  return (
    <>
      <h1 className="title-home">Escolha o deslocamento</h1>
      <Box>     
          <Button variant="outlined" size="large" LinkComponent={Link} href="/cliente">Cliente</Button> 
      </Box>
    </>
  )
}
