import "./AddSubjectPopUp.css";
import {
  Stack,
  Typography,
  TextField,
  MenuItem,
  Box,
  Grid,
  Button
} from "@mui/material";
import React, { useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { ChatState} from '../Context/ChatProvider'
import axios from 'axios'

const days = [
  {
    value: "0",
    label: "Sunday",
  },
  {
    value: "1",
    label: "Monday",
  },
  {
    value: "2",
    label: "Tuesday",
  },
  {
    value: "3",
    label: "Wednesday",
  },
  {
    value: "4",
    label: "Thursday",
  },
  {
    value: "5",
    label: "Friday",
  },
  {
    value: "6",
    label: "Saturday",
  },
];

const TimeClass = () => {
  return (
    <div>
      <Grid container>
        <Grid xs={5.75}>
          <TextField select sx={{ width: "100%" }}>
            {days.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={0.5}></Grid>
        <Grid xs={5.75}>
          <Grid container>
            <Grid xs={5.5}>
              <TextField
                id="time"
                label="From"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid xs={1}></Grid>
            <Grid xs={5.5}>
              <TextField
                id="time"
                label="To"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>
      <br />
    </div>
  );
};

export default function AddSubjectPopUp() {
  const [numberTime, setNumberTime] = useState(1);
  const [midtermDate, setMidtermDate] = React.useState(new Date('2018-01-01T00:00:00.000Z'));
  const [finalDate, setFinalDate] = React.useState(new Date('2018-01-01T00:00:00.000Z'));

  const { user, selectedChat} = ChatState();
  const [subjectTitle, setSubjectTitle] = useState("");
  const [subjectProfessor, setSubjectProfessor] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [subjects, setSubjects] = useState([])


  const isEqualOne = () => {
    return numberTime === 1;
  };

  const handleOnSubmit = async() => {

    setLoading(true)
    if (!user._id) {
      console.log("cant find _id");
      return;
    }

    try{
      const config ={
        headers: {
          
          Authorization: `Bearer ${user.token}`,
        },
      }

      console.log(selectedChat._id)
      console.log(subjectTitle)
      console.log(subjectProfessor)

      const {data} = await axios.post("/api/subject",
      {chatId: selectedChat._id,
        subjectName: subjectTitle,
        teacherName: subjectProfessor
        
      },
      config
      );
      console.log("add subject success")
      console.log(data)

      setSubjects(data)
      console.log(subjects)

    }catch(err){
      setLoading(false)
      console.log(err)
    }
  }


  return (
    <div className="form_container">
      <form>
      
        <Stack>
        <TextField label="Subject" sx={{ width: "100%" }} onChange={(e) => setSubjectProfessor(e.target.value)} />
          <br />
          <Grid container>
            <Grid xs={5.75}>
              <TextField label="Professor" sx={{ width: "100%" }} onChange={(e) => setSubjectTitle(e.target.value)} />
              
            </Grid>
            <Grid xs={0.5}></Grid> 
          <Button onClick={handleOnSubmit}>Submit</Button>
  
          </Grid>
          <br />
        <div>
          </div>
        </Stack>
      </form>
    </div>
  );
}

