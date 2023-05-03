import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Divider,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
const bloodgroup = ["o+", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const tabs = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Student",
    value: "Student",
  },
  {
    label: "Employee",
    value: "Employee",
  },
  {
    label: "Others",
    value: "others",
  },
];

export const CustomerListSearch = (props) => {
  const { handleClient, handlename, handlephone } = props;

  return (
    <>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
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
            placeholder="Search number"
            onChange={handlephone}
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
            placeholder="Search ClientId"
            onChange={handleClient}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
      </Stack>
    </>
  );
};
