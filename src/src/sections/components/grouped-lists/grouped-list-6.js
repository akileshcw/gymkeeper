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
const transactions = [
  {
    bloodgroup: "o+",
    client_id: null,
    createdAt: "2023-03-25T17:21:35.978Z",
    dob: "2001-10-09",
    gender: null,
    id: 1,
    image: null,
    name: "shaggy",
    phonenumber: "9080296978",
    profession: "student",
    updatedAt: "2023-03-25T17:21:35.979Z",
    uuid: "14f003c8-35b5-4956-bb04-5fcfc4e0be61",
    status: "present",
  },
  {
    bloodgroup: "o+",
    client_id: null,
    createdAt: "2023-03-25T17:21:35.978Z",
    dob: "2001-10-09",
    gender: null,
    id: 1,
    image: null,
    name: "shaggy",
    phonenumber: "9080296978",
    profession: "student",
    updatedAt: "2023-03-25T17:21:35.979Z",
    uuid: "14f003c8-35b5-4956-bb04-5fcfc4e0be61",
    status: "Absent",
  },
];

export const GroupedList6 = (props) => {
  const { data } = props;
  return (
    <Box>
      <Card>
        <CardHeader title="Attendence" />
        <Divider />
        <Table>
          <TableBody>
            {data?.map((transaction, id) => {
              return (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.entries(transaction).map((data, i) => {
                    return (
                      <TableCell>
                        <Typography variant="subtitle2">
                          {data[1].toUpperCase()}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};
