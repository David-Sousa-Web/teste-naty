'use client'

import { Box, Button } from "@mui/material";
import Link from "next/link";
import './globals.css'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <>
      <h1 className="title">BEM VINDO!!</h1>
    </>
  )
}
