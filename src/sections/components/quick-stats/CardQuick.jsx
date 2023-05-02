import React from "react";
import CurrencyDollarIcon from "@untitled-ui/icons-react/build/esm/CurrencyDollar";
import FolderIcon from "@untitled-ui/icons-react/build/esm/Folder";
import {
  Avatar,
  Box,
  Card,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
const CardQuick = ({ data, icons }) => {
  console.log(data);
  return (
    <>
      <Grid xs={12} md={6} lg={3}>
        <Card>
          <Stack alignItems="center" direction="row" spacing={2} sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
              <Typography color="text.secondary" variant="overline">
                {data[0]}
              </Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Typography variant="h5">{data[1]}</Typography>
              </Stack>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>{icons[data[0]]}</SvgIcon>
            </Avatar>
          </Stack>
        </Card>
      </Grid>
    </>
  );
};

export default CardQuick;
