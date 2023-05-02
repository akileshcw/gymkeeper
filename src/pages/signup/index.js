import * as Yup from "yup";
import { useFormik } from "formik";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Button,
  Link,
  MenuItem,
  Select,
  Stack,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import { Seo } from "src/components/seo";
import { Layout as AuthLayout } from "src/layouts/auth/modern-layout";

import Axios from "src/Axios/Axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
const initialValues = {
  email: "",
  name: "",
  password: "",
  role: "",
  org_name: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  name: Yup.string().max(255).required("Name is required"),
  password: Yup.string().min(7).max(255).required("Password is required"),
  role: Yup.string().required("role is Required"),
  org_name: Yup.string().required("required"),
});

const Page = () => {
  const [data, setdata] = useState([]);
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await Axios.post("/signup", values);
        if (res.status === 208) {
          alert("mail is already exist");
        }
        if (res.status === 200) {
          toast.success("Sign up");
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        toast.error("please check ypur internet");
      }
    },
  });
  const org = async () => {
    try {
      const res = await Axios.get("/org_get");
      console.log("Org ",res)
      if (res.status === 200) {
        setdata(res.data);
      }
    } catch (error) {
      toast.error("please check your internet");
    }
  };
  useEffect(() => {
    org();
    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);
  console.log(data);
  return (
    <>
      <Seo title="Register" />
      <div>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant="h5">Register</Typography>
          <Typography color="text.secondary" variant="body2">
            Already have an account? &nbsp;
            <Link href="/" underline="hover" variant="subtitle2">
              Log in
            </Link>
          </Typography>
        </Stack>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <TextField
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />

            <TextField
              name="role"
              label="role"
              error={!!(formik.touched.role && formik.errors.role)}
              fullWidth
              select
              helperText={formik.touched.role && formik.errors.role}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.role || ""}
            >
              <MenuItem value="">role</MenuItem>
              <MenuItem value="students">students</MenuItem>
              <MenuItem value="employee">employee</MenuItem>
              <MenuItem value="others">others</MenuItem>
            </TextField>
            <TextField
              name="org_name"
              label="oragnization"
              error={!!(formik.touched.org_name && formik.errors.org_name)}
              fullWidth
              select
              helperText={formik.touched.org_name && formik.errors.org_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.org_name || ""}
            >
              <MenuItem value="">Select</MenuItem>
              {/* (data.org || []) */}
              {data.org?.map((data, i) => {
                return <MenuItem key={i} value={data.name}>{data.name}</MenuItem>;
              })}
            </TextField>
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
            />
          </Stack>
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout title="Sign up">{page}</AuthLayout>;

export default Page;
