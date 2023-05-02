import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { Seo } from "src/components/seo";
import { Layout as AuthLayout } from "src/layouts/auth/modern-layout";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});
const Page = () => {
  const router = useRouter();
  const session = useSession();
  const protect = () => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
    return null;
  };
  useEffect(() => {
    protect();
  }, [session]);
  const [jwt, setjwt] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      console.log(res)

      if (res.ok) {
        setjwt(!jwt);
      }
      if (res?.error) {
        if (res.status === 401) {
          toast.error("pleaase check the username and password");
        }
        return handleError(res.error);
      }
    },
  });
  if (jwt) {
    toast.success(`Welcome!,Back ${session.data?.user.name}`);
    localStorage.setItem(
      "access",
      JSON.stringify(session.data?.user.access_token)
    );
    localStorage.setItem(
      "refresh",
      JSON.stringify(session.data?.user.refresh_token)
    );
  }
  return (
    <>
      <Seo title="Login" />
      <div>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant="h5">Log in</Typography>
          <Typography color="text.secondary" variant="body2">
            Don&apos;t have an account? &nbsp;
            <Link href="/signup" underline="hover" variant="subtitle2">
              Register
            </Link>
          </Typography>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
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
            sx={{ mt: 3 }}
            size="large"
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </form>
        <Box sx={{ mt: 3 }}>
          <Link href="/forgot-password" underline="hover" variant="subtitle2">
            Forgot password?
          </Link>
        </Box>
      </div>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout title="Sign In">{page}</AuthLayout>;

export default Page;
