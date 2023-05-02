import { useCallback, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";

import { Seo } from "src/components/seo";

import { Layout as DashboardLayout } from "src/layouts/dashboard";

import { CustomerEditForm } from "src/sections/dashboard/editmembership/customer-edit-form";
import ReactLoading from "react-loading";
import { InvoicePreview } from "src/sections/dashboard/invoice/invoice-preview";
import { useRouter } from "next/router";
import Axios from "src/Axios/Axios";
import { toast } from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { uuid, id } = router.query;
  console.log(uuid, id);
  const [data, setdata] = useState();
  const fetch = async () => {
    try {
      const res = await Axios.get(
        `/members/membership/${uuid}/edit_membership/${id}`
      );
      if (res.status === 200) {
        console.log(res.data);
        setdata(res.data);
      }
      if (res.status === 401) {
        toast.error("Unauthorized");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };
  useEffect(() => {
    fetch();
    return () => {};
  }, []);
  return (
    <>
      <Seo title="Dashboard: Customer Edit" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            {data ? (
              <>
                <InvoicePreview data={data} />
                <CustomerEditForm uuid={uuid} id={id} />
              </>
            ) : (
              <ReactLoading
                type="bars"
                color={"black"}
                height={"20%"}
                width={"20%"}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
