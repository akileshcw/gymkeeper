import CheckIcon from "@untitled-ui/icons-react/build/esm/Check";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export const Modal10 = (props) => {
  const { handleClose } = props;
  return (
    <Box
      sx={{
        p: 3,
        mt: 20,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={12} sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "success.lightest",
                color: "success.main",
                mb: 2,
              }}
            >
              <SvgIcon>
                <WorkspacePremiumIcon />
              </SvgIcon>
            </Avatar>
            <Typography variant="h5">Payment successful</Typography>
            <Typography
              align="center"
              color="text.secondary"
              sx={{ mt: 1 }}
              variant="body2"
            >
              Shaggy
            </Typography>
            <Typography>ID:3</Typography>
          </Box>
          <Stack alignItems="center" direction="row" spacing={3} sx={{ mt: 4 }}>
            <Button
              color="inherit"
              fullWidth
              size="large"
              onClick={handleClose}
            >
              CLose
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
