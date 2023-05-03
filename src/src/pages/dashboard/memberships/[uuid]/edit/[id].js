import { useCallback, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";

import { Seo } from "src/components/seo";

import { Layout as DashboardLayout } from "src/layouts/dashboard";

import { CustomerEditForm } from "src/sections/dashboard/editmembership/customer-edit-form";
import ReactLoading from "react-loading";
import { InvoicePreview } from "src/sections/dashboard/invoice/invoice-preview";
import { useRouter } from "next/router";

import { toast } from "react-hot-toast";
import Auth from "src/Axios/Auth";

const Page = () => {
  const router = useRouter();
  const { uuid, id } = router.query;
  console.log(uuid, id);
  const [data, setdata] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (uuid && id) {
          const res = await Auth.get(
            `/members/membership/${uuid}/edit_membership/${id}`
          );
          if (res.status === 200) {
            
            setdata(res.data);
          }
          if (res.status === 401) {
            toast.error("Unauthorized");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong!");
      }
    };
    fetch();
    return () => {};
  }, [uuid, id]);
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ReactLoading
                  type="bars"
                  color={"black"}
                  height={"20%"}
                  width={"20%"}
                />
              </Box>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
