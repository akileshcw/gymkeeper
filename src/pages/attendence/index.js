import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Divider,
  OutlinedInput,
  SvgIcon,
  InputAdornment,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { Modal10 } from "src/sections/components/modals/modal-10";
import Axios from "src/Axios/Axios";
import { toast } from "react-hot-toast";
const Page = () => {
  const [open, setopen] = useState(false);
  const [clinetid, setclinetid] = useState("");
  const handleClose = () => setopen(!open);
  const handleSubmit = async () => {
    try {
      if (clinetid != "") {
        const res = await Axios.post("/attendance_post", {
          clinetid,
        });
        if (res.status === 208) {
          toast.error("You already give Attendence");
        } else if (res.status === 200) {
          toast.success("Your Attendence has Been Marked");
        }
      }
    } catch (error) {
      toast.error("Please Check Your Internet");
    }
  };
  return (
    <>
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <Typography variant="h4" sx={{ p: 3 }}>
            Attendence
          </Typography>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              p: 2,
              gap: 2,
            }}
          >
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="Search Client ID"
              onChange={(e) => {
                setclinetid(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchMdIcon />
                  </SvgIcon>
                </InputAdornment>
              }
            />
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Search
            </Button>
          </Box>
          <Divider />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Modal10 handleClose={handleClose} />
        </Modal>
      </Box>
    </>
  );
};

export default Page;
