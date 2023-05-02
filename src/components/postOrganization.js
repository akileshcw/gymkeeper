import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  OutlinedInput,
  Paper,
  SvgIcon,
  Typography,
} from "@mui/material";

export const PostOrganization = () => (
  <Box>
    <Paper>
      <Box sx={{ p: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ p: 3 }}>
            Post Organization
          </Typography>
        </Box>
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <OutlinedInput
              fullWidth
              placeholder="post Organization"
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon>
                    <SendIcon />
                  </SvgIcon>
                </InputAdornment>
              }
            />
            <Button size="large" sx={{ ml: 2 }} variant="contained">
              Post
            </Button>
          </Box>
        </Container>
      </Box>
    </Paper>
  </Box>
);
