import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const openpdf = (pdflink) => {
  return (
    <div>
      <a href={pdflink} target="_blank" rel="noreferrer">
        Download Pdf
      </a>
    </div>
  );
};
export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
}
const View_Resumes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [flag, setFlag] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [words, setWords] = useState("");
  const selected_cvs = (row) => {
    console.log(row.cv);
    setFlag(true);
  };

  const renderDetailsButton = (params) => {
    return (
      <Button
        variant="outlined"
        size="medium"
        onClick={() => {
          window.open(params.value);
        }}
      >
        View CV
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: "date" },
    {
      field: "name",
      headerName: "Name",

      editable: true,
    },
    {
      field: "city",
      headerName: "City",

      editable: true,
    },
    {
      field: "sp",
      headerName: "State/Province",

      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",

      editable: true,
    },
    {
      field: "linkedin",
      headerName: "Linkedin",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
    },
    {
      field: "email",
      headerName: "email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
    },
    {
      field: "email",
      headerName: "email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
    },
    {
      field: "job",
      headerName: "job applied to",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
    },
    {
      field: "cv",
      headerName: "CV",
      renderCell: renderDetailsButton,
      width: 90,
    },
  ];

  const getCVs = async () => {
    const response = await axios.get(
      "http://localhost:5001/getcvs"
      // {
      //   // headers: { "access-token": getJwtToken() },
      // }
    );
    const response2 = await axios.get("http://localhost:8000/keywords");
    setMatches(response2.data.score);
    console.log("matches", response2.data);
    setWords(response2.data.listwords[0][0]);
    const li = response.data.Items;
    console.log(li);
    for (let i = 0; i < li.length; i++) {
      li[i].id = Math.random();
    }

    setRows(li);
  };
  useEffect(() => {
    getCVs();
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          padding: 2,
        }}
      >
        <Typography mt={2} variant="h6" component="div" gutterBottom>
          Enter keywords seperated by commas
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="keywords"
            id="fullWidth"
            value={words}
            onChange={(e) => setWords(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={flag}
            size="small"
            onClick={() => {
              console.log("clicked", flag);
            }}
          >
            View matches
          </Button>
        </Stack>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) =>
          console.log(selected_cvs(rows[ids[0]]))
        }
      />
      <h2>Match {matches} %</h2>
      <h3>words matched {words}</h3>
    </div>
  );
};
export default View_Resumes;
