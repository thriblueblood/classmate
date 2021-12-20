import * as React from "react";
import { Stack, Typography, TextField, MenuItem } from "@mui/material";
import "./DialogPopUp.css";

const schools = [
  {
    value: "kmitl",
    label: "King mongkut's institute of technology ladkrabang",
  },
  {
    value: "home",
    label: "Home",
  },
];

export default function NameClassPage({setClassname}) {
  const [school, setSchool] = React.useState("home");

  const handleChange = (event) => {
    setSchool(event.target.value);
  };

  return (
    <div className="form_container">
      <form>
        <Stack>
          <Typography>Class Name:</Typography>
          <TextField
            label="Enter class name here"
            onChange={(e) => {
              setClassname(e.target.value);
            }}
          />
          <br />
          <TextField select defaultValue value={school} onChange={handleChange}>
            {schools.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </form>
    </div>
  );
}
