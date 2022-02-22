import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
  GridFilterModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
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
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [contact, setContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [leaves, setLeaves] = useState("");
  const [employeeID, setEmployeeID] = useState("");

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

  const handleAddEmployee = async () => {
    // setAnchorEl(event.currentTarget);
    // const check = is_empty(title, aData, id);
    // if (check == 0) {
    await axios({
      method: "post",
      url: "http://localhost:5001/addnewemployee",
      data: {
        employeeID: employeeID,
        name: name,
        department: department,
        designation: designation,
        level: level,
        dateJoined: dateJoined,
        email: email,
        contact: contact,
        address: address,
        remainingLeaves: leaves,
        twRating: rating,
      },
    }).then((response: { data: any }) => {
      handleGetEmployees();
      console.log(response.data);
      //alert("Your Request has been submitted");
    });
    // }
  };

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

    // try {
    //   for (let i = 1; i <= x.length; i++) {
    //     const Intid = parseInt(x[i].announcement_id);
    //     a.push({
    //       id: i,
    //       name: x[i].name,
    //       title: x[i].title,
    //       announcements: x[i].announcements,
    //       date: x[i].date,
    //     });
    //     setList([...list, a]);
    //   }
    // } catch (err) {}
  };
  useEffect(() => {
    handleGetEmployees();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TextField
        id="employeeID"
        label="Employee ID"
        variant="standard"
        value={employeeID}
        onChange={(e) => setEmployeeID(e.target.value)}
      />
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
        id="level"
        label="Level"
        variant="standard"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <TextField
        id="contact"
        label="Contact"
        variant="standard"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <TextField
        id="designation"
        label="Designation"
        variant="standard"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />
      <TextField
        id="address"
        label="Address"
        variant="standard"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        id="dateJoined"
        label="Date Joined"
        variant="standard"
        value={dateJoined}
        onChange={(e) => setDateJoined(e.target.value)}
      />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="twRating"
        label="TW Rating"
        variant="standard"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <TextField
        id="remainingLeaves"
        label="Remaining Leaves"
        variant="standard"
        value={leaves}
        onChange={(e) => setLeaves(e.target.value)}
      />

      <Button onClick={handleAddEmployee}>ADD EMPLOYEE</Button>
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
