"use client";
import { Box, CardMedia, Typography, TextField } from "@mui/material";
import ButtonComponent from "./ButtonComponent";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import { useAxiosConfig } from "../utils/axios";
import { loadingTrue, loadingFalse } from "../redux/loading/loadingSlice";
import LoadingComponent from "@/components/LoadingComponent";
import {
  snackBarMessageSuccess,
  snackBarMessageError,
} from "../redux/snackbar/snackBarSlice";

export default function GetInTouchComponent() {
  const axiosInterceptor = useAxiosConfig();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // Função handleChange para atualizar o estado dinamicamente
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    // Se o campo alterado for o de telefone, formata o número antes de atualizar o estado
    const formattedValue =
      id === "phoneNumber" ? formatPhoneNumber(value) : value;

    setFormData({ ...formData, [id]: formattedValue });
  };

  // Função para enviar os dados do formulário para o backend
  const handleSubmit = async () => {
    dispatch(loadingTrue());
    try {
      const response = await axiosInterceptor.post(
        "/api/mail/send-form",
        formData
      );
      dispatch(snackBarMessageSuccess(response.data.message));
    } catch (error: any) {
      dispatch(snackBarMessageError(error.response.data.error));
    } finally {
      dispatch(loadingFalse());
    }
  };

  return (
    <Box
      sx={{
        marginTop: "185px",
        width: "100%",
        position: "relative",
        maxWidth: "700px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px",
        height: "721px",
        boxShadow: "0px 8px 16px 0px #06152B14",
        "@media (max-width:1280px)": {
          height: "821px",
        },

        "@media (max-width:600px)": {
          paddingX: "15px",
        },
      }}
    >
      <LoadingComponent top="0" />
      <Box sx={{ position: "absolute", top: "-100px" }}>
        <Box
          sx={{
            position: "absolute",
            top: "86px",
            left: "-60px",
            zIndex: "-1",
          }}
        >
          <CardMedia
            component="img"
            image="/images/Background_Block.png"
            alt="Pequeno bloco verde"
            sx={{ width: "auto" }}
          />
        </Box>

        <CardMedia
          component="img"
          image="/images/Woman_Sample.png"
          alt="Mulher sentada olhando para a direita"
          sx={{ width: "191px", height: "191px", borderRadius: "50%" }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          paddingTop: "27px",
          "@media (max-width:1280px)": {
            paddingTop: "60px",
          },
        }}
      >
        <Box sx={{ width: "250px", height: "60px", display: "flex" }}>
          <CardMedia
            component="img"
            image="/images/Mail_Icon.png"
            alt="Ícone de email"
            sx={{ width: "60px", height: "60px" }}
          />
          <Box sx={{ paddingLeft: "24px" }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "400",
                color: "#06152B",
                lineHeight: "29.26px",
              }}
            >
              GET IN
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#06152B",
                lineHeight: "29.26px",
              }}
            >
              TOUCH
            </Typography>
          </Box>
        </Box>
        <Box className="flex flex-wrap" sx={{ paddingTop: "40px" }}>
          <Typography
            sx={{
              fontSize: "16px",
              paddingBottom: "8px",
              fontWeight: "400",
              color: "#06152B",
              lineHeight: "19.5px",
            }}
          >
            Your name
          </Typography>
          <TextField
            required
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full"
            placeholder="type your name here..."
            variant="outlined"
            sx={{
              paddingBottom: "24px",
              "& input::placeholder": {
                color: "#9A9A9A",
                fontSize: "16px",
                fontWeight: "400",
              },
              "& input": {
                height: "17px",
              },
            }}
          />
          <Box
            sx={{
              paddingBottom: "24px",
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "50%",
                paddingRight: "10px",
                "@media (max-width:1280px)": {
                  width: "100%",
                  paddingRight: "0",
                  paddingBottom: "24px",
                },
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#06152B",
                  paddingBottom: "8px",
                  lineHeight: "19.5px",
                }}
              >
                Email*
              </Typography>
              <TextField
                required
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@example.com"
                variant="outlined"
                sx={{
                  width: "100%",
                  "& input::placeholder": {
                    color: "#9A9A9A",
                    fontSize: "16px",
                    fontWeight: "400",
                  },
                  "& input": {
                    height: "17px",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                width: "50%",
                paddingLeft: "10px",
                "@media (max-width:1280px)": {
                  paddingLeft: "0",
                  width: "100%",
                },
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "400",
                  paddingBottom: "8px",
                  color: "#06152B",
                  lineHeight: "19.5px",
                }}
              >
                Telephone*
              </Typography>

              <TextField
                required
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="(  ) ____-____"
                variant="outlined"
                sx={{
                  width: "100%",
                  "& input::placeholder": {
                    color: "#9A9A9A",
                    fontSize: "16px",
                    fontWeight: "400",
                  },
                  "& input": {
                    height: "17px",
                  },
                }}
                inputProps={{
                  maxLength: 14,
                }}
              />
            </Box>
          </Box>
          <Typography
            sx={{
              width: "100%",
              fontSize: "16px",
              fontWeight: "400",
              color: "#06152B",
              paddingBottom: "8px",
              lineHeight: "19.5px",
            }}
          >
            Message*
          </Typography>
          <TextField
            required
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full"
            placeholder="Type what you want to say to us"
            variant="outlined"
            maxRows={4}
            multiline
            sx={{
              paddingBottom: "40px",
              "& textarea::placeholder": {
                color: "#9A9A9A",
                fontSize: "16px",
                fontWeight: "400",
              },
              "& .MuiInputBase-multiline": {
                height: "150px",
                alignItems: "flex-start",
                padding: "15px 16px",
              },
            }}
          />
          <ButtonComponent
            width="100%"
            height="52px"
            backgroundColor="#46BD62"
            borderRadius="4px"
            boxShadow="0px 16px 24px 0px #06152B1F"
            onClick={handleSubmit}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Send now
            </Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
}
