import React, { useState, useEffect} from 'react'
import {ChatState} from "../Context/ChatProvider"
import axios from "axios";
import {Paper, Typography, Avatar} from "@mui/material"
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ChatLoading from "../ChatPage/ChatLoading"
import {getSender} from "../Config/ChatLogics"
import Button from '@mui/material/Button'
import Stack from "@mui/material/Stack"
import styled from '@emotion/styled';

const CustomSideBarItem = styled(Avatar)(() => ({
  margin: "5% 0%",
  padding: "5%",
  ":hover" : {
      backgroundColor : 'red',
      color : 'black',
      position : 'relative'
  },
  cursor: 'pointer',
  
}));


 const MyRooms = ({ fetchAgain}) => {
   
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats} = ChatState();

    const fetchChats = async () => {
      if (!user._id) {
        console.log("cant find _id");
        return;
      }
        // console.log(user._id);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
              
            },
          };
          
          const { data } = await axios.get("/api/chat", config);


          setChats(data);
              
        } catch (error) {
          console.log("Error fetching chats")
        }
      };

      useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userinfo")));
        fetchChats();
      }, []);

    return (
              <Box sx={{ backgroundColor:"primary.main", alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%", cursor: 'pointer'}}>
               { chats ? (
                            <List style = {{ maxHeight: 500, overflow: 'auto',}} fontSize="1rem" >
                                {chats.map((chat) => (
                                    <CustomSideBarItem
                                    onClick={() => setSelectedChat(chat)}
                                    py={2}
                                    borderRadius="5px"
                                    key={chat._id}
                                    sx = {{display: chat.isGroupChat ? chat.chatName: "none"}}
                                    >
                                    
                                    {/* <Avatar
                                    sx={{marginRight:"2%"}}
                                    size="sm"
                                    cursor="pointer"
                                    src={chats.pic} */}
                                    
                                    />
                                        <Typography>
                                            {!chat.isGroupChat 
                                            ? getSender(loggedUser, chat.users)
                                            :chat.chatName}
                                            
                                        </Typography>
                                        
                                    </CustomSideBarItem>
                                ))}
                            </List>
                        ) : (
                            <ChatLoading/>
                        )}
            </Box>
    )
}

export default MyRooms;