"use client";
import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { snackBarClose } from "../redux/snackbar/snackBarSlice";
import Alert from "@mui/material/Alert";

// Define o formato do estado do Snackbar
interface SnackBarState {
  message: string | { message: string };
  open: boolean;
  severity: "success" | "error" | "warning" | "info";
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

export default function SnackBar() {
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar montagem
  const dispatch = useDispatch();

  // Tipagem do useSelector diretamente com o formato do estado do Snackbar
  const { message, open, severity, vertical, horizontal } = useSelector(
    (state: { snackBar: SnackBarState }) => state.snackBar
  );

  useEffect(() => {
    setIsMounted(true); // Para evitar erros de client vs server side
  }, []);

  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        dispatch(snackBarClose());
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [open, dispatch]);

  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(snackBarClose());
  };

  // Verificar se a mensagem é um objeto e extrair a mensagem
  const displayMessage =
    typeof message === "object"
      ? message.message || "Ocorreu um erro"
      : message;

  // Renderizar o Snackbar apenas após a montagem no cliente
  if (!isMounted) return null;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleCloseSnack}
      autoHideDuration={5000}
    >
      <Alert
        onClose={handleCloseSnack}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {displayMessage}
      </Alert>
    </Snackbar>
  );
}
