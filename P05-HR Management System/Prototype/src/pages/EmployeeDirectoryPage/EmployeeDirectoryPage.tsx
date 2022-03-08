import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
  GridFilterModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import AddEmployee from "./AddEmployee";

import axios from "axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "Employee ID", width: 130 },
  { field: "name", headerName: "Full Name", width: 130 },
  { field: "address", headerName: "Address", width: 130 },
  { field: "contact", headerName: "Contact", width: 130 },
  { field: "department", headerName: "Department", width: 130 },
  { field: "designation", headerName: "Designation", width: 130 },
  { field: "level", headerName: "Level", width: 70 },
  { field: "remainingLeaves", headerName: "Remaining Leaves", width: 70 },
  { field: "twRating", headerName: "TW Rating", width: 70 },
  { field: "dateJoined", headerName: "Date Joined", width: 120 },
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

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function EmployeeDirectoryPage() {
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

  const handleGetEmployees = async () => {
    let x: any = [];
    try {
      const response = await axios.get("http://localhost:5001/ids");
      const li = response.data.Items;
      x = li;
      setList(x);
      console.log("REQ IETMSSSSSSSS", li);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetEmployees();
  }, [open]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <AddEmployee setOpen={setOpen} open={open} />
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
