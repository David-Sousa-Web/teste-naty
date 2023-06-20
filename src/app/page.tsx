'use client'

import { Box, Button } from "@mui/material";
import Link from "next/link";
import './globals.css'

export default function Home() {
  return (
    <>
      <h1 className="title-home">Escolha o deslocamento</h1>

      <Box>
        <Link href="/cliente">
          <Button variant="outlined" size="large">Cliente</Button>
        </Link>
      </Box>
    
    </>
    
  )
}
