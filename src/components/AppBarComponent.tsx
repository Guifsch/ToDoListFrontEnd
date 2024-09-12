"use client";
import "wicg-inert"; //assegura que o suporte ao atributo inert esteja presente em navegadores que não o suportam nativamente
import {
  AppBar,
  Box,
  CardMedia,
  Fade,
  Backdrop,
  Typography,
  Modal,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Poppins } from "next/font/google";
import { signInSuccess, signOut } from "../redux/user/userSlice";
import { todolistTrue } from "../redux/todolist/todolistSlice";
import ButtonComponent from "./ButtonComponent";
import {
  snackBarMessageSuccess,
  snackBarMessageError,
} from "../redux/snackbar/snackBarSlice";
import { loadingTrue, loadingFalse } from "../redux/loading/loadingSlice";
import LoadingComponent from "@/components/LoadingComponent";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useAxiosConfig } from "../utils/axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "932px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "initial",
  maxHeight: "721px",
  overflow: "overlay",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
  "@media (max-height:650px)": {
    maxHeight: "600px",
  },
};

type FormData = {
  username?: string;
  password?: string;
};

export default function AppBarComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({});
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const axiosInterceptor = useAxiosConfig();
  const [isClient, setIsClient] = useState(false);
  const user = useSelector((state: any) => state.user.currentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loadingTrue());

    try {
      const response = await axiosInterceptor.post(
        "/api/auth/signin",
        formData,
        {
          withCredentials: true,
        }
      );
      dispatch(signInSuccess(response.data));
      dispatch(
        snackBarMessageSuccess("Bem vindo " + response.data.username + "!")
      );
      dispatch(todolistTrue());
      setOpen(false);
    } catch (error: any) {
      dispatch(snackBarMessageError(error.response.data.error));
    } finally {
      dispatch(loadingFalse());
    }
  };

  const handleSignOut = async () => {
    try {
      await axiosInterceptor.get("/api/auth/signout", {
        withCredentials: true,
      });
      dispatch(signOut());
      dispatch(snackBarMessageSuccess("Logout realizado com sucesso!"));
    } catch (error: any) {
      dispatch(snackBarMessageError(error.response.data.error));
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Garantir que, quando o modal está aberto, todos os outros elementos na página sejam "inacessíveis" para o usuário
  useEffect(() => {
    if (open) {
      const elements = document.querySelectorAll(
        "body > *:not(.MuiBackdrop-root):not(#modal-content)"
      );
      elements.forEach((element) => {
        element.setAttribute("inert", "true");
      });
    } else {
      const elements = document.querySelectorAll("[inert]");
      elements.forEach((element) => {
        element.removeAttribute("inert");
      });
    }

    return () => {
      const elements = document.querySelectorAll("[inert]");
      elements.forEach((element) => {
        element.removeAttribute("inert");
      });
    };
  }, [open]);

  useEffect(() => {
    // Impede erros de hidratação com o server-side
    setIsClient(true);
  }, []);

  return (
    <AppBar
      position="relative"
      sx={{
        width: "100%",
        height: "50px",
        marginTop: "54px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff00",
        boxShadow: "none",
        "@media (max-width:1280px)": {
          padding: "0 15px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          maxWidth: "1280px",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          image="/images/Logo.png"
          alt="Imagem da logo da página"
          sx={{
            width: "217px",
            height: "50px",
            "@media (max-width:600px)": {
              width: "140px",
              height: "32px",
            },
          }}
        />
        {isClient && user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#000000",
                fontFamily: poppins.style.fontFamily,
              }}
            >
              {user.username}
            </Typography>

            <CardMedia
              component="img"
              image={user.profilePicture}
              alt="Imagem do usuário"
              sx={{ width: "40px", height: "40px", borderRadius: "50%" }} // Tornando a imagem circular
            />

            <ButtonComponent
              onClick={() => {
                handleSignOut();
              }}
              backgroundColor="#000000"
              color="#ffffff"
              width="80px"
              height="40px"
              borderRadius="0"
              fontSize="14px"
              fontWeight="600"
              textTransform="lowercase"
              fontFamily={poppins.style.fontFamily}
            >
              sair
            </ButtonComponent>
          </Box>
        ) : (
          <ButtonComponent
            onClick={handleOpen}
            backgroundColor="#000000"
            color="#ffffff"
            width="120px"
            height="40px"
            borderRadius="0"
            fontSize="14px"
            fontWeight="600"
            textTransform="lowercase"
            fontFamily={poppins.style.fontFamily}
          >
            entrar
          </ButtonComponent>
        )}
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableScrollLock // Desabilita o comportamento de bloqueio da rolagem
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backgroundColor: "#0c0c0cd9" },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} id="modal-content" ref={modalRef}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                padding: 0,
                borderRadius: "inherit",
                position: "absolute",
                right: "23px",
                top: 0,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  lineHeight: "64px",
                  color: "#000000",
                }}
              >
                close
              </Typography>
            </IconButton>
            <LoadingComponent top="0" />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                paddingTop: "46px",
                width: "100%",
                paddingLeft: "16px",
                "@media (max-width:1280px)": {
                  flexDirection: "column",
                  alignItems: "center",
                },
              }}
            >
              <CardMedia
                component="img"
                image="/images/Woman_Sample_2.png"
                alt="Desenho de uma mulher aponando para algo"
                sx={{ width: "231px", height: "231px" }}
              />
              <Box
                sx={{
                  paddingTop: "45px",
                  paddingLeft: "42px",
                  "@media (max-width:1280px)": {
                    paddingLeft: "0",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "80px",
                    fontWeight: "700",
                    lineHeight: "64px",
                    paddingBottom: "11px",
                    "@media (max-width:1280px)": {
                      fontSize: "60px",
                    },
                  }}
                >
                  Sign in
                </Typography>

                <Typography
                  sx={{
                    fontSize: "50px",
                    fontWeight: "400",
                    color: "#4AC959",
                    lineHeight: "64px",
                    "@media (max-width:1280px)": {
                      fontSize: "30px",
                    },
                  }}
                >
                  to access your list
                </Typography>
              </Box>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "342px",
                width: "100%",
                marginLeft: "57px",
                marginTop: "39px",
                "@media (max-width:600px)": {
                  marginLeft: "0",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  lineHeight: "29.26px",
                  width: "100%",
                  textAlign: "left",
                  paddingBottom: "3px",
                }}
              >
                User:
              </Typography>
              <TextField
                onChange={handleChange}
                type="email"
                name="email"
                required
                variant="outlined"
                sx={{
                  maxwidth: "342px",
                  height: "54px",
                  width: "100%",
                  marginBottom: "30px",
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                  },
                }}
              />

              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  width: "100%",
                  textAlign: "left",
                  lineHeight: "29.26px",
                  paddingBottom: "3px",
                }}
              >
                Password:
              </Typography>
              <TextField
                onChange={handleChange}
                type="password"
                name="password"
                required
                variant="outlined"
                sx={{
                  width: "100%",
                  maxwidth: "342px",
                  height: "54px",
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                  },
                }}
              />
              <ButtonComponent
                type="submit"
                width="300px"
                height="64px"
                margin="56px 0 0 0"
                borderRadius="0"
                backgroundColor="#4AC959"
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                    textTransform: "initial",
                  }}
                >
                  Sign in
                </Typography>
              </ButtonComponent>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </AppBar>
  );
}
