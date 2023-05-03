import { useContext, useState } from "react";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Avatar,
  Card,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { getInitials } from "src/utils/get-initials";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Deleted } from "src/pages/dashboard/memberships";
import { useRouter } from "next/router";
import { Eye } from "@untitled-ui/icons-react";

const groupInvoices = (invoices) => {
  return invoices.reduce(
    (acc, invoice) => {
      const { status } = invoice;
      if (!status) {
        return {
          ...acc,
          pending: [...acc["pending"], { ...invoice, status: "pending" }],
        };
      }
      return {
        ...acc,
        [status]: [...acc[status], invoice],
      };
    },
    {
      expired: [],
      Active: [],
      pending: [],
    }
  );
};

const statusColorsMap = {
  expired: "error",
  Active: "success",
  pending: "warning",
};

const InvoiceRow = (props) => {
  const { invoice, ...other } = props;
  const handleDelete = useContext(Deleted);
  const statusColor = statusColorsMap[invoice.status];
  const router = useRouter();
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      {...other}
    >
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
          >
            {getInitials(
              invoice.status === "pending" ? invoice.name : invoice.memb.name
            )}
          </Avatar>
          <div>
            <Typography color="text.primary" variant="subtitle2">
              {invoice.status === "pending" ? invoice.name : invoice.memb.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {invoice.status === "pending"
                ? invoice.id
                : invoice.memb.client_id}
            </Typography>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        {invoice.status === "pending" ? (
          <Typography variant="subtitle2">{invoice.phonenumber}</Typography>
        ) : (
          <Typography variant="subtitle2">{invoice.tot_amount}</Typography>
        )}
      </TableCell>
      <TableCell>
        {invoice.status === "pending" ? (
          <>
            <Typography variant="subtitle2">gender</Typography>
            <Typography color="text.secondary" variant="body2">
              {invoice.gender}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="subtitle2">From date</Typography>
            <Typography color="text.secondary" variant="body2">
              {invoice.frmdate}
            </Typography>
          </>
        )}
      </TableCell>
      <TableCell>
        {invoice.status === "pending" ? (
          <>
            <Typography variant="subtitle2">Profression</Typography>
            <Typography color="text.secondary" variant="body2">
              {invoice.profession}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="subtitle2">to date</Typography>
            <Typography color="text.secondary" variant="body2">
              {invoice.todate}
            </Typography>
          </>
        )}
      </TableCell>
      <TableCell align="right">
        <SeverityPill color={statusColor}>{invoice.status}</SeverityPill>
      </TableCell>
      <TableCell align="right">
        <IconButton
          onClick={() => {
            handleDelete(invoice.id);
          }}
        >
          <SvgIcon>
            <DeleteOutlineIcon />
          </SvgIcon>
        </IconButton>
        {invoice.status === "pending" || (
          <IconButton
            onClick={() => {
              router.push(`/dashboard/memberships/membership/${invoice.uuid}`);
            }}
          >
            <SvgIcon>
              <Eye />
            </SvgIcon>
          </IconButton>
        )}
        <IconButton
          component={RouterLink}
          href={
            invoice.status === "pending"
              ? `/dashboard/memberships/addmemberships/${invoice.uuid}`
              : `/dashboard/memberships/${invoice.uuid}/edit/${invoice.id}`
          }
        >
          <SvgIcon>
            <ArrowRightIcon />
          </SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const InvoiceListTable = (props) => {
  const { count, items, group } = props;
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);
  let content;
  console.log(items);
  const rows = items;
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  if (group) {
    const data = rows.slice(pg * rpg, pg * rpg + rpg);
    const groupedInvoices = groupInvoices(data);
    console.log(groupedInvoices);
    const statuses = Object.keys(groupedInvoices);
    content = (
      <Stack spacing={6}>
        {statuses.map((status) => {
          const groupTitle = status.charAt(0).toUpperCase() + status.slice(1);
          const count = groupedInvoices[status].length;
          const invoices = groupedInvoices[status];
          const hasInvoices = invoices.length > 0;
          return (
            <Stack key={groupTitle} spacing={2}>
              <Typography color="text.secondary" variant="h6">
                {groupTitle} ({count})
              </Typography>
              {hasInvoices && (
                <Card>
                  <Scrollbar>
                    <Table sx={{ minWidth: 600 }}>
                      <TableBody>
                        {invoices.map((invoice, i) => (
                          <InvoiceRow key={i} invoice={invoice} />
                        ))}
                      </TableBody>
                    </Table>
                  </Scrollbar>
                </Card>
              )}
            </Stack>
          );
        })}
      </Stack>
    );
  } else {
    content = (
      <Card>
        <Table>
          <TableBody>
            {items.map((invoice, i) => (
              <InvoiceRow key={i} invoice={invoice} />
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <Stack spacing={4}>
      {content}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};
