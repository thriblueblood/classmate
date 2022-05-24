import { Stack, Avatar, Box, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';

import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { AddRoomPopup } from './AddRoomPopup';
import MyRooms from './MyRooms'
import {ChatState} from "../Context/ChatProvider"

import List from "@mui/material/List";
import ChatLoading from "../ChatPage/ChatLoading"
import {getSender} from "../Config/ChatLogics"
import CircularProgress from '@mui/material/CircularProgress';
import PeopleIcon from '@mui/icons-material/People';

import axios from "axios";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#f5f5f9',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(20),
    border: '1px solid #dadde9',
  },
}));

const CustomSideBarItem = styled(Avatar)(() => ({
    margin: "5% 0%",
    ":hover" : {
        backgroundColor : 'red',
        color : 'black',
        position : 'relative'
    },
    cursor: 'pointer',
    
  }));
  
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  
  function splitString(name) {
    let lstString = name.split(" ")
    let result = ""
    for (let i = 0; i < lstString.length; i++) {
        result += lstString[i][0]
    }
    result = result.slice(0, 3).toUpperCase()
    return result
}

export default function SideBar(){ 

    const [open, setOpen] = React.useState(false);

    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats} = ChatState();
    const [loading, setLoading] = useState(true);

    const [resetDM, setResetDM] = useState(false);

      useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userinfo")));
        // fetchChats();
      }, []);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
      <div>
        <Stack alignItems="center">
            <Box>
            <Divider/>
            <HtmlTooltip placement="right" title={
              <React.Fragment>
                <Typography color="primary.dark">Home</Typography>
              </React.Fragment>
            }>
            <CustomSideBarItem component={Link} to="home">
               <HomeIcon />
            </CustomSideBarItem>
            </HtmlTooltip>
            </Box>
            <Divider sx={{width:'70%', backgroundColor:"white", margin:"5% 0%"}}/>
            {chats ? (
                          <Stack spacing={1}>
                              {chats.map((chat) => (
                                <HtmlTooltip placement="right"
                                title={
                                  <React.Fragment>
                                    <Typography color="primary.dark">{chat.chatName}</Typography>
                                    <Box sx={{alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%"}}>
              <PeopleIcon sx={{color:"primary.dark"}}/>
              <Typography color="primary.dark" variant='h2' fontSize="1rem">{chat.users.length}</Typography>
            </Box>
                                  </React.Fragment>
                                }>
                                <CustomSideBarItem
                                    onClick={() => setSelectedChat(chat)}
                                    key={chat._id}
                                    sx = {{fontSize:"1rem",display: chat.isGroupChat ? chat.chatName: "none", bgcolor: stringToColor(chat.chatName), color:"black", textDecoration:"none"}}
                                    component={Link} to="room/chat" variant='rounded'
                                    >
                                      {splitString(chat.chatName)}
                                    
                                    {/* <Avatar
                                    sx={{marginRight:"2%"}}
                                    size="sm"
                                    cursor="pointer"
                                    src={chats.pic} */}
                                    
                                    {/* /> */}
                                        {/* <Typography>
                                            {!chat.isGroupChat 
                                            ? getSender(loggedUser, chat.users)
                                            :chat.chatName}
                                            
                                        </Typography>
                                         */}
                                    </CustomSideBarItem>
                                </HtmlTooltip>
                                 
                                ))}
                          </Stack>
                               
                        ) : (
                            <ChatLoading/>
                        )}
            {/* <CustomSideBarItem component={Link} to="room" variant='rounded'>
                SE
            </CustomSideBarItem>
            <MyRooms/> */}
            <HtmlTooltip placement="right" title={
              <React.Fragment>
                <Typography color="primary.dark">Add Room</Typography>
              </React.Fragment>
            }>
            <CustomSideBarItem onClick={handleClickOpen} >
               <AddIcon/>
            </CustomSideBarItem>
            </HtmlTooltip>

            <HtmlTooltip placement="right" title={
              <React.Fragment>
                <Typography color="primary.dark">My Profile</Typography>
              </React.Fragment>
            }>
            <Avatar 
            component={Link} to="profile" 
            sx={{position:"fixed", bottom:"0", 
            marginBottom:"1rem"}}
            // src={user.pic ? user.pic : ""}
            
            cursor="pointer"
            
            />
            </HtmlTooltip>
        </Stack>
        <AddRoomPopup open={open} onClose={handleClose} />
      </div>
    )
}