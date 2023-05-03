import {
  Box,
  Button,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Auth from "src/Axios/Auth";
import * as Yup from "yup";
export const Form4 = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      opass: "",
      npass: "",
      cpass: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      opass: Yup.string(),
      npass: Yup.string(),
      cpass: Yup.string(),
    }),
    onSubmit: async (values) => {
      const { opass, npass, cpass, email, name } = values;
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
            session.data.user.email = email;
            session.data.user.name = name;
            formik.handleReset();
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
    },
  });
  const session = useSession();
  const form = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "opass",
      label: "Old Password",
    },
    {
      name: "npass",
      label: "New Password",
    },
    {
      name: "cpass",
      label: "Confirm Password",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {form.map((d, i) => {
            return (
              <Grid xs={12} sm={6} md={4} key={i}>
                <TextField
                  fullWidth
                  label={d.label}
                  name={d.name}
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={formik.touched[d.name] && formik.errors[d.name]}
                  error={!!(formik.touched[d.name] && formik.errors[d.name])}
                  value={formik.values[d.name] || ""}
                />
              </Grid>
            );
          })}
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
