import { Alert, Box } from "@mui/material";

type Props = {
  error: Error;
};

export const ErrorBox = ({ error }: Props) => (
  <Box p={4}>
    <Alert severity="error">Error loading accounts: {error.message}</Alert>
  </Box>
);
