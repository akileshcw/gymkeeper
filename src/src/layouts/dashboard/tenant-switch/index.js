import PropTypes from "prop-types";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import { Box, IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import { usePopover } from "src/hooks/use-popover";
import { TenantPopover } from "./tenant-popover";

const tenants = ["Devias", "Acme Corp"];

export const TenantSwitch = (props) => {
  const popover = usePopover();

  return (
    <>
      <Stack alignItems="center" direction="row" spacing={2} {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="inherit" variant="h6">
            Raw Fitness
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
