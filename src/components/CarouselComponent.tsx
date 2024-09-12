import { Box, CardMedia, Typography } from "@mui/material";

export default function Carousel() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1120,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          "@media (max-width:1280px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            boxShadow: "8px 8px 24px 0px #0C29D029",
            borderRadius: " 16px",
          }}
        >
          <CardMedia
            component="img"
            image="/images/Image_Sample_4.png"
            alt="Dois caras rindo e olhando para um notebook"
            sx={{ width: "100%", height: "auto" }}
          />
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              maxWidth: "360px",
              position: "relative",
              width: "100%",
              height: "230px",
              alignItems: "center",
              padding: " 0 32px 23px 32px",
              display: "flex",
              justifyContent: "initial",
              flexDirection: "column",
              borderBottomRightRadius: "16px",
              borderBottomLeftRadius: "16px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-28px",
                right: "20px",
              }}
            >
              <CardMedia
                component="img"
                image="/images/Little_Arrow.png"
                alt="Pequena flecha verde"
              />
            </Box>
            <Typography
              sx={{
                paddingTop: "71px",
                width: "100%",
                fontSize: "18px",
                paddingBottom: "68px",
                fontWeight: "400",
                color: "#312F4F",
                lineHeight: "21.6px",
              }}
            >
              Organize your daily job enhance your life performance
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#42D76B",
                fontWeight: "700",
                width: "100%",
              }}
            >
              read more
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: "8px 8px 24px 0px #0C29D029",
            borderRadius: " 16px",
          }}
        >
          <CardMedia
            component="img"
            image="/images/Image_Sample_3.png"
            alt="Homem de cabelo grisalho pintando"
            sx={{ width: "100%", height: "auto" }}
          />
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              maxWidth: "360px",
              position: "relative",
              width: "100%",
              height: "230px",
              alignItems: "center",
              padding: " 0 32px 23px 32px",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              borderBottomRightRadius: "16px",
              borderBottomLeftRadius: "16px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-28px",
                right: "20px",
              }}
            >
              <CardMedia
                component="img"
                image="/images/Little_Arrow.png"
                alt="Pequena flecha verde"
              />
            </Box>
            <Typography
              sx={{
                paddingTop: "71px",
                width: "100%",
                fontSize: "18px",
                paddingBottom: "46px",
                fontWeight: "400",
                maxWidth: "293px",
                color: "#312F4F",
                lineHeight: "21.6px",
              }}
            >
              Mark one activity as done makes your brain understands the power
              of doing.
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#42D76B",
                fontWeight: "700",
                width: "100%",
              }}
            >
              read more
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: "8px 8px 24px 0px #0C29D029",
            borderRadius: " 16px",
          }}
        >
          <CardMedia
            component="img"
            image="/images/Image_Sample_2.png"
            alt="Alguém costurando algo"
            sx={{ width: "100%", height: "auto" }}
          />
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              maxWidth: "360px",
              position: "relative",
              width: "100%",
              height: "230px",
              alignItems: "center",
              padding: " 0 32px 23px 32px",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              borderBottomRightRadius: "16px",
              borderBottomLeftRadius: "16px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-28px",
                right: "20px",
              }}
            >
              <CardMedia
                component="img"
                image="/images/Little_Arrow.png"
                alt="Pequena flecha verde"
              />
            </Box>
            <Typography
              sx={{
                paddingTop: "71px",
                width: "100%",
                fontSize: "18px",
                paddingBottom: "46px",
                fontWeight: "400",
                color: "#312F4F",
                lineHeight: "21.6px",
              }}
            >
              Careful with missunderstanding the difference between a list of
              things and a list of desires.
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#42D76B",
                fontWeight: "700",
                width: "100%",
              }}
            >
              read more
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "127px",
          position: "relative",
          paddingTop: "33px",
          right: "40px",
          "@media (max-width:1280px)": {
            right: "0",
          },
        }}
      >
        <Box
          sx={{
            width: "29px",
            height: "29px",
            backgroundColor: "#4AC959",
            borderRadius: "50%",
          }}
        ></Box>
        <Box
          sx={{
            width: "29px",
            height: "29px",
            backgroundColor: "#C4C4C4",
            borderRadius: "50%",
          }}
        ></Box>
        <Box
          sx={{
            width: "29px",
            height: "29px",
            backgroundColor: "#C4C4C4",
            borderRadius: "50%",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
