import React from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import { IconButton, Typography, FormControl , InputLabel, Input, FormHelperText, Button} from '@mui/material';
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import {useState} from 'react'
import { ChatState} from "../Context/ChatProvider"
import UserBadgeItem from "../millen/UserBadgeItem"
import axios from "axios"
import UserListItem from './UserListItem'

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain, fetchMessage}) => {
    const [open, setOpen] = React.useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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
        
    
          user1._id === user._id ? setSelectedChat() : setSelectedChat(data);

          setFetchAgain(!fetchAgain);
          fetchMessage();
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

      const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
          console.log("user already in group")
          return;
        }
    
        if (selectedChat.groupAdmin._id !== user._id) {
          console.log("only admin can add")
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
            `/api/chat/groupadd`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );
    
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setLoading(false);
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
        setGroupChatName("");
      };
    
  
    return (
      <div>
        <GroupsIcon onClick={handleOpen} ></GroupsIcon>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedChat.chatName}
            </Typography>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              {selectedChat.users.map(u =>(
                <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleRemove(u)}
              />
              ))}
            </Box>
            <FormControl d="flex">
                
                <Input value={groupChatName} 
                placeholder="user name"
                onChange={(e)=> setGroupChatName(e.target.value)}>user name</Input>
                <Button
                variant="solid"
                isLoading={renameloading}
                onClick={handleRename}
                >
                Update
                </Button>
  {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Button variant="ghost" onClick={()=> handleRemove(user)} >Leave Group</Button>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 3)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}

          </Box>
        </Modal>
      </div>
    );
}

export default UpdateGroupChatModal