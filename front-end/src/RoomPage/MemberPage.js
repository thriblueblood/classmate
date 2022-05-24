import { Card, CardContent, CardActions,Stack, Box, Typography, Divider,Button, Avatar} from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";
import SearchBar from "../Components/SearchBar.js";
import AddIcon from '@mui/icons-material/Add';

import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ChatIcon from '@mui/icons-material/Chat';

import {ChatState} from "../Context/ChatProvider";

import axios from "axios";
import React from 'react';

import {useState} from 'react'

import UserBadgeItem from "../millen/UserBadgeItem"

export default function MemberPage({fetchAgain, setFetchAgain, fetchMessage}){

    const { selectedChat, setSelectedChat, user } = ChatState();
    const [open, setOpen] = React.useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    const handleRemove = async(user1) => {
      if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
        console.log("only admin can remove");
        return;
      }
  
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          `/api/chat/groupremove`,
          {
            chatId: selectedChat._id,
            userId: user1._id,
          },
          config
        );
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
      setGroupChatName("");
    };


    const handleRename = async () => {
      if (!groupChatName) return;
  
      try {
        setRenameLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          `/api/chat/rename`,
          {
            chatId: selectedChat._id,
            chatName: groupChatName,
          },
          config
        );
  
        console.log(data._id);
        // setSelectedChat("");
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
      } catch (error) {
        
        setRenameLoading(false);
      }
      setGroupChatName("");
    };


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
        console.log(data);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        
      }
    };

    const isAdmin = (u) =>{
      if (selectedChat.groupAdmin._id === u ){
        return true
      }else{
        return false
      }
    }

    const ownRole = () =>{
      if (selectedChat.groupAdmin._id === user._id ){
        return true
      }else{
        return false
      }
    }

    return(
   <ThemeProvider theme={theme}>
        <Box sx={{padding:"1%"}}> 
        <Box textAlign="center">
        <Typography variant="h2" fontSize="1.25rem">Members</Typography>
        </Box>    
        <Stack direction="row"> 
        </Stack>
      <Divider/>
      <Box sx={{marginBottom:"1%"}}>
      <SearchBar/>
      </Box>

        {selectedChat.users.map(u =>(
        <Box sx={{ border: "1px solid grey", borderRadius: "3px", alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%", cursor: 'pointer', marginBottom:"0.5%"}}>
              <Avatar sx={{marginRight:"1rem"}} src={u.pic}></Avatar>
              <Stack direction="column" spacing={-2}>
              <Typography variant='overline' fontSize="1rem">{u.name}</Typography>
              {
                isAdmin(u._id) ? <Typography>Admin</Typography> : <Typography>Member</Typography>
              }
              </Stack>
              <div style={{marginLeft:"auto"}}>

              <Button style={{backgroundColor:"primary.main"}}variant="contained">
                View Profile
            </Button>
            {
                ownRole() ?             
                <Button style={{backgroundColor:"red",marginLeft:"0.2rem"}}variant="contained" startIcon={<PersonRemoveIcon/>} onClick={ ()=>handleRemove(u)}>
               Remove from room
            </Button> :
            <div></div>
              }

              </div>

            </Box>
              
              ))}
        </Box>
        </ThemeProvider>
    )
}