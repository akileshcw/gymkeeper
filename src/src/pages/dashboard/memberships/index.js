import { createContext, useCallback, useEffect, useRef, useState } from "react";
import FilterFunnel01Icon from "@untitled-ui/icons-react/build/esm/FilterFunnel01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { InvoiceListContainer } from "src/sections/dashboard/invoice/invoice-list-container";
import { InvoiceListSidebar } from "src/sections/dashboard/invoice/invoice-list-sidebar";
import { InvoiceListTable } from "src/sections/dashboard/invoice/invoice-list-table";
import Axios from "src/Axios/Axios";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import Auth from "src/Axios/Auth";
export const Deleted = createContext();
const Page = () => {
  const rootRef = useRef(null);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [group, setGroup] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(lgUp);
  const router = useRouter();
  const handleFiltersToggle = useCallback(() => {
    setOpenSidebar((prevState) => !prevState);
  }, []);

  const [data, setdata] = useState([]);
  const [content, setcontent] = useState();
  const handleDelete = async (id) => {
    try {
      const res = await Auth.delete(`/memberships/delete/${id}`);
      if (res.status === 200) {
        toast.success("user Deleted");
        setcontent(!content);
      } else if (res.status === 401) {
        toast.error("Unauthorized");
      }
    } catch (error) {
      toast.error("please check your internet");
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await Auth.get("/members/memberships");
        console.log(res.data);
        setdata([...res.data.active, ...res.data.expired, ...res.data.pending]);
      } catch (error) {
        toast.error("Something Went Wrong");
        console.log(error);
      }
    };
    fetch();
    return () => {};
  }, [content]);
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
      <Seo title="Dashboard: Invoice List" />
      <Divider />
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <InvoiceListSidebar
            group={group}
            open={openSidebar}
            handleClient={handleClient}
            handlephone={handlephone}
            handlename={handlename}
            handleFiltersToggle={handleFiltersToggle}
          />
          <InvoiceListContainer open={openSidebar}>
            <Stack spacing={4}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <div>
                  <Typography variant="h4">memberships</Typography>
                </div>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon>
                        <FilterFunnel01Icon />
                      </SvgIcon>
                    }
                    onClick={handleFiltersToggle}
                  >
                    Filters
                  </Button>
                </Stack>
              </Stack>
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
                <Deleted.Provider value={handleDelete}>
                  <InvoiceListTable
                    count={data.length}
                    group={group}
                    items={data}
                  />
                </Deleted.Provider>
              )}
            </Stack>
          </InvoiceListContainer>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
