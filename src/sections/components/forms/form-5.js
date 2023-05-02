import {
  Autocomplete,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Axios from "src/Axios/Axios";
import * as Yup from "yup";
const countries = [
  { text: "Jersey", value: "JE" },
  { text: "Jordan", value: "JO" },
  { text: "Kazakhstan", value: "KZ" },
  { text: "Kenya", value: "KE" },
  { text: "Kiribati", value: "KI" },
  { text: "Korea, Democratic People'S Republic of", value: "KP" },
  { text: "Korea, Republic of", value: "KR" },
  { text: "Kuwait", value: "KW" },
  { text: "Kyrgyzstan", value: "KG" },
  { text: "Lao People'S Democratic Republic", value: "LA" },
];

export const Form5 = () => {
  const [org, setorg] = useState(null);

  useEffect(() => {
    const orgFetch = async () => {
      try {
        const res = await Axios.get("/org_get");
        if (res.status === 200) {
          setorg(res.data.org);
          console.log(org);
        }
      } catch (error) {
        console.log(error);
      }
    };
    orgFetch();
  }, []);
  const formik = useFormik({
    initialValues: {
      package_name: "",
      amount: "",
      org_name: "",
    },
    validationSchema: Yup.object({
      package_name: Yup.string().required("Required"),
      amount: Yup.string().required("Required"),
      org_name: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await Axios.post("/api/add_package");
        if (res.status === 200) {
          toast.success("Package Updated");
        }
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    },
  });
  const form = [
    {
      name: "package_name",
      label: "Package Name",
    },
    {
      name: "amount",
      label: "Amount",
    },
    {
      name: "org_name",
      label: "Organization",
      type: "select",
    },
  ];
  return (
    <Box sx={{ p: 3, boxShadow: 7 }}>
      <form onSubmit={(event) => event.preventDefault()}>
        <CardHeader title="Package" />
        <CardContent>
          <Grid container spacing={4}>
            {form.map((data, i) => {
              return (
                <Grid xs={12} md={6} key={i}>
                  <TextField
                    fullWidth
                    label={data.label}
                    name={data.name}
                    error={
                      !!(formik.touched[data.name] && formik.errors[data.name])
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched[data.name] && formik.errors[data.name]
                    }
                    select={data.type === "select" && true}
                    value={formik.values[data.name]}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {org?.map((data, i) => {
                      return (
                        <MenuItem value={data.name} key={i}>
                          {data.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" type="submit" variant="contained">
            Post
          </Button>
        </CardActions>
      </form>
    </Box>
  );
};
