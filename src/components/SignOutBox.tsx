import { Box, Button } from "@mui/material";

type Props = {
  handleSignOut: () => void;
};

export const SignOutBox = ({ handleSignOut }: Props) => (
  <Box
    sx={{
      position: "absolute",
      top: 4,
      right: 4,
      m: 1,
    }}
  >
    <Button size="large" onClick={() => handleSignOut()}>
      Sign Out
    </Button>
  </Box>
);
