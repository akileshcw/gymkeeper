import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
  Drawer,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";

const customers = [
  "Blind Spots Inc.",
  "Dispatcher Inc.",
  "ACME SRL",
  "Novelty I.S",
  "Beauty Clinic SRL",
  "Division Inc.",
];

export const InvoiceListSidebar = (props) => {
  const {
    onClose,
    open,
    handleClient,
    handlename,
    handlephone,
    handleFiltersToggle,
  } = props;

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const content = (
    <div>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        sx={{ p: 3 }}
      >
        <Typography variant="h5">Filters</Typography>
        {!lgUp && (
          <IconButton onClick={handleFiltersToggle}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search Name"
          onChange={handlename}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon>
                <SearchMdIcon />
              </SvgIcon>
            </InputAdornment>
          }
        />
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search ClientID"
          onChange={handleClient}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon>
                <SearchMdIcon />
              </SvgIcon>
            </InputAdornment>
          }
        />

        <OutlinedInput
          defaultValue=""
          fullWidth
          onChange={handlephone}
          type="number"
          placeholder="Search phonenumber"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon>
                <SearchMdIcon />
              </SvgIcon>
            </InputAdornment>
          }
        />
      </Stack>
    </div>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={open}
        PaperProps={{
          elevation: 16,
          sx: {
            border: "none",
            borderRadius: 2.5,
            overflow: "hidden",
            position: "relative",
            width: 380,
          },
        }}
        variant="persistent"
        sx={{ p: 3 }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        sx: {
          pointerEvents: "none",
          position: "absolute",
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: "100%",
          width: 380,
          pointerEvents: "auto",
          position: "absolute",
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
