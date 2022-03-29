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

import AddAnnouncements from "./addAnnouncements";

const columns: GridColDef[] = [
  // { field: "id", headerName: "Employee ID", width: 130 },
  { field: "title", headerName: "Title", width: 250 },
  { field: "postedOn", headerName: "Posted On", width: 200 },
  { field: "postedBy", headerName: "Full Name", width: 130 },
  { field: "department", headerName: "Department", width: 130 },
  { field: "data", headerName: "Announcement", width: 300 },
];

export default function AnnouncementsPage() {
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

  const handleGetAnnouncements = async () => {
    let x: any = [];
    try {
      const response = await axios.get(
        "http://localhost:5001/getAnnouncements"
      );

      const li = response.data.Items;
      x = li;
      setList(x);
      console.log("ANNOUNCE ITEMS", li);
      setfirstRender(false);
      setloader(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetAnnouncements().then(() => {
      if (firstRender === false && modalOpen === false) {
        setSnackbarOpen(true);
      }
    });
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
          <AddAnnouncements setOpen={setModalOpen} open={modalOpen} />
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <Button onClick={handleAddAnnouncement}>ADD ANNOUNCEMENT</Button> */}
      <DataGrid
        loading={loader}
        rows={list}
        columns={columns}
        autoHeight
        rowsPerPageOptions={[10]}
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: CustomGridToolbar,
        }}
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
          New Announcement added!!
        </Alert>
      </Snackbar>
    </div>
  );
}
