import { useEffect, useState } from "react";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Divider,
  OutlinedInput,
  SvgIcon,
  InputAdornment,
  TextField,
} from "@mui/material";
import { GroupedList6 } from "../grouped-lists/grouped-list-6";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import Auth from "src/Axios/Auth";

export const Search = () => {
  const [searchitem, setsearchitem] = useState("");
  const [date, setdate] = useState("");
  const [data, setdata] = useState([]);
  const handleRequest = async () => {
    try {
      const res = await Auth.get("/attendance");
      if (res.status === 200) {
        setdata(res.data.user);
      } else if (res.status === 401) {
        toast.error("You're  not authenticated");
      }
    } catch (error) {
      toast.error("Please Check your Internet");
    }
  };
  useEffect(() => {
    console.log(searchitem, date);
    handleRequest();
    return () => {
      console.log("");
    };
  }, [searchitem, date]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container p={2} spacing={2}>
        <Grid md={6} xs={12}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            type="number"
            placeholder="Search Client ID"
            onChange={(e) => {
              setsearchitem(e.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid md={6} xs={12}>
          <TextField
            fullWidth
            label="Date"
            InputLabelProps={{ shrink: true }}
            type="date"
            onChange={(e) => {
              setdate(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Divider />
      {data && <GroupedList6 data={data} />}
    </Box>
  );
};
