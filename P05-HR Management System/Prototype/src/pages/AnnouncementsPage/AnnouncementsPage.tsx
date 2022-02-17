import axios from "axios";
import { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridToolbar,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  // { field: "id", headerName: "Employee ID", width: 130 },
  { field: "name", headerName: "Full Name", width: 130 },
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

export default function AnnouncementsPage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");

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

  const handleAddAnnouncement = async () => {
    // setAnchorEl(event.currentTarget);
    // const check = is_empty(title, aData, id);
    // if (check == 0) {
    await axios({
      method: "post",
      url: "http://localhost:5001/addNewAnnouncement",
      data: {
        postedBy: name,
        department: department,
        title: title,
        data: data,
      },
    }).then((response: { data: any }) => {
      handleGetAnnouncements();
      // console.log(response.data);
      //alert("Your Request has been submitted");
    });
    // }
  };

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
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TextField
        id="name"
        label="Name"
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="department"
        label="Department"
        variant="standard"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <TextField
        id="title"
        label="Title"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="data"
        label="Announcement"
        variant="standard"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <Button onClick={handleAddAnnouncement}>ADD ANNOUNCEMENT</Button>
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
