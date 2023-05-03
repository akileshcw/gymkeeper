import { Box, Stack, Container } from "@mui/system";
import { Seo } from "src/components/seo";
import { Form7 } from "src/sections/components/forms/form-7";

const Page = () => {
  return (
    <>
      <Seo />
      <main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={4}>
              <Form7 />
            </Stack>
          </Container>
        </Box>
      </main>
    </>
  );
};

export default Page;
