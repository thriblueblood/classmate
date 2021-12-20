import "./DialogPopUp.css";
import { Stack, TextField } from "@mui/material";
import * as React from "react";

export default function NameBestMatePage() {
  const [bestmate, setBestmate] = React.useState("");

  return (
    <div className="form_container">
      <form>
        <Stack>
          <TextField
            label="Enter the name of your best mate here"
            onChange={(e) => {
              setBestmate(e.target.value);
            }}
          />
        </Stack>
      </form>
    </div>
  );
}
