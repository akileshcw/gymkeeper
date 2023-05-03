import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Seo } from "src/components/seo";
import { Box, Container, Stack } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import MemberForm from "src/sections/dashboard/editmember/MemberForm";
import { useRouter } from "next/dist/client/router";
import Auth from "src/Axios/Auth";
const Page = () => {
  const [data, setdata] = useState();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const fetcher = async () => {
    try {
      if (id) {
        const res = await Auth.get(`/get_members_for_edit/${id}`);
        if (res.status === 200) {
          setdata(res.data.datas);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!");
    }
  };
  useEffect(() => {
    fetcher();
  }, [id]);
  console.log(data);
  return (
    <>
      <Seo title="Dashboard: Edit Member" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>{data && <MemberForm Data={data} />}</Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
