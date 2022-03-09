import axios from "axios";
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import AddEmployee from "./AddEmployee";

export default function EmployeeDirectoryPage() {
  const [list, setList] = useState<any[]>([]);
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [loader, setloader] = useState(true);
  const [firstRender, setfirstRender] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [
      {
        columnField: "rating",
        operatorValue: ">",
        value: "2.5",
      },
    ],
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Employee ID", width: 130 },
    { field: "name", headerName: "Full Name", width: 250 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "department", headerName: "Department", width: 130 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "level", headerName: "Level", width: 130 },
    { field: "remainingLeaves", headerName: "Remaining Leaves", width: 130 },
    { field: "twRating", headerName: "TW Rating", width: 100 },
    { field: "dateJoined", headerName: "Date Joined", width: 130 },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   width: 90,
    // },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: true,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];

  // const is_empty = (option: string, description: string, id: string) => {
  //   if (title == "" || aData == "" || id =="") {
  //     if (title == "")
  //     {
  //         alert("title is empty")
  //     }
  //     if (aData == "")
  //     {
  //         alert("title is empty")
  //     }
  //     if (id = "")
  //     {
  //         alert("id is empty")
  //     }
  //     return 1;
  //   }
  //   return 0;
  // };

  const handleGetEmployees = async () => {
    let x: any = [];
    try {
      const response = await axios.get("http://localhost:5001/ids");
      const li = response.data.Items;
      x = li;
      setList(x);
      console.log("REQ IETMSSSSSSSS", li);
      setfirstRender(false);
      setloader(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetEmployees().then(() => {
      if (firstRender === false && modalOpen === false) {
        setSnackbarOpen(true);
      }
    });
    // handleClick();
  }, [modalOpen, firstRender]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      setSnackbarOpen(false);
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function CustomGridToolbar() {
    return (
      <GridToolbarContainer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <GridToolbarColumnsButton style={{ margin: 10 }} />
          <GridToolbarFilterButton style={{ margin: 10 }} />
          <GridToolbarDensitySelector style={{ margin: 10 }} />
          <GridToolbarExport style={{ margin: 10 }} />
        </div>
        <div>
          <AddEmployee setOpen={setModalOpen} open={modalOpen} />
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <AddEmployee setOpen={setModalOpen} open={modalOpen} /> */}
      <DataGrid
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: CustomGridToolbar,
        }}
        loading={loader}
        // loading
        rows={list}
        columns={columns}
        autoHeight
        // autoPageSize
        // pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={SnackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      >
        <Alert onClose={handleClose} severity="success">
          New Employee added!!
        </Alert>
      </Snackbar>
    </div>
  );
}
