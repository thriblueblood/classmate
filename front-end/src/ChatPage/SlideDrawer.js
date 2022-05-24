import React from 'react'
import {useState} from 'react'
import Button from "@mui/material/Button"
import { Typography, Drawer, Input,FormControl, IconButton } from '@mui/material'
import Box from "@mui/material/Box";
import { ChatState} from "../Context/ChatProvider"
import ChatLoading from "./ChatLoading"
import UserListItem from "./UserListItem"
import axios from 'axios'

import SearchIcon from '@mui/icons-material/Search';

import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";



 const SlideDrawer = () => {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [open, setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState();
    const handleClose = () => setOpen(false)

    const { user, setSelectedChat, chats, setChats} = ChatState();
    const toggleDrawer = (newOpen) => (event) => {
        setOpen(newOpen)
    }

    const handleSearch = async() => {
        if(!search){
            console.log("error no search entered")
        }

        try{

            const config = {
                headers: {
                    
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data} = await axios.get(`/api/user?search=${search}`, config)
            

            setLoading(false);
            setSearchResult(data);

        }catch (error){
            console.log("error can't fetch data");
        }
    }

    const accessChat = async (userId) => {
        console.log(userId);
    
        try {
          setLoadingChat(true);

          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };

          const { data } = await axios.post(`/api/chat`, { userId }, config);
    
          if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

          setSelectedChat(data);
          setLoadingChat(false);
          
          handleClose(false);
        } catch (error) {

        }
      };

    return (
      <ThemeProvider theme={theme}>
  <div>
            <Button onClick={toggleDrawer(true)} sx={{backgroundColor:"primary.main", marginBottom:"2%"}}>
                {/* <i class="fas fa-search"></i> */}
                <Typography variant="h2" fontSize="1.25em" color="secondary.main" px={2}>Start a conversation</Typography>
            </Button>

          <Drawer
            anchor={"left"}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            sx={{width:"1000px"}}
          >
            {/* <Box d="flex" pb={2}>
                <Typography variant="h5">Search user</Typography>
                <input
                placeholder="Type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                >
                </input>
                <Button onClick={handleSearch} variant="ghost"> Go </Button>
            </Box> */}
            <Box sx={{width:"100%"}}>
            <Box sx={{
                backgroundColor: "#979797",display: "flex",borderRadius: "8px"
            }}> 
            <FormControl onKeyDown={handleSearch} isRequire>
            <Input
                    placeholder="Who would you like to communicate ?"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    style={{flexGrow:"1", padding:"0 15px", backgroundColor:"transparent",border:"none",outline:"none"}}
                    disableUnderline="true"
                    fullWidth
                />
            </FormControl>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            </Box>

          </Drawer>
        </div>
      </ThemeProvider>
      
    )
}

export default SlideDrawer
