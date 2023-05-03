import * as Yup from "yup";
import { useFormik } from "formik";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Box,
  Button,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { Layout as AuthLayout } from "src/layouts/auth/modern-layout";
import { paths } from "src/paths";
import Axios from "src/Axios/Axios";
import { toast } from "react-hot-toast";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});

const Page = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await Axios.post("/forget_password", values);
        if (res.status === 208) {
          toast.success("Already mail has Been sent");
        } else if (res.status === 200) {
          toast.success("Mail has been sented");
        }
      } catch (error) {
        toast.success("please check Your Internet");
      }
    },
  });

  return (
    <>
      <Seo title="Forgot Password" />
      <div>
        <Box sx={{ mb: 4 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href="/"
            sx={{
              alignItems: "center",
              display: "inline-flex",
            }}
            underline="hover"
          >
            <SvgIcon sx={{ mr: 1 }}>
              <ArrowLeftIcon />
            </SvgIcon>
            <Typography variant="subtitle2">Login</Typography>
          </Link>
        </Box>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant="h5">Forgot password</Typography>
        </Stack>
        <form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
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
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
          >
            Send reset link
          </Button>
        </form>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout title="Forgot password">{page}</AuthLayout>
);

export default Page;
