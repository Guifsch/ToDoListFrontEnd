"use client";
import { Box, CardMedia, Typography } from "@mui/material";
import ToDoListComponent from "@/components/ToDoListComponent";
import ButtonComponent from "@/components/ButtonComponent";
import GetInTouchComponent from "@/components/GetInTouchComponent";
import Carousel from "@/components/CarouselComponent";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Home() {
  return (
    <main>
      {/* Primeira seção */}
      <Box
        sx={{
          position: "absolute",
          top: "24px",
          right: 0,
          zIndex: "-1",
        }}
      >
        <CardMedia
          component="img"
          image="/images/Background_Arrow.png"
          alt="Flecha grande verde de fundo"
          sx={{
            width: "634px",
            height: "734px",
            "@media (max-width:1280px)": {
              display: "none",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "52px",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1280px",
          width: "100%",
          "@media (max-width:1280px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            marginTop: "52px",
            "@media (max-width:1280px)": {
              paddingBottom: "50px",
              marginX: "15px",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "80px",
              fontWeight: "700",
              lineHeight: "64px",
              paddingBottom: "7px",
            }}
          >
            Organize
          </Typography>
          <Typography
            sx={{
              fontSize: "60px",
              fontWeight: "400",
              color: "#4AC959",
              lineHeight: "64px",
              paddingBottom: "52px",
              "@media (max-width:1280px)": {
                textAlign: "center",
              },
            }}
          >
            your daily jobs
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "24px",
              paddingBottom: "43px",
            }}
          >
            The only way to get things done
          </Typography>

          <ButtonComponent
            width="300px"
            height="64px"
            backgroundColor="#4AC959"
            borderRadius="10px"
            sx={{
              "@media (max-width:1280px)": {
                width: "100%",
              },
            }}
            onClick={() => {
              const element = document.getElementById("todo-list-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#FFFFFF",
                textTransform: "initial",
              }}
            >
              Go to To-do list
            </Typography>
          </ButtonComponent>
        </Box>

        <CardMedia
          component="img"
          image="/images/Image_Sample.jpg"
          alt="Imagem de um balcão de cozinha"
          sx={{ width: "443px", height: "481.52px" }}
        />
      </Box>
      {/* Segunda seção */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "75.48px",
        }}
      >
        <Box sx={{ position: "absolute", top: "-28px" }}>
          <CardMedia
            component="img"
            image="/images/Scroll_Icon.png"
            alt="Ícone de flecha"
          />
        </Box>
        <Box sx={{ position: "absolute", zIndex: "-2" }}>
          <CardMedia
            component="img"
            image="/images/Background_Black_Line.png"
            alt="Linha escura de fundo"
            sx={{
              height: "420px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "110px",
            "@media (max-width:1280px)": {
              marginX: "15px",
            },
          }}
        >
          <Typography
            sx={{
              position: "relative",
              fontSize: "60px",
              fontWeight: "600",
              color: "#FFFFFF",
              fontFamily: poppins.style.fontFamily,
              "&::after": {
                borderBottom: "solid 4px #4AC959",
                content: '""',
                position: "absolute",
                width: "297px",
                left: "5px",
                bottom: "6px",
              },
            }}
          >
            To-do List
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "400",
              color: "#FFFFFF",
              paddingTop: "25px",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: "29.26px",
            }}
          >
            Drag and drop to set your main priorities, check when done and
            create what´s new.
          </Typography>
        </Box>
      </Box>
      {/* Terceira seção */}
      <Box id="todo-list-section" sx={{width: "100%", paddingTop: "180px"}}>
        <ToDoListComponent />
      </Box>
      {/* Quarta seção */}
      <Box
        sx={{
          marginTop: "68px",
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: "-1",
          }}
        >
          <CardMedia
            component="img"
            image="/images/Background_Green.png"
            alt="Paella dish"
            sx={{ width: "1080px", height: "520px" }}
          />
        </Box>
        <Typography
          sx={{
            textAlign: "left",
            paddingTop: "80px",
            paddingLeft: "80px",
            fontSize: "48px",
            fontWeight: "700",
            color: "#FFFFFF",
            lineHeight: "52.8px",
            "@media (max-width:1280px)": {
              paddingLeft: "0",
              textAlign: "center",
            },
          }}
        >
          good things
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: "40px",
            paddingLeft: "80px",
            "@media (max-width:1280px)": {
              paddingLeft: "0",
            },
          }}
        >
          <Carousel />
        </Box>
      </Box>
      {/* Quinta seção */}
      <GetInTouchComponent />
      {/* Sexta seção */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          height: "246px",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "38px",
          "@media (max-width:1440px)": {
            backgroundColor: "#000000",
            clipPath: "polygon(0% 15%, 100% 0%, 100% 100%, 0% 100%)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: "-2",
            "@media (max-width:1440px)": {
              display: "none",
            },
          }}
        >
          <CardMedia
            component="img"
            image="/images/Background_Black_Line_2.png"
            alt="Paella dish"
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
          }}
        >
          <CardMedia
            component="img"
            image="/images/Background_Footer.png"
            alt="Paella dish"
          />
        </Box>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            paddingTop: "73px",
            paddingBottom: "28px",
            color: "#FFFFFF",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: "20px",
          }}
        >
          Need help?
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#FFFFFF",
            paddingBottom: "18px",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: "18px",
          }}
        >
          coopers@coopers.pro
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#FFFFFF",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: "17.07px",
          }}
        >
          © 2021 Coopers. All rights reserved.
        </Typography>
      </Box>
    </main>
  );
}
