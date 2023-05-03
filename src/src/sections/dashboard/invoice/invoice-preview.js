import {
  Box,
  Card,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Image from "next/image";
import logo from "public/assets/GYM/raw_fitness_logo-01.png";

export const InvoicePreview = ({ data }) => {
  const mem = data.membership[0];
  console.log(mem);
  return (
    <Card sx={{ p: 6 }}>
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <div>
          <Box
            sx={{
              display: "inline-flex",
              height: 24,
              width: 24,
            }}
          >
            <Image src={logo} alt="" width={24} height={24} />
          </Box>
          <Typography variant="subtitle2">RAW FITNESS</Typography>
        </div>
        <div>
          <Typography align="right" color="success.main" variant="h4">
            {mem.id}
          </Typography>
        </div>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <Grid container justifyContent="space-between">
          <Grid xs={12} md={4}>
            <Typography variant="h6">Month</Typography>
            <Typography variant="body2">{mem.month}</Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography variant="h6">Days</Typography>
            <Typography variant="body2">{mem.days}</Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography align="right" variant="body2">
              Amount
              <br />
              {mem.tot_amount}
            </Typography>
            <Typography align="right" variant="body2">
              Amount Paid
              <br />
              {mem.amount_paid}
            </Typography>
            <Typography align="right" variant="body2">
              Amount Balance
              <br />
              {mem.balance}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Grid container justifyContent="space-between">
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant="subtitle2">
              From Date
            </Typography>
            <Typography variant="body2">{mem.frmdate}</Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant="subtitle2">
              Expired Date
            </Typography>
            <Typography variant="body2">{mem.todate}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
