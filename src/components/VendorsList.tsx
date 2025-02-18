import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, Typography, Chip, Stack } from "@mui/material";

import { LoadingBox } from "./LoadingBox";
import { ErrorBox } from "./ErrorBox";

import { fetchVendors } from "../api";

const formatCurrency = (amount: number | undefined) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount ?? 0);
};

export const VendorsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
  });

  if (isLoading) return <LoadingBox />;

  if (error) return <ErrorBox error={error} />;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Vendors
      </Typography>
      <Box>
        {data?.vendors.map((vendor, index) => {
          const outstanding =
            vendor.balances?.accountsPayable?.outstanding ?? 0;
          const overdue = vendor.balances?.accountsPayable?.overdue ?? 0;

          return (
            <Box mb={2} key={vendor.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {index + 1}. {vendor.name}
                      </Typography>

                      <Stack spacing={1}>
                        <Box display="flex" gap={1}>
                          <Typography color="textSecondary" variant="body2">
                            Outstanding:
                          </Typography>
                          <Typography
                            color={outstanding > 0 ? "error" : "success"}
                            variant="body2"
                            fontWeight="medium"
                          >
                            {formatCurrency(outstanding)}
                          </Typography>
                        </Box>

                        <Box display="flex" gap={1}>
                          <Typography color="error" variant="body2">
                            Overdue:
                          </Typography>
                          <Typography
                            color="error"
                            variant="body2"
                            fontWeight="medium"
                          >
                            {formatCurrency(overdue)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Chip
                      label={vendor.status}
                      color={vendor.status === "ACTIVE" ? "success" : "default"}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
