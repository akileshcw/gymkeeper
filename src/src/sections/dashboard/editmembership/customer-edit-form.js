import PropTypes, { number } from "prop-types";
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
import ImageUploader from "src/components/ImageUploader";
import { useState } from "react";
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
  const Datas = Data.membership[0];
  const mop = ["CASH", "UPI", "CARD", "OTHERS"];
  for (let i = 0; i < 30; i++) {
    days.push(i);
  }
  console.log(Datas);
  const formik = useFormik({
    initialValues: Datas,
    validationSchema: Yup.object({
      month: Yup.string().max(255).required("Required"),
      days: Yup.string().max(255).required("Required"),
      tot_amount: Yup.number().required("Required"),
      amount_paid: Yup.number()
        .test(
          "validate the total amount",
          "amount should be under the total amount",
          (value, { parent }) => {
            return parent.tot_amount > value;
          }
        )
        .required("Required"),
      balance: Yup.number()
        .test(
          "validate the total amount",
          "amount should be under the total amount",
          (value, { parent }) => {
            return parent.tot_amount > value;
          }
        )
        .required("Required"),
      frmdate: Yup.string().required("Required"),
      todate: Yup.string().required("Required"),
      mop: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // NOTE: Make API request
        const formdata = new FormData();
        formdata.append("file", file);
        Object.entries(values).map((d) => {
          formdata.append(d[0], d[1]);
        });
        const res = await Auth.put(
          `/members/membership/${uuid}/edit_membership/${id}`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status === 200) {
          toast.success("Updated Membership!");
          formik.handleReset();
          router.push("/dashboard/memberships");
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
      name: "month",
      label: "Month",
      onchange: (e) => {
        formik.setFieldValue("month", e.target.value);
        formik.setFieldValue(
          "todate",
          formatDate(formik.values.frmdate, e.target.value, formik.values.days)
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
          formatDate(formik.values.frmdate, formik.values.month, e.target.value)
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
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    {
      name: "amount_paid",
      label: "Amount Paid",
      props: {
        type: "number",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    {
      name: "balance",
      label: "Balance",
      props: {
        type: "number",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    {
      name: "frmdate",
      label: "From Date",
      props: {
        type: "date",
        InputLabelProps: {
          shrink: true,
        },
      },
      onchange: (e) => {
        formik.setFieldValue("frmdate", e.target.value);
        formik.setFieldValue(
          "todate",
          formatDate(e.target.value, formik.values.month, formik.values.days)
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
  const [file, setfile] = useState(null);
  const [url, seturl] = useState("");
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Edit Membersip" />
        <ImageUploader url={url} setfile={setfile} seturl={seturl} />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            {form.map((data, i) => {
              return (
                <Grid lg={6} md={6} sm={12} key={i}>
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
                    value={formik.values[data.name] || ""}
                    {...data.props}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {data?.option?.map((data, i) => {
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
