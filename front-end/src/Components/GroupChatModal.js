import React from 'react'
import { useState} from 'react'
import {Button, Box, Typography, Modal, FormControl, Input, TextField} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import createRoomIcon from "../img/create-room.png";
import axios from "axios";

import { ChatState } from "../Context/ChatProvider";

import UserListItem from '../ChatPage/UserListItem'
import UserBadgeItem from '../millen/UserBadgeItem'

const GroupChatModal = ({children}) => {

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats, rooms, setRooms } = ChatState();

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
      const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
          return;
        }

        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(
            '/api/chat/group',
            {
              name: groupChatName,
              users: JSON.stringify(selectedUsers.map((u) => u._id)),
            },
            config
          );
          setRooms([data, ...rooms]);
          handleClose(false)
        } catch (error) {
        }
      };
      
    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
          return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
      };

      const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
      };
    
    return (
        <div>
        <Box onClick= {handleOpen} sx={{ border: "1px solid", borderRadius: "3px", margin: "3% 0%", alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%", cursor: 'pointer' }}>
        <img src={createRoomIcon} style={{ width: "10%" }} />
        <Typography variant='overline' fontSize="1rem">Create a room</Typography>
        <ChevronRightIcon sx={{ float: "right", marginLeft: "auto" }} />
      </Box>

      <Modal
      open={open}
      onClose={handleClose}
    >
      <Box  sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create a room
        </Typography>
        <FormControl>
            <TextField fullWidth sx={{marginBottom:"1rem"}} onChange={(e)=>setGroupChatName(e.target.value)}/>
            <TextField sx={{marginBottom:"1rem"}} placeholder="add to room"  onChange={(e)=>handleSearch(e.target.value)}/>
        </FormControl>
        <Box w="100%" d="flex" flexWrap="wrap">
          {selectedUsers.map((u) => (
            <UserBadgeItem
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </Box>
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
                handleFunction={() => handleGroup(user)}
              />
            ))
        )}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <Button variant="ghost" onClick={handleClose}>Close</Button>
        <Button variant="ghost" onClick={handleSubmit}>Create a room</Button>
      </Typography>
      </Box>
    </Modal>
    </div>

    )
}

export default GroupChatModal
