import { Card, CardContent, CardActions,Stack, Box, Typography, Divider,Button} from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import theme from "../ui/Theme";
import SearchBar from "../Components/SearchBar.js";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import Slide from '@mui/material/Slide';
import List from '@mui/material/List'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ChatState} from "../Context/ChatProvider"
import CircularProgress from "@mui/material/CircularProgress"
import React, { useState, useEffect } from 'react'
import AddSubjectPopUp from "./AddSubjectPopUp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SubjectPage(){

  const {selectedChat, user} = ChatState();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const fetchSubjects = async () => {
    if(!selectedChat._id){

      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,

        },
      };

      const { data } = await axios.get(`/api/subject/${selectedChat._id}`, config);

      setSubjects(data)
      // console.log(data)

     setLoading(false) 
    } catch (error) {
      console.log("Error fetching subjects")
      console.log(error)
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, [subjects]);

    return(
        <ThemeProvider theme={theme}>
        <Box sx={{padding:"1%"}}> 
        <Stack direction="row">
        <Typography variant="h2" fontSize="1.25rem">List of subjects</Typography>
        </Stack>
      <Divider/>
      <Box sx={{marginBottom:"1%"}}>
      <SearchBar/>
      </Box>
        <Box sx={{display:"flex"}}>
        <Button style={{backgroundColor:"green", margin:"1% 0%",marginLeft:"auto"}}variant="contained" startIcon={<AddIcon/>} onClick={handleDialogOpen}>
                Add Subject
            </Button>
        </Box>
        {loading ? <CircularProgress/>
        :
        <div>
        {subjects.map((subject) => (
        <div>
        <Card sx={{backgroundColor:"secondary.main"}} onClick = { () => {
          navigate(`/main/room/subject/${subject._id}`, {state:{subjectName:subject.subjectName, teacherName:subject.teacherName,subjectId:subject._id}})
        }}>
              <CardContent sx={{width:"100%"}}>
                <Typography variant="h3" fontSize="2rem" color="primary.dark" >{subject.subjectName}</Typography>
                <Typography variant="h4" fontSize="1rem" color="primary.main">{subject.teacherName}</Typography>
              </CardContent>
          </Card>
          <br />
        </div>
      ))}
        </div>
       
        }      
        </Box>
      
      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{textAlign:"center"}}>{"Add Subject to your room"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <AddSubjectPopUp/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogClose}>Submit</Button>
        </DialogActions>
      </Dialog>

        </ThemeProvider>
    );
}