import * as React from "react";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Stack,
  Avatar,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useRouter } from "next/router";
export default function BasicTable({ data }) {
  console.log(data);
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const router = useRouter();
  const rows = data.datas;
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  return (
    <>
      <Card>
        <CardHeader title="Members" />
        <Divider />
        <Scrollbar>
          <Table sx={{ minWidth: 1150 }}>
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>phonenumber</TableCell>
                <TableCell>profession</TableCell>
                <TableCell>bloodgroup</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.slice(pg * rpg, pg * rpg + rpg).map((row, id) => (
                <TableRow hover key={id}>
                  <TableCell width="25%">
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                      sx={{
                        display: "inline-flex",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Avatar
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                        src={`../../../../GYM PROJECT/Backend/frontend/public/Uploads/${row.image}`}
                      >
                        {console.log(row)}
                        {getInitials(row.name)}
                      </Avatar>
                      <div>
                        <Typography color="text.primary" variant="subtitle2">
                          {row.name}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.phonenumber}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.profession}</TableCell>
                  <TableCell>{row.bloodgroup}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        router.push(`/dashboard/members/edit/${row.uuid}`);
                      }}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        router.push(
                          `/dashboard/memberships/addmemberships/${row.uuid}`
                        );
                      }}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
