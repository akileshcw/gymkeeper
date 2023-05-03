import numeral from "numeral";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

const orderItems = [
  {
    id: "5ecb8abbdd6dfb1f9d6bf98b",
    purpose: "protien",
    amount: 300,
    date: "12-02-2002",
  },
  {
    id: "5ecb8ac10f116d04bed990eb",
    purpose: "food",
    amount: 400,
    date: "11-11-2000",
  },
];

export const Table11 = () => (
  <Box
    sx={{
      p: 3,
    }}
  >
    <Card>
      <CardHeader title="Expense" />
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Purpose</TableCell>
              <TableCell>Amount Spent</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{item.purpose}</Typography>
                  </TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={orderItems.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  </Box>
);
