import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Row from "./Row";
import { Card, CardContent, CardHeader, TablePagination } from "@mui/material";

function createData(
  name: any,
  impressions: any,
  interactions: any,
  completion: any,
  protein: any,
  analysis: any
) {
  return {
    name,
    impressions,
    interactions,
    completion,
    protein,
    analysis,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData("Customer Satisfaction Survey", "159", "6.0", "24", "4.0", "3.99"),
  createData(
    "Customer Satisfaction Survey 2",
    "237",
    "9.0",
    "37",
    "4.3",
    "4.99"
  ),
  createData(
    "Customer Satisfaction Survey 3",
    "262",
    "16.0",
    "24",
    "6.0",
    "3.79"
  ),
  createData(
    "Customer Satisfaction Survey 4",
    "305",
    "3.7",
    "67",
    "4.3",
    "2.5"
  ),
  createData(
    "Customer Satisfaction Survey 5",
    "356",
    "16.0",
    "49",
    "3.9",
    "1.5"
  ),
  createData(
    "Customer Satisfaction Survey 6",
    "159",
    "6.0",
    "24",
    "4.0",
    "3.99"
  ),
  createData(
    "Customer Satisfaction Survey 7",
    "237",
    "9.0",
    "37",
    "4.3",
    "4.99"
  ),
  createData(
    "Customer Satisfaction Survey 8",
    "262",
    "16.0",
    "24",
    "6.0",
    "3.79"
  ),
  createData(
    "Customer Satisfaction Survey 9",
    "305",
    "3.7",
    "67",
    "4.3",
    "2.5"
  ),
  createData(
    "Customer Satisfaction Survey 10",
    "356",
    "16.0",
    "49",
    "3.9",
    "1.5"
  ),
];

function AnalyticsDashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography align="left" component="h3" variant="h5">
              Poll Analytics
            </Typography>
          }
        ></CardHeader>
        <CardContent>
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name </TableCell>
                  <TableCell align="center">Impressions</TableCell>
                  <TableCell align="center">Interactions</TableCell>
                  <TableCell align="center">Completion</TableCell>
                  <TableCell align="center">Analysis</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
      <Card sx={{ my: 2 }}>
        <CardHeader
          title={
            <Typography align="left" component="h3" variant="h5">
              Survey Analytics
            </Typography>
          }
        ></CardHeader>
        <CardContent>
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name </TableCell>
                  <TableCell align="center">Impressions</TableCell>
                  <TableCell align="center">Interactions</TableCell>
                  <TableCell align="center">Completion</TableCell>
                  <TableCell align="center">Analysis</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default AnalyticsDashboard;
