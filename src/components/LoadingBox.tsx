import { Box, CircularProgress } from "@mui/material";

export const LoadingBox = () => {
  return (
    <Box display="flex" justifyContent="center" p={4}>
      <CircularProgress />
    </Box>
  );
};
