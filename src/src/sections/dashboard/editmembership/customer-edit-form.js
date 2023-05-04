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
import { useRouter } from "next/dist/client/router";
import Auth from "src/Axios/Auth";
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

export const CustomerEditForm = ({ uuid, id, Data }) => {
  const days = [];
  const router = useRouter();
  const data = Data.membership[0];
  const mop = ["CASH", "UPI", "CARD", "OTHERS"];
  for (let i = 0; i < 30; i++) {
    days.push(i);
  }
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
    onSubmit: async (values) => {
      console.log("nakku");
      try {
        // NOTE: Make API request
        const res = await Auth.put(
          `/members/membership/${uuid}/edit_membership/${id}`,
          values
        );
        if (res.status === 200) {
          toast.success("Updated Membership!");
          formik.handleReset();
          router.push("/dashbord/memberships/");
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
      option: [1, 2, 3],
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
        <CardHeader title="Edit Membersip" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            {form.map((d, i) => {
              return (
                <Grid lg={6} md={6} sm={12}>
                  <TextField
                    fullWidth
                    label={d.label}
                    name={d.name}
                    error={formik.touched[d.name] && formik.errors[d.name]}
                    helperText={formik.touched[d.name] && formik.errors[d.name]}
                    onBlur={formik.handleBlur}
                    onChange={d.onchange ? d.onchange : formik.handleChange}
                    defaultValue={data[d.name]}
                    select={d.type === "select" && true}
                    defaultValue={
                      formik.values[d.name] === ""
                        ? formik.setFieldValue(d.name, data[d.name])
                        : formik.values[d.name]
                    }
                    {...d.props}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {d?.option?.map((data, i) => {
                      return (
                        <MenuItem key={data} value={data}>
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
        {JSON.stringify(formik.values)}
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
