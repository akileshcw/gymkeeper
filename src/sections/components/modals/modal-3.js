import XIcon from "@untitled-ui/icons-react/build/esm/X";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  SvgIcon,
} from "@mui/material";

export const Modal3 = () => (
  <Box>
    <Paper>
      <Box sx={{ p: 3 }}>
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <OutlinedInput
              fullWidth
              placeholder="Search..."
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchMdIcon />
                  </SvgIcon>
                </InputAdornment>
              }
            />
            <Button size="large" sx={{ ml: 2 }} variant="contained">
              Search
            </Button>
          </Box>
        </Container>
      </Box>
    </Paper>
  </Box>
);
