import React, {createRef, useRef} from "react";
import {Stack, TextField, Avatar, MenuItem, Button, Grid} from "@mui/material";
import { Box } from "@mui/system";
import styled from '@emotion/styled';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { RedeemRounded } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input'
import UserListItem from '../HomePage/HomePage'
import UserBadgeItem from '../millen/UserBadgeItem'


// First Step
const CustomImagePicker = styled(Avatar)(() => ({
  margin: "5% 0%",
  width: "70px",
  height: "70px",
  ":hover" : {
      backgroundColor : 'red',
      color : 'black',
      position : 'relative'
  },
  cursor: 'pointer',
}));

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

//Second Step
function AddSubjectMainPage(){
  return (
    <Stack>
      <TextField label="Subject name"/>
    </Stack>
  )
}

// function NameBestMatePage(){
//   return (
//     <Stack>
//     <Box  display="flex"
//   justifyContent="center"
//   alignItems="center">
//     <CustomImagePicker><AddPhotoAlternateIcon/></CustomImagePicker>
//     </Box>
//         <TextField label="Bot's name" sx={{marginBottom:"1rem"}}/>
//     </Stack>
//   )
// }

export default function CreateRoom(props,{children}){


    const {onClose, setPage} = props;
    const [school, setSchool] = React.useState("home");
    const imageRef = useRef(null);
    const [image, setImage] = React.useState(null);
    const [open, setOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();

    const handleChange = (event) => {
      setSchool(event.target.value);
    };

    const handleSubmit = () => {
      setPage(3);
    }

    const onImageClick = () =>{
      imageRef.current.click();
    }

    const imageHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2){
          setImage(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
      console.log("Hello")
    }
    const handleSearch = async (query) => {
      setSearch(query);
      if (!query) {
        return;
      }

      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);

        setLoading(false);
        setSearchResult(data);
      } catch (error) {

      }
    };


    return (
      <Stack>
      <Box  display="flex"
    justifyContent="center"
    alignItems="center">
      <input type="file"  accept="image/*" style={{display:"none"}} ref={imageRef} onChange={imageHandler}
      />
      <CustomImagePicker onClick={onImageClick} src={image}></CustomImagePicker>
      </Box>
          <TextField fullWidth label="Room's name" sx={{marginBottom:"1rem"}} onChange={(e)=>setGroupChatName(e.target.value)}/>
          <TextField sx={{marginBottom:"1rem"}} placeholder="add to room"  onChange={(e)=>handleSearch(e.target.value)}>
          
            </TextField>
      <Grid container justifyContent="flex-end">
      <Button sx={{width:"10%"}} onClick={handleSubmit}>Submit</Button>
      </Grid>
      </Stack>
    );
}