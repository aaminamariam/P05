import axios from "axios";
import { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridToolbar,
} from "@mui/x-data-grid";
import AddAnnouncements from "./addAnnouncements";

const columns: GridColDef[] = [
  // { field: "id", headerName: "Employee ID", width: 130 },
  { field: "postedBy", headerName: "Full Name", width: 130 },
  { field: "department", headerName: "Department", width: 130 },
  { field: "data", headerName: "Announcement", width: 130 },
  { field: "title", headerName: "Date Joined", width: 120 },
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

export default function AnnouncementsPage() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<any[]>([]);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [
      {
        columnField: "rating",
        operatorValue: ">",
        value: "2.5",
      },
    ],
  });

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
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetAnnouncements();
  }, [open]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <Button onClick={handleAddAnnouncement}>ADD ANNOUNCEMENT</Button> */}
      <AddAnnouncements setOpen={setOpen} open={open} />
      <DataGrid
        rows={list}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />
    </div>
  );
}
