import {
  Box,
  Button,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Auth from "src/Axios/Auth";

export const Form4 = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [opass, setopass] = useState("");
  const [npass, setnpass] = useState("");
  const [cpass, setcpass] = useState("");
  const session = useSession();
  const handleSubmit = async () => {
    try {
      if (opass !== "" && npass !== "" && cpass !== "") {
        const res = await Auth.put("/profile/edit_profile", {
          opass,
          npass,
          cpass,
          uuid: session.data.user.uuid,
        });
        if (res.status === 200) {
          toast.success("Updated Profile");
        }
        if (re.status === 401) {
          toast.error("Wrong Password");
        }
      } else if (name !== "" && email !== "") {
        const res = await Auth.put("/profile/edit_profile", {
          uuid: session.data.user.uuid,
          name,
          email,
        });

        if (res.status === 200) {
          toast.success("Updated Profile");
          session.update({ name, email });
        }
        if (res.status === 401) {
          toast.error("Wrong Password");
        }
      } else {
        toast.error("Please Enter the fields");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !");
    }
  };
  return (
    <Box sx={{ p: 3 }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="name"
              name="password"
              type="text"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="email"
              name="password"
              type="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="old Password"
              name="password"
              type="password"
              onChange={(e) => {
                setopass(e.target.value);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="new Password"
              name="password"
              type="password"
              onChange={(e) => {
                setnpass(e.target.value);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Password Confirmation"
              name="passwordConfirm"
              type="password"
              onChange={(e) => {
                setcpass(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ pt: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" type="submit" variant="contained">
            submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
