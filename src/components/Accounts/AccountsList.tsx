import { useQuery } from "@tanstack/react-query";
import { AccountsResponse } from "../../types/accounts";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";

const fetchAccounts = async (): Promise<AccountsResponse> => {
  const response = await fetch("api/xero/local/accounts", {
    credentials: "include",
  });
  if (!response.ok) {
    localStorage.removeItem("section_id");
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};

export const AccountsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">Error loading accounts: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Accounts
      </Typography>
      <Box>
        {data?.accounts.map((account, index) => (
          <Box mb={2} key={account.id}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {index + 1}. {account.name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Code: {account.code}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Account ID: {account.id}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Description: {account.description}
                    </Typography>
                  </Box>
                  <Chip
                    label={account.status}
                    color={account.status === "ACTIVE" ? "success" : "default"}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
