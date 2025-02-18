import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";

import { LoadingBox } from "./LoadingBox";
import { ErrorBox } from "./ErrorBox";

import { fetchAccounts } from "../api";

export const AccountsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  if (isLoading) return <LoadingBox />;

  if (error) return <ErrorBox error={error} />;

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
