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
import { Seo } from "src/components/seo";
import { Layout as AuthLayout } from "src/layouts/auth/modern-layout";
import { toast } from "react-hot-toast";
import Axios from "src/Axios/Axios";
import { useRouter } from "next/router";
const initialValues = {
  password: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(7, "Must be at least 7 characters")
    .max(255)
    .required("Required"),
});

const Page = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await Axios.put(
          `/reset_password/${router.query.token}`,
          values
        );
        if (res.status === 200) {
          toast.success("password is changed");
          router.push("/");
        }
        if (res.status === 401) {
          toast.error("Link Expired");
        }
      } catch (error) {
        toast.error("please check the internet");
      }
    },
  });

  return (
    <>
      <Seo title="Reset Password" />
      <div>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant="h5">Reset password</Typography>
        </Stack>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
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
            Reset
          </Button>
        </form>
      </div>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
