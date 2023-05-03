import { signOut } from "next-auth/react";
import User03Icon from "@untitled-ui/icons-react/build/esm/User03";
import {
  Box,
  Button,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Typography,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";

import { useRouter } from "src/hooks/use-router";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
      {...other}
    >
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          component={RouterLink}
          href="/dashboard/profile"
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <User03Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Profile</Typography>}
          />
        </ListItemButton>
      </Box>
      <Divider sx={{ my: "0 !important" }} />
      <Box
        sx={{
          display: "flex",
          p: 1,
          justifyContent: "center",
        }}
      >
        <Button color="inherit" size="small" onClick={signOut}>
          Logout
        </Button>
      </Box>
    </Popover>
  );
};
