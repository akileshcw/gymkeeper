import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { usePopover } from "src/hooks/use-popover";
import { useSession } from "next-auth/react";

const tenants = ["Devias", "Acme Corp"];

export const TenantSwitch = (props) => {
  const popover = usePopover();
  const session = useSession();
  return (
    <>
      <Stack alignItems="center" direction="row" spacing={2} {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="inherit" variant="h6">
            {session?.data?.user?.org_name.toUpperCase()}
          </Typography>
          <Typography color="neutral.400" variant="body2">
            GYM
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

TenantSwitch.propTypes = {
  sx: PropTypes.object,
};
