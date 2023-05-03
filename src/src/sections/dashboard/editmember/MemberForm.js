import { useFormik } from "formik";
import React, { useEffect } from "react";
import formdata from "./FormikData";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  MenuItem,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Box } from "@mui/system";
import { useState } from "react";
import Auth from "src/Axios/Auth";
import { toast } from "react-hot-toast";
import Axios from "src/Axios/Axios";
import { useRouter } from "next/dist/client/router";
const MemberForm = ({ Data }) => {
  const [File, setFile] = useState(null);
  const [url, seturl] = useState();
  const [org, setorg] = useState([]);
  const router = useRouter();
  const Formik = useFormik({
    initialValues: formdata.initialValues,
    validationSchema: formdata.validation,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const formdata = new FormData();
        formdata.append("file", File ? File : Data.image);
        console.log(File);
        Object.entries(values).map((data, i) => {
          formdata.append(data[0], data[1]);
        });
        formdata.append("uuid", Data.uuid);
        const res = await Auth.put("/edit_member", formdata, {
          headers: {
            "Content-Type": "multipart/formdata",
          },
        });
        if (res.status === 200) {
          toast.success("Updated Members");
          router.push("/dashboard/members");
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          toast.error("Unauthorized");
        } else {
          toast.error("Something wen Wrong!");
        }
      }
    },
  });
  useEffect(() => {
    const fetchers = async () => {
      try {
        const res = await Axios.get("/org_get");
        if (res.status === 200) {
          setorg(res.data.org);
        }
      } catch (error) {
        toast.error("please check your internet!");
      }
    };
    fetchers();
  }, []);
  function handleFile(e) {
    try {
      setFile(e.target.files[0]);
      seturl(URL.createObjectURL(e.currentTarget.files[0]));
    } catch (error) {
      setFile((prev) => prev);
      seturl((prev) => prev);
    }
  }
  const form = [
    {
      name: "name",
      type: "text",
      label: "Name",
    },
    {
      name: "profession",
      type: "Select",
      label: "Profession",
      option: ["Student", "Employee", "Other"],
    },
    {
      name: "bloodgroup",
      type: "select",
      label: "BloodGroup",
      option: ["A+", "A-", "B+", "B-", "o+", "o-", "AB+", "AB-"],
    },
    {
      name: "org_name",
      type: "Select",
      label: "Organization",
      option: org.map((data) => {
        return data.name;
      }),
    },
    {
      name: "dob",
      type: "text",
      props: {
        type: "date",
        InputLabelProps: { shrink: true },
      },
      label: "Date Of Birth",
    },
    {
      name: "gender",
      type: "Select",
      label: "Gender",
      option: ["Male", "Female"],
    },
    {
      name: "phonenumber",
      type: "text",
      props: {
        type: "number",
      },
      label: "Phone Number",
    },
  ];
  return (
    <>
      <form onSubmit={Formik.handleSubmit}>
        <Card>
          <CardHeader title="Edit Members" />
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              py: 6,
            }}
          >
            <label htmlFor="image">
              <Avatar
                src={url}
                alt=""
                sx={{ width: 100, height: 100, fontSize: "3rem" }}
              >
                <PersonAddAlt1Icon />
              </Avatar>
            </label>
            <input
              id="image"
              type="file"
              onChange={handleFile}
              name="image"
              accept="image/*"
              hidden
            />
          </Box> */}
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={3}>
              {form.map((data, i) => {
                console.log(Formik.dirty);
                return (
                  <Grid xs={12} lg={6} key={i}>
                    {data.type === "text" ? (
                      <TextField
                        label={data.label}
                        helperText={
                          Formik.touched[data.name] && Formik.errors[data.name]
                        }
                        error={
                          !!(
                            Formik.touched[data.name] &&
                            Formik.errors[data.name]
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                        onInput={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        name={data.name}
                        fullWidth
                        {...data.props}
                        defaultValue={
                          Formik.values[data.name] === ""
                            ? Formik.setFieldValue(data.name, Data[data.name])
                            : Formik.values[data.name]
                        }
                      />
                    ) : (
                      <TextField
                        label={data.label}
                        name={data.name}
                        InputLabelProps={{ shrink: true }}
                        helperText={
                          Formik.touched[data.name] &&
                          Formik.errors[data.name] &&
                          Formik.errors[data.name]
                        }
                        error={
                          Formik.touched[data.name] &&
                          Formik.errors[data.name] &&
                          Formik.errors[data.name]
                        }
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        fullWidth
                        select
                        {...data.props}
                        value={
                          (Formik.values[data.name] === ""
                            ? Formik.setFieldValue(data.name, Data[data.name])
                            : Formik.values[data.name]) || ""
                        }
                      >
                        <MenuItem value="">Select</MenuItem>
                        {data?.option.map((data, i) => {
                          return (
                            <MenuItem value={data} key={i}>
                              {data}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            flexWrap="wrap"
            spacing={3}
            sx={{ p: 3 }}
          >
            <Button type="submit" variant="contained">
              submit
            </Button>
          </Stack>
        </Card>
      </form>
    </>
  );
};

export default MemberForm;
