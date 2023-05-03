import { useRouter } from "next/dist/client/router";
import Auth from "src/Axios/Auth";
import { Box, Container, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Layout } from "src/layouts/dashboard";
import { InvoicePreview } from "src/sections/dashboard/invoice/invoice-preview";
const page = () => {
  const [data, setdata] = useState();
  const router = useRouter();
  const { uid } = router.query;
  useEffect(() => {
    const fetcher = async () => {
      try {
        if (uid) {
          const res = await Auth.get(`/members/membership/${uid}`);
          if (res.status === 200) {
            setdata(res.data);
            console.log(data);
          }
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.error("Unauthorized");
        } else {
          toast.error("please Check you internet");
        }
      }
    };
    fetcher();
  }, [uid]);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>{data && <InvoicePreview data={data} />}</Stack>
      </Container>
    </Box>
  );
};

export default page;

page.getLayout = (page) => <Layout>{page}</Layout>;
