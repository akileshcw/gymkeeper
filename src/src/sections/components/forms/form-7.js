import {
  Box,
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import axios from "axios";
import Axios from "src/Axios/Axios";
export const Form7 = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
      bloodgroup: "",
      organization: "",
      gender: "",
      dob: "",
      phonenumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("required"),
      profession: Yup.string().required("required"),
      bloodgroup: Yup.string().required("required"),
      organization: Yup.string().required("required"),
      dob: Yup.string().required("required"),
      phonenumber: Yup.number()
        .max(10, "Phone Number is 10-digit")
        .min(10, "Phone Number is 10-digit")
        .required("required"),
    }),
    onSubmit: async (values) => {
      try {
        const formdata = new FormData();
        formdata.append("file", file);
        Object.entries(values).map((data, i) => {
          formdata.append(data[0], data[1]);
        });

        const res = await axios.post(
          "http://localhost:5000/add_member",
          formdata,
          {
            Headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status === 208) {
          toast.error("Phone Number is already Exist");
        }
        if (res.status === 200) {
          toast.success("Member Updated");
          setFile(null);
          seturl("");
          formik.handleReset();
        }
      } catch (error) {
        console.log(error);
        toast.error("Please Check your Internet");
      }
    },
  });
  const bld = ["A+", "A-", "B+", "B-", "o+", "o-", "AB+", "AB-"];
  const prf = ["Students", "Employee", "Others"];
  const [file, setFile] = useState();
  const [url, seturl] = useState("");
  const [org, setorg] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await Axios.get("/org_get");
        if (res.status === 200) {
          setorg(res.data.org);
          console.log(org);
        }
      } catch (e) {
        toast.error("please check the internet !");
      }
    };
    fetcher();
    return () => {};
  }, []);
  const form = [
    { name: "name", label: "Name" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      option: ["Male", "Female"],
    },
    { name: "profession", label: "Profession", type: "select", option: prf },
    { name: "bloodgroup", label: "Bloodgroup", type: "select", option: bld },
    {
      name: "organization",
      label: "Organization",
      type: "select",
      option: org.map((data, i) => {
        return data.name;
      }),
    },
    {
      name: "dob",
      label: "Date of Birth",
      props: {
        type: "date",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    {
      name: "phonenumber",
      label: "Phone Number",
      props: {
        type: "number",
      },
    },
  ];
  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader title={"Register"} sx={{ p: 3 }} />
          <CardContent sx={{ pt: 0 }}>
            {/* */}
            <Grid container spacing={3}>
              {form.map((data, i) => {
                return (
                  <Grid xs={12} lg={6} key={i}>
                    <TextField
                      fullWidth
                      label={data.label}
                      name={data.name}
                      error={
                        !!(
                          formik.touched[data.name] && formik.errors[data.name]
                        )
                      }
                      helperText={
                        formik.touched[data.name] && formik.errors[data.name]
                      }
                      select={data.type === "select" && true}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values[data.name]}
                      {...data.props}
                    >
                      <MenuItem value="">select</MenuItem>
                      {data?.option?.map((data, i) => {
                        return (
                          <MenuItem value={data} key={i}>
                            {data}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                );
              })}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
              }}
            >
              <Button
                color="primary"
                size="large"
                variant="contained"
                type="submit"
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};
