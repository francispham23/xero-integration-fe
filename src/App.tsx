import { Fragment, useEffect, useState } from "react";
import { QueryProvider } from "./providers/QueryProvider";
import { useTheme } from "@mui/material/styles";
import TabPanel from "./components/TabPanel";
import { Box, Tabs, Tab } from "@mui/material";
import Button from "@mui/material/Button";

import { AccountsList } from "./components/Accounts/AccountsList";
import { VendorsList } from "./components/Vendors/VendorsList";

function App() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const authStatus = urlParams.get("auth");

  const errorMessage = urlParams.get("message");

  useEffect(() => {
    // Check if user is signed in with the same section_id
    if (authStatus === localStorage.getItem("section_id")) {
      setIsSignedIn(true);
    } else if (authStatus === "error") {
      // Show error message to user
      console.error("Authentication failed:", errorMessage);
      setIsSignedIn(false);
      localStorage.removeItem("section_id");
    }
  }, [authStatus, errorMessage]);

  const handleSignIn = async () => {
    const response = await fetch("/api/xero/auth/authorize", {
      credentials: "include",
    });
    const data = await response.json();
    if (data) {
      const { url, section_id } = data;
      localStorage.setItem("section_id", section_id);
      window.location.href = url;
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch("api/xero/auth/disconnect", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        window.location.href = "/";
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
    localStorage.removeItem("section_id");
  };

  return (
    <QueryProvider>
      <Box sx={{ width: "100%" }}>
        {isSignedIn && authStatus ? (
          <Fragment>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
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
              <Button size="large" color="secondary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Box>
          </Fragment>
        ) : (
          <Box sx={{ "& > :not(style)": { m: 0.5 } }}>
            <Button size="large" color="secondary" onClick={handleSignIn}>
              Sign In with Xero
            </Button>
          </Box>
        )}
      </Box>
    </QueryProvider>
  );
}

export default App;
