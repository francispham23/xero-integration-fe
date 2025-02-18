import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Tabs, Tab } from "@mui/material";

import TabPanel from "./components/TabPanel";
import { SignInBox } from "./components/SignInBox";
import { SignOutBox } from "./components/SignOutBox";
import { LoadingBox } from "./components/LoadingBox";
import { VendorsList } from "./components/VendorsList";
import { AccountsList } from "./components/AccountsList";

import { fetchAuth, fetchDisconnect } from "./api";

function App() {
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

    // Redirect to Xero OAuth2 login page
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

  if (!isAuthed) return <SignInBox handleSignIn={handleSignIn} />;

  return (
    <Fragment>
      <Tabs value={value} onChange={handleChange} aria-label="primary tabs">
        <Tab value={0} label="Accounts" />
        <Tab value={1} label="Vendors" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AccountsList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VendorsList />
      </TabPanel>
      <SignOutBox handleSignOut={handleSignOut} />
    </Fragment>
  );
}

export default App;
