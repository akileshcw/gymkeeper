import { Form5 } from "src/sections/components/forms/form-5";
import { Box } from "@mui/system";
const page = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          m: 0,
        }}
      >
        <Form5 />
      </Box>
    </>
  );
};

export default page;
