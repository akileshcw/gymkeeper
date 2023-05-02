import { useCallback, useEffect, useMemo, useState } from "react";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { CustomerListSearch } from "src/sections/dashboard/customer/customer-list-search";
import BasicTable from "src/sections/components/tables/newtable";
import { toast } from "react-hot-toast";
import ReactLoading from "react-loading";
import Auth from "src/Axios/Auth";
const Page = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await Auth.get("/get_members");
        if (res.status === 200) {
          setdata(res.data);
          console.log(data);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.error("Unauthorized user");
        } else {
          console.log(error);
          toast.error("Something went Wrong");
        }
      }
    };
    fetcher();
    return () => {};
  }, []);

  const [clientid, setclientid] = useState("");
  const [name, setname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const handleClient = (e) => setclientid(e.target.value);
  const handlename = (e) => setname(e.target.value);
  const handlephone = (e) => setphonenumber(e.target.value);
  useEffect(() => {
    console.log(clientid, name, phonenumber);
  }, [clientid, name, phonenumber]);
  return (
    <>
      <Seo title="Dashboard: Member List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Members</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Card>
              <CustomerListSearch
                handleClient={handleClient}
                handlename={handlename}
                handlephone={handlephone}
              />
              {data.length === 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ReactLoading
                    type="bars"
                    color={"black"}
                    height={"20%"}
                    width={"20%"}
                  />
                </Box>
              ) : (
                <BasicTable data={data} />
              )}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
