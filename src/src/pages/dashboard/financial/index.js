import Grid from "@mui/system/Unstable_Grid/Grid";
import { Layout } from "src/layouts/dashboard";
import { Box } from "@mui/system";
import HeatMap from "src/sections/components/charts/HeatMap";
import FinanceChart from "src/sections/components/charts/FinanceChart";
const Page = () => {
  return (
    <>
      <Layout>
        <Box>
          <Grid container>
            <Grid xs={12} md={12}>
              <FinanceChart />
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default Page;
