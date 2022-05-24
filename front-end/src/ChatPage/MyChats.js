import React, { useState, useEffect} from 'react'
import {ChatState} from "../Context/ChatProvider"
import axios from "axios";
import {Paper, Typography, Avatar} from "@mui/material"
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ChatLoading from "./ChatLoading"
import {getSender, getProfilePic} from "../Config/ChatLogics"
import Button from '@mui/material/Button'
import Stack from "@mui/material/Stack"
import CircularProgress from '@mui/material/CircularProgress';

 const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats} = ChatState();
    const [loading, setLoading] = useState(true);

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

          for (let i = 0; i < data.length; i++){
              if (data[i].isGroupChat === true){
                console.log("inder"+i)
                setChats(data);
              }
          }
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      };

      useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userinfo")));
        fetchChats();
      }, []);

    return (
      <div>
      {
        loading ? <CircularProgress/>
        :
        <Box>
        { chats ? (
          <List style={{maxHeight:"65vh", overflow:"auto"}}>
            {chats?.map((chat) => (
             <Box sx={{ backgroundColor : selectedChat===chat ? "primary.dark": "primary.main", alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%", cursor: 'pointer',display: chat.isGroupChat ? "none": chat.chatName, marginBottom:"2%" }} onClick={()=> setSelectedChat(chat)}>
       <Avatar sx={{marginRight:"2%"}} src={getProfilePic(loggedUser, chat.users)}></Avatar>
       <Typography variant='h2' fontSize="1rem" color="secondary.main">
       {!chat.isGroupChat ? getSender(loggedUser, chat.users) :chat.chatName}
       </Typography>
     </Box>
            ))}
          </List>
                 ) : (
                     <ChatLoading/>
                 )}
     </Box>
      }
      </div>

            
    )
}

export default MyChats;