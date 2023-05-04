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
import Auth from "src/Axios/Auth";
import { useRouter } from "next/router";

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

export const CustomerEditForm = (props) => {
  const { months, days, id } = props;
  const router = useRouter();
  const mop = ["CASH", "UPI", "CARD", "OTHERS"];
  const formik = useFormik({
    initialValues: {
      mon: "",
      days: "",
      tot_amount: 0,
      amount_paid: 0,
      balance: 0,
      fdate: "",
      todate: "",
      mop: "",
    },
    validationSchema: Yup.object({
      mon: Yup.string().max(255).required("Required"),
      days: Yup.string().max(255).required("Required"),
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
        const res = await Auth.post(
          `/members/membership/${id}/add_membership`,
          { ...values, uuid: id }
        );
        if (res.status === 200) {
          toast.success("Membership updated");
          router.push("/dashboard/memberships");
          formik.handleReset();
        } else if (res.status === 401) {
          toast.error("Unauthorized");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    },
  });
  const form = [
    {
      name: "mon",
      label: "Month",
      onchange: (e) => {
        console.log("name");
        formik.setFieldValue("mon", e.target.value);
        formik.setFieldValue(
          "todate",
          formatDate(formik.values.fdate, e.target.value, formik.values.days)
        );
      },
      type: "select",
      option: months,
    },
    {
      name: "days",
      label: "Days",
      onchange: (e) => {
        formik.setFieldValue("days", e.target.value);
        formik.setFieldValue(
          "todate",
          formatDate(formik.values.fdate, formik.values.mon, e.target.value)
        );
      },
      type: "select",
      option: days,
    },
    {
      name: "tot_amount",
      label: "Total Amount",
      props: {
        type: "number",
      },
    },
    {
      name: "amount_paid",
      label: "Amount Paid",
      props: {
        type: "number",
      },
    },
    {
      name: "balance",
      label: "Balance",
      props: {
        type: "number",
      },
    },
    {
      name: "fdate",
      label: "From Date",
      props: {
        type: "date",
        InputLabelProps: {
          shrink: true,
        },
      },
      onchange: (e) => {
        formik.setFieldValue("fdate", e.target.value);
        formik.setFieldValue(
          "todate",
          formatDate(e.target.value, formik.values.mon, formik.values.days)
        );
      },
    },
    {
      name: "todate",
      label: "To Date",
      props: {
        type: "date",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    {
      name: "mop",
      label: "Method of Payment",
      type: "select",
      option: mop,
    },
  ];
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title={props.title} sx={{ p: 3 }} />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            {form.map((data, i) => {
              return (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={data.label}
                    name={data.name}
                    error={
                      !!(formik.touched[data.name] && formik.errors[data.name])
                    }
                    helperText={
                      formik.touched[data.name] && formik.errors[data.name]
                    }
                    select={data.type === "select" && true}
                    onBlur={formik.handleBlur}
                    onChange={
                      data.onchange ? data.onchange : formik.handleChange
                    }
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
