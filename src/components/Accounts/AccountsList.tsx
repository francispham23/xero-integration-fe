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
  const response = await fetch("/data/accounts.json");
  if (!response.ok) {
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
        {data?.Accounts.map((account, index) => (
          <Box mb={2} key={account.AccountID}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {index + 1}. {account.Name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Code: {account.Code}
                    </Typography>
                  </Box>
                  <Chip
                    label={account.Status}
                    color={account.Status === "ACTIVE" ? "success" : "default"}
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
