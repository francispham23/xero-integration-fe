import { Box, Button } from "@mui/material";

type Props = {
  handleSignIn: () => void;
};

export const SignInBox = ({ handleSignIn }: Props) => (
  <Box sx={{ m: 0.5, width: 200 }}>
    <Button
      fullWidth
      size="large"
      variant="outlined"
      onClick={() => handleSignIn()}
    >
      Sign In with Xero
    </Button>
  </Box>
);
