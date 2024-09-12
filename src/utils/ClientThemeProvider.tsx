"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Montserrat } from "next/font/google";
import React from "react";

// Carregando as fontes Montserrat e Poppins
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Criando o tema com Montserrat como a fonte do Typography
const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily, // Montserrat como fonte global do Typography
    allVariants: {
      fontFamily: montserrat.style.fontFamily, // Isso assegura que todas as variantes do Typography usem Montserrat
    },
  },
});

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
