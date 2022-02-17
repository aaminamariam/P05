import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
  GridFilterModel,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Employee Name", width: 130 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "announcements", headerName: "Announcement", width: 70 },
  { field: "date", headerName: "Date posted", width: 70 },
];

// const rows = [
//   {
//     id: 2,
//     name: "Jon Snow",
//     title: "Employees",
//     announcements: "test announcement",
//     date: "17-02-22",
//   },
//   {
//     id: 4,
//     name: "Ahmad Ali",
//     title: "Vacation",
//     announcements: "Let's plan a vacay",
//     date: "17-02-22",
//   },
//   {
//     id: 3,
//     name: "Uzair Khan",
//     title: "Public holiday",
//     announcements: "Public holiday tomorrow",
//     date: "16-02-22",
//   },
// ];

const AnnouncementsHist = () => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [
      {
        columnField: "rating",
        operatorValue: ">",
        value: "2.5",
      },
    ],
  });
  const [list, setList] = useState<any[]>([]);
  let x: any = [];
  let a: any = [];
  const getannoun = async () => {
    try {
      const response = await axios.get("http://localhost:80/getAnnouncements");
      const li = response.data.Items;
      x = li;
      console.log(li);
    } catch (error) {
      console.error(error);
    }

    try {
      for (let i = 1; i <= x.length; i++) {
        const Intid = parseInt(x[i].announcement_id);
        a.push({
          id: i,
          name: x[i].name,
          title: x[i].title,
          announcements: x[i].announcements,
          date: x[i].date,
        });
        setList([...list, a]);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getannoun();
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={a}
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
};
export default AnnouncementsHist;
