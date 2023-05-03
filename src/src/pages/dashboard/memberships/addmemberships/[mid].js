import { Box, Container, Stack } from "@mui/material";
import { Seo } from "src/components/seo";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { CustomerEditForm } from "src/sections/dashboard/customer/customer-edit-form";
import { useRouter } from "next/router";

const Page = () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const router = useRouter();
  const days = [];
  for (let i = 0; i < 30; i++) {
    days.push(i);
  }
  const { mid } = router.query;
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
            <CustomerEditForm
              title="Add Memberships"
              id={mid}
              months={months}
              days={days}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
