import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { useSession } from "next-auth/react";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { useEffect, useState } from "react";
import Axios from "src/Axios/Axios";
import { QuickStats2 } from "src/sections/components/quick-stats/quick-stats-2";
import { GroupedList7 } from "src/sections/components/grouped-lists/grouped-list-7";
import Auth from "src/Axios/Auth";

const Page = () => {
  const [quick, setquick] = useState();
  useEffect(() => {
    const Fetcher = async () => {
      try {
        const res = await Auth.get("/dashboard_home");
        console.log(res.data);
        setquick(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    Fetcher();
    return () => {};
  }, []);
  return (
    <>
      <Seo title="Dashboard: Overview" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false ? false : "xl"}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Home</Typography>
                </div>
                {/* <div>
                  <Stack direction="row" spacing={4}>
                    <Button
                      startIcon={
                        <SvgIcon>
                          <PlusIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                    >
                      New Dashboard
                    </Button>
                  </Stack>
                </div> */}
              </Stack>
              <Grid xs={12} md={12}>
                {quick && <QuickStats2 data={quick} />}
              </Grid>
              <Grid xs={12} md={6}>
                {/* <GroupedList7 /> */}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
