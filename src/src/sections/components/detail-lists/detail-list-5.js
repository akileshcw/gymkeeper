import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";

export const DetailList5 = () => {
  const { data } = useSession();

  return (
    <Box>
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">name</Typography>
              </TableCell>
              <TableCell>{data?.user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">role</Typography>
              </TableCell>
              <TableCell>{data?.user?.role}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">organization</Typography>
              </TableCell>
              <TableCell>{data?.user?.org_name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};
