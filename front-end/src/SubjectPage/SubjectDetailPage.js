import { Typography, MenuItem, TextField,Box, Grid,Button } from "@mui/material";
import { useState , useEffect} from "react";
import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";
import "./SubjectDetailPage.css";

import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ChatState} from '../Context/ChatProvider'

import Slide from '@mui/material/Slide';
import axios from 'axios'
import AddFileModal from './AddFileModal'
import download from 'downloadjs'
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const weekSubject = [
  {
    number: 1,
    date: "12/12/21",
  },
  {
    number: 2,
    date: "24/12/21",
  },
];

export default function SubjectDetail() {
    const [tab, setTab] = useState(1);
    const {selectedChat, user} = ChatState();
    const [filesList, setFilesList] = useState([]);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);

    const {state} = useLocation();
    const {subjectName, teacherName, subjectId} = state;

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
  
       setLoading(false) 
      } catch (error) {
        console.log("Error fetching subjects")
        console.log(error)
      }
    };
    useEffect(() => {
      fetchSubjects();
    }, []);

    useEffect(() => {
      const getFilesList = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          setLoading(true);

          const { data } = await axios.get(`/api/file/getAllFiles/${subjectId}`,config);

          console.log(subjectId)
          setFilesList(data);
          console.log(data);
          setLoading(false);
        } catch (error) {
          console.log("error get files list");

        }
      };


      getFilesList();
    }, [filesList]);

    const downloadFile = async (id, path, mimetype) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`

          },
        };
        console.log(id)
        console.log(path)
        console.log(mimetype)
        const result = await axios.get(`/api/file/download/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          responseType: 'blob',
        }, );
        const split = path.split('/');
        const filename = split[split.length - 1];
        console.log("mai")

        return download(result.data, filename, mimetype);

      } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 400) {
          console.log('Error,uyr');
        }
      }
    };
  
    const changeTab = (index) => {
      setTab(index);
    };

    
    return (
        <div style={{padding:"2%",width:'90%'}}>
        <Typography variant="h2">{subjectName}</Typography>
        <Typography variant="subtitle2">{teacherName}</Typography>
        {/* <Typography variant="subtitle2">
          Class time : 13:00 PM - 15.00 PM
        </Typography>
        <Typography variant="subtitle2">
          Mid-term examination : 30 Feb 2035, 13.00 AM - 15.00 PM
        </Typography>
        <Typography variant="subtitle2">
          Final examination : 30 April 2035, 13.00 AM - 15.00 PM
        </Typography> */}
        <br></br>
        <div>
  <div className="block_tab">
          <div
            onClick={() => changeTab(1)}
            className={tab === 1 ? "tabs active-tabs" : "tabs"}
          >
            Materials
          </div>
          <div
            onClick={() => changeTab(2)}
            className={tab === 2 ? "tabs active-tabs" : "tabs"}
          >
            Assignments{" "}
          </div>
          <div
            onClick={() => changeTab(3)}
            className={tab === 3 ? "tabs active-tabs" : "tabs"}
          >
            Notes
          </div>
          {/* <div className="drop_down" sx={{borderRadius:"10px"}}>
            <TextField select borderRadius = "29">
              {weekSubject.map((week) => (
                <MenuItem key={week.number} value={week.number}>
                  {"Week " + week.number + "," + week.date}
                </MenuItem>
              ))}
            </TextField>
          </div> */}
        </div>
        <div className="content_container">
        <Box sx={{display:"flex",  margin:"1% 0%",marginLeft:"auto"}}>
        {/* <Button style={{backgroundColor:"green", margin:"1% 0%",marginLeft:"auto"}}variant="contained">
            </Button> */}
            <AddFileModal style={{backgroundColor:"green", margin:"1% 0%",marginLeft:"auto"}} subjectId={subjectId}/> 
          </Box>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
            {Array.from(filesList).map((file, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                <Box sx={{backgroundColor:"primary.dark", borderRadius:"5%", height:"20vh",padding:"5%"}} onClick = { () => {
          console.log("Window:",window.location.href)
          navigate(window.location.pathname+"/file");
        }}>
                <Typography variant="h1" fontSize="1rem" color="secondary.main">{file.title}</Typography>
                <Typography variant="h3" fontSize="0.5rem" color="secondary.main">{file.description}</Typography>
                <Typography variant="h3" fontSize="0.5rem" color="secondary.main">{file.fileType}</Typography>
                <a 
                  href="#/"
                  onClick={()=> 
                  downloadFile(file._id, file.file_path, file.file_mimetype)
                  }
                >
                Download 
                </a>
                </Box>
                
        </Grid>
        ))}
        </Grid>
        </div>
        </div>
           {/* Dialog */}
      {/* <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{textAlign:"center"}}>{"Add a material"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Box>
            <Typography variant="h2" fontSize="1rem">Title</Typography>
            <TextField fullWidth sx={{marginBottom:"2%"}}></TextField>

            <Typography variant="h2" fontSize="1rem">Description</Typography>
            <TextField
          id="outlined-multiline-static"
          fullWidth
          multiline
          rows={4}
          sx={{marginBottom:"2%"}}
        />

<Typography variant="h2" fontSize="1rem">Attached File</Typography>
<Button  variant="text" startIcon={<AddIcon/>} >
                Add New File
            </Button>
          </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogClose}>Submit</Button>
        </DialogActions>
      </Dialog> */}

        </div>
    );
  }
  
