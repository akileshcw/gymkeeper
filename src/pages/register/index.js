import { Box } from "@mui/system";
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
          }}
        >
          <Form7 />
        </Box>
      </main>
    </>
  );
};

export default Page;
