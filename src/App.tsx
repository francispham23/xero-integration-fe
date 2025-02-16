import { useState } from "react";
import { QueryProvider } from "./providers/QueryProvider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./components/TabPanel.tsx";
import { useTheme } from "@mui/material/styles";

function App() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <QueryProvider>
      <Box sx={{ width: "100%" }}>
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
          Accounts List
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Vendors List
        </TabPanel>
      </Box>
    </QueryProvider>
  );
}

export default App;
