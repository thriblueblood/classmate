import React, { useEffect, useLayoutEffect } from 'react'
import { ChatState } from '../Context/ChatProvider'
import Box from '@mui/material/Box'
import { Typography, FormControl, Input } from '@mui/material';
import {getSender} from "../Config/ChatLogics"
import UpdateGroupChatModal from './UpdateGroupChatModal';
import CircularProgress from '@mui/material/CircularProgress';
import {useState} from 'react'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:5000"
var socket, selectedChatCompare

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const { user, selectedChat, setSelectedChat} = ChatState();

    const [reset,setReset] = useState(false)

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };

          setLoading(true);

          const { data } = await axios.get(
            `/api/message/${selectedChat._id}`,
            config
          );

          setMessages(data);
          setLoading(false);
          socket.emit("join chat", selectedChat._id)


        } catch (error) {

        }
      };

    const sendMessage = async(event) => {
        if(event.key==="Enter" && newMessage){
            try {
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                }
                setNewMessage("");
                const { data } = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id
                },
                config

                )
                socket.emit("new message", data)

                setMessages([...messages, data]);
            } catch (error) {
                console.log(error)
            }
        }}
    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }

    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit("setup", user)
        socket.on("connected", ()=> setSocketConnected(true))
    })

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat
    }, [selectedChat])

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
          if (
            !selectedChatCompare || // if chat is not selected or doesn't match current chat
            selectedChatCompare._id !== newMessageRecieved.chat._id
          ) {
            // if (!notification.includes(newMessageRecieved)) {
            //     setNotification([newMessageRecieved, ...notification]);
            //     setFetchAgain(!fetchAgain);
            //   }
          } else {
            setMessages([...messages, newMessageRecieved]);
          }
        });
      });

    return (
        <ThemeProvider theme={theme}>
 <div style={{flexGrow:"1", maxWidth:"100%"}}>
        {selectedChat ? (
            <>
        <Box paddingBottom="15px" sx={{borderBottom:"1px solid #112D4E"}}>
        <Box display="flex" sx={{alignItems:"center", color:"primary.main"}}>
        <ChatBubbleIcon/>
        <Typography
        fontSize={{ base: "28px", md: "30px" }}
        w="100%"
        alignItems="center"
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
        </Box>
        </Box>

          
        <Box 
        sx={{
        d:"flex",
        flexDir:"column",
        justifyContent:"flex-end",
        backgroundColor:"secondary.main",
        w:"100%",
        h:"100%",
        overflowY:"hidden",
        }}
        >
        {loading ? (
            <div style={{height:'500px',display: 'flex', justifyContent: 'center', marginTop:"50%"}}>
                <CircularProgress/>
            </div>
            ):(
            <div className="messages" style={{overflow:"auto", height: selectedChat.isGroupChat ? '85vh' : "60vh"}}>
                <ScrollableChat messages={messages}/>
            </div>
            )}
            <Box sx={{
                backgroundColor: "#fff",display: "flex", justifyContent: "space-between",padding: "10px",borderRadius: "8px"
            }}>
            <FormControl onKeyDown={sendMessage} isRequire>
                {istyping ? <div>Loading...</div> : <></>}
                <Input
                    placeholder="Enter a message.."
                    onChange={typingHandler}
                    value={newMessage}
                    style={{flexGrow:"1", padding:"0 15px", backgroundColor:"transparent",border:"none",outline:"none"}}
                    disableUnderline="true"
                />
            </FormControl>
            <IconButton onClick={sendMessage} sx={{
                    width:"36px", height:"36px", backgroundColor:"primary.main",color:"secondary.main", cursor:"pointer"
                    ,borderRadius:"5px", lineHeight:"36px",
                    transition:"all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11)"
                }}>
                <SendIcon/>
                </IconButton>
            </Box>
          </Box>
            </>
        ) : (
            //No DM
            <Box d="flex" alignItems="center" justifyContent="center" h="100%" >
                <Typography fontFamily="Work sans" fontSize="20px" j>
                    Click on a user to start chatting
                </Typography>
            </Box>
        )}
    </div>
        </ThemeProvider>
    )
}

export default SingleChat;
