'use client'

import { Box, Button } from "@mui/material";
import Link from "next/link";
import './globals.css'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  function handleClientPage() {
    router.push('/cliente')
  }

  return (
    <>
      <h1 className="title-home">Escolha o deslocamento</h1>
      <Box>     
          <Button variant="outlined" size="large" onClick={handleClientPage}>Cliente</Button> 
      </Box>
    </>
  )
}
