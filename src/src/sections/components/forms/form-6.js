import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
export const Form6 = () => {
  const formik = useFormik({
    initialValues: {
      cat: "",
      amt: "",
      dat: "",
      notes: "",
    },
    validationSchema: Yup.object({
      cat: Yup.string().required("required"),
      amt: Yup.string().required("required"),
      dat: Yup.string().required("required"),
      notes: Yup.string().required("required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const catagory = [
    "Rent",
    "Salary",
    "Services",
    "Purchase of Items",
    "Cleaning",
    "Renovation",
    "Additional Equipment Purchase",
    "Electric Bills",
    "Phone Bills",
    "Server maintainence",
    "Mics.Expense",
  ];
  return (
    <Box sx={{ p: 3, m: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ py: 3 }}>
          Expense
        </Typography>
        <Stack spacing={3}>
          <TextField
            error={!!(formik.touched.cat && formik.errors.cat)}
            fullWidth
            helperText={formik.touched.cat && formik.errors.cat}
            label="category"
            name="cat"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.cat || ""}
            select
          >
            <MenuItem value="" defaultValue={true}>
              select
            </MenuItem>
            {catagory.map((data, i) => {
              return (
                <MenuItem value={data} key={i}>
                  {data}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            error={!!(formik.touched.amt && formik.errors.amt)}
            fullWidth
            helperText={formik.touched.amt && formik.errors.amt}
            label="amount"
            name="amt"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.amt}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            error={!!(formik.touched.dat && formik.errors.dat)}
            fullWidth
            helperText={formik.touched.dat && formik.errors.dat}
            label="date of the spent"
            name="dat"
            type="date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.dat}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            error={!!(formik.touched.notes && formik.errors.notes)}
            fullWidth
            helperText={formik.touched.notes && formik.errors.notes}
            label="Notes"
            name="notes"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.notes}
            multiline
            rows={4}
          />
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Cancel</Button>
          <Button sx={{ ml: 1 }} type="submit" variant="contained">
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};
