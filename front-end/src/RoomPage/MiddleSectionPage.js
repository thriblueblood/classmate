import React, { useEffect,useState } from 'react'
import { Stack, Box, Typography, Divider} from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";

import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';

import { ChatState} from '../Context/ChatProvider'
import { getSender} from '../Config/ChatLogics'
import UpdateGroupChatModal from '../ChatPage/UpdateGroupChatModal';

import styled from '@emotion/styled';

import { useNavigate } from "react-router-dom";


const RoomMenu = styled(Typography)(() => ({
  fontSize: '1rem',
  ":hover" : {
      color : 'black'
  },
  cursor: 'pointer',
}));

function MiddleSectionPage({fetchAgain, setFetchAgain}){
  const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const { user, selectedChat, setSelectedChat} = ChatState();

    
  const navigate = useNavigate();

  const handleRouteChat = () => {
    navigate("/main/room/chat");
  }

  const handleRouteSubject = () => {
    navigate("/main/room/subject");
  }

  const handleRouteFile = () => {
    navigate("/main/room/file");
  }

  const handleRouteMember = () => {
    navigate("/main/room/member");
  }

    return(
        <ThemeProvider theme={theme}>
            <Stack sx={{bgcolor:"primary.main", width:"100%", height:"100%", overflow:"auto"}}>

            <Box textAlign="center" margin="2% 0%">
            <Typography
        variant="h1" fontSize="1.5rem" color="secondary.main" margin="5% 0%"
      >
          {!selectedChat.isGroupChat ? (
              <>
                {getSender(user,selectedChat.users)}
                {/* profilemodal */}
              </>
          ) : (
              <>
              {selectedChat.chatName.toUpperCase()}
              
              </>
          )}
      </Typography>
      
            
            <Divider sx={{color:'primary.dark'}}/>
            </Box>

            <Stack alignItems="center">
            {/* <Box sx={{alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%"}}>
              <LocationCityIcon sx={{color:"primary.dark"}}/>
              <Typography color="primary.dark" variant='h2' fontSize="1rem">King Mongkut of Ladgrbang</Typography>
            </Box> */}

            <Box sx={{alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%"}}>
            <UpdateGroupChatModal
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              
              />
            {/* <Typography color="primary.dark" variant='h2' fontSize="1rem">3</Typography> */}
            </Box>
            </Stack>

            {/* <RoomMenu variant="h2" color="secondary.main" >Chats</RoomMenu> */}
            <RoomMenu variant="h2" color="secondary.main" onClick={handleRouteChat}>Chat</RoomMenu>
            <RoomMenu variant="h2" color="secondary.main" onClick={handleRouteSubject}>Subject</RoomMenu>
            {/* <RoomMenu variant="h2" color="secondary.main" onClick={handleRouteFile}>Other Files</RoomMenu> */}
            <RoomMenu variant="h2" color="secondary.main" onClick={handleRouteMember}>Members</RoomMenu>
            

            </Stack>
        </ThemeProvider>
    );
}

export default MiddleSectionPage;