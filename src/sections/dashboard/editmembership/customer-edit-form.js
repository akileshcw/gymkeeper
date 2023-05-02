import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const formatDate = (date = 0, m = 0, days = 0) => {
  if ((date && m) || (date && days)) {
    var d = new Date(date);
    if (m) {
      d.setMonth(Number(d.getMonth()) + Number(m));
    }
    if (days) {
      d.setDate(Number(d.getDate()) + Number(days));
    }
    var month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  } else {
    return "";
  }
};

export const CustomerEditForm = ({ uuid, id }) => {
  const days = [];
  for (let i = 0; i < 30; i++) {
    days.push(i);
  }
  const formik = useFormik({
    initialValues: {
      mon: "",
      day: "",
      tot_amount: 0,
      amount_paid: 0,
      balance: 0,
      fdate: "",
      todate: "",
      mop: "",
    },
    validationSchema: Yup.object({
      mon: Yup.string().max(255).required("Required"),
      day: Yup.string().max(255).required("Required"),
      tot_amount: Yup.number().required("Required"),
      amount_paid: Yup.number().required("Required"),
      balance: Yup.number().required("Required"),
      fdate: Yup.string().required("Required"),
      todate: Yup.string().required("Required"),
      mop: Yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        const res = await Axios.put(
          `/api/members/membership/${uuid}/edit_membership/${id}`,
          values
        );
        if (res.status === 200) {
          toast.success("Customer updated");
        }
        if (res.status === 401) {
          toast.error("Unauthorized");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Edit Membersip" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.mon && formik.errors.mon)}
                fullWidth
                helperText={formik.touched.mon && formik.errors.mon}
                label="month"
                name="mon"
                select
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.setFieldValue("mon", e.target.value);
                  formik.setFieldValue(
                    "todate",
                    formatDate(
                      formik.values.fdate,
                      e.target.value,
                      formik.values.day
                    )
                  );
                }}
                required
                value={formik.values.mon}
              >
                <MenuItem value="1">1 month</MenuItem>
                <MenuItem value="2">2 month</MenuItem>
                <MenuItem value="3">3 month</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.day && formik.errors.day)}
                fullWidth
                helperText={formik.touched.day && formik.errors.day}
                label="day"
                name="day"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.setFieldValue("day", e.target.value);
                  formik.setFieldValue(
                    "todate",
                    formatDate(
                      formik.values.fdate,
                      formik.values.mon,
                      e.target.value
                    )
                  );
                }}
                select
                value={formik.values.day}
              >
                {days.map((data, i) => {
                  return (
                    <MenuItem key={i} value={data}>
                      {data}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.tot_amount && formik.errors.tot_amount)
                }
                fullWidth
                helperText={
                  formik.touched.tot_amount && formik.errors.tot_amount
                }
                label="total Amount"
                name="tot_amount"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.tot_amount}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.balance && formik.errors.balance)}
                fullWidth
                helperText={formik.touched.balance && formik.errors.balance}
                label="balance"
                name="balance"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.balance}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                error={!!(formik.touched.fdate && formik.errors.fdate)}
                fullWidth
                helperText={formik.touched.fdate && formik.errors.fdate}
                label=" from date"
                name="fdate"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  console.log(e.target.value);
                  formik.setFieldValue("fdate", e.target.value);
                  formik.setFieldValue(
                    "todate",
                    formatDate(
                      e.target.value,
                      formik.values.mon,
                      formik.values.day
                    )
                  );
                }}
                value={formik.values.fdate}
                type="date"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                error={!!(formik.touched.todate && formik.errors.todate)}
                fullWidth
                helperText={formik.touched.todate && formik.errors.todate}
                label="to date"
                name="todate"
                type="date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.todate}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.mop && formik.errors.mop)}
                fullWidth
                helperText={formik.touched.mop && formik.errors.mop}
                label="method of payment"
                name="mop"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mop}
              />
            </Grid>
          </Grid>
          <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}></Stack>
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
  );
};

CustomerEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
