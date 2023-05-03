import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import { Avatar, Box, ButtonBase, SvgIcon } from "@mui/material";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import { useSession } from "next-auth/react";
import { getInitials } from "src/utils/get-initials";

export const AccountButton = () => {
  const popover = usePopover();
  const session = useSession();
  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "divider",
          height: 40,
          width: 40,
          borderRadius: "50%",
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
          }}
        >
          {getInitials(session?.data?.user?.name)}
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
