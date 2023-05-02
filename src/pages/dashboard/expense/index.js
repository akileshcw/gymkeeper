import Grid from "@mui/system/Unstable_Grid/Grid";
import { Layout } from "src/layouts/dashboard";
import ExpenseChart from "src/sections/components/charts/ExpenseChart";
import { Form6 } from "src/sections/components/forms/form-6";
import { Table11 } from "src/sections/components/tables/table-11";

const page = () => {
  return (
    <>
      <Layout>
        <Grid container>
          <Grid xs={12} md={6}>
            <Form6 />
          </Grid>
          <Grid xs={12} md={6}>
            <ExpenseChart />
          </Grid>
          <Grid xs={12} md={12}>
            <Table11 />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default page;
