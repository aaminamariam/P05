import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

// const openpdf = (pdflink) => {
//   return (
//     <div>
//       <a href={pdflink} target="_blank" rel="noreferrer">
//         Download Pdf
//       </a>
//     </div>
//   );
// };
export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
}
const View_Resumes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const [flag, setFlag] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [words, setWords] = useState("");
  const [match, setMatch] = useState("");
  const [cvScore, setScore] = useState("");

  const getMatch = async (
    event: React.MouseEvent<HTMLElement>,
    filename: any
  ) => {
    if (words === "") {
      alert("Please enter a word to search");
    } else {
      const keywords = words.split(",");
      console.log(keywords);
      const data = { keywords: keywords, fname: filename };
      const response = await axios.post(
        "http://localhost:8000/keywords",
        {
          keywords: keywords,
          fname: filename,
        },
        { headers: { "access-token": getJwtToken() } }
      );
      console.log(response.data);
      setScore(response.data.score);
      setMatch(response.data.arr.length.toString());
    }
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

  const renderMatch = (params) => {
    return (
      <Button
        variant="outlined"
        size="medium"
        onClick={(e) => getMatch(e, params.value)}
      >
        Get Match
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
      sortable: true,
    },
    {
      field: "cv",
      headerName: "CV",
      renderCell: renderDetailsButton,
      width: 90,
    },
    {
      field: "filename",
      headerName: "Match",
      renderCell: renderMatch,
      width: 90,
    },
  ];

  const getCVs = async () => {
    const response = await axios.get("http://localhost:5001/getcvs", {
      headers: { "access-token": getJwtToken() },
    });
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
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          padding: 2,
        }}
      >
        <Typography mt={2} variant="h6" component="div" gutterBottom>
          Enter keywords seperated by commas:
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            fullWidth
            label="keywords"
            id="fullWidth"
            required
            value={words}
            onChange={(e) => setWords(e.target.value)}
          />
          {/* <Button
            variant="contained"
            disabled={flag}
            size="small"
            onClick={getMatch}
          >
            View matches
          </Button> */}
        </Stack>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          console.log(selectionModel);
        }}
      />
      <Box
        sx={{
          mt: 2,
          b: 5,
        }}
      >
        <Divider variant="middle" />
        <Paper elevation={3}>
          <Toolbar>
            <Typography variant="h4" sx={{ mx: "auto" }}>
              Matches
            </Typography>
          </Toolbar>
          <Divider variant="middle" />
          <Typography mt={3} variant="h6" sx={{ p: 2 }}>
            Match: {cvScore}%
          </Typography>
          <Typography mt={3} variant="h6" sx={{ p: 2 }}>
            Words matched: {match}
          </Typography>
          <Divider variant="middle" />
        </Paper>
      </Box>
    </div>
  );
};
export default View_Resumes;
