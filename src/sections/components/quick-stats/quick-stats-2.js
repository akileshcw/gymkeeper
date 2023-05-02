import CurrencyDollarIcon from "@untitled-ui/icons-react/build/esm/CurrencyDollar";
import FolderIcon from "@untitled-ui/icons-react/build/esm/Folder";
import {
  Avatar,
  Box,
  Card,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CardQuick from "./CardQuick";
import { TimeToLeave } from "@mui/icons-material";
const icons = {
  active: <AccessibilityNewIcon />,
  "expired soon": <AccessTimeIcon />,
  expired: <TimeToLeave />,
  members: <HourglassBottomIcon />,
};
export const QuickStats2 = ({ data }) => (
  <Box>
    <Grid container spacing={3}>
      {Object.entries(data).map((data, i) => {
        return <CardQuick data={data} key={i} icons={icons} />;
      })}
    </Grid>
  </Box>
);
