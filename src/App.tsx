import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material/styles";
import { Box, Tabs, Tab } from "@mui/material";
import Button from "@mui/material/Button";

import TabPanel from "./components/TabPanel";
import { VendorsList } from "./components/VendorsList";
import { AccountsList } from "./components/AccountsList";

import { fetchAuth, fetchDisconnect } from "./api";
import { LoadingBox } from "./components/LoadingBox";

function App() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const { data: authResData, refetch: handleSignIn } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
    enabled: false,
  });

  const { isLoading, refetch: disconnect } = useQuery({
    queryKey: ["disconnect"],
    queryFn: fetchDisconnect,
    enabled: false,
  });

  const urlParams = new URLSearchParams(window.location.search);
  const errorMessage = urlParams.get("message");
  const authStatus = urlParams.get("auth");

  const isAuthed =
    authStatus !== null && authStatus === localStorage.getItem("section_id");

  useEffect(() => {
    // Handle invalid authentication parameters
    if (authStatus)
      if (errorMessage) {
        // Show error message to user
        console.error("Authentication failed:", errorMessage);
      } else if (authStatus !== localStorage.getItem("section_id")) {
        window.location.href = "/";
        localStorage.setItem("section_id", "");
      }
  }, [authStatus, isAuthed, errorMessage]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const handleSignOut = () => {
    disconnect();
    localStorage.setItem("section_id", "");
  };

  if (authResData || isLoading) {
    const { url, section_id } = authResData;
    localStorage.setItem("section_id", section_id);
    window.location.href = url;

    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingBox />
      </Box>
    );
  }

  if (!isAuthed) {
    return (
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
  }

  return (
    <Fragment>
      <Tabs value={value} onChange={handleChange} aria-label="primary tabs">
        <Tab value={0} label="Accounts" />
        <Tab value={1} label="Vendors" />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <AccountsList />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <VendorsList />
      </TabPanel>
      <Box
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          m: 1,
        }}
      >
        <Button size="large" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>
    </Fragment>
  );
}

export default App;
