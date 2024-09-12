import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

interface LoadingProps {
  top?: number | string;
  width?: number | string;
}

interface LoadingState {
  loading: boolean;
}

export default function Loading({ top, width }: LoadingProps) {
  const { loading } = useSelector(
    (state: { loading: LoadingState }) => state.loading
  );

  return (
    <Box
      sx={{
        position: "absolute",
        width: width ? width : "100%",
        zIndex: -1,
        top: top,
      }}
    >
      {loading ? <LinearProgress /> : null}
    </Box>
  );
}
