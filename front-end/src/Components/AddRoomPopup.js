import { Stack, Box, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import * as React from "react";
import createRoomIcon from "../img/create-room.png";
import joinRoomIcon from "../img/join-room.png";
import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import SuccessCreateRoom from './SuccessCreateRoom';
import GroupChatModal from '../Components/GroupChatModal'

export function AddRoomPopup(props) {

  //dialog
  const { onClose, open } = props;

  //change page
  const [page,setPage] = React.useState(0);

  const handleClose = () => {
    onClose(true);
    setPage(0);
  }; 

  const handleCreateRoom = () => {
    setPage(1);
  }

  const handleJoinRoom = () => {
    setPage(2);
  }
  
  const getDialogtitle = (page) =>{
    switch(page) {
      case 0:
        return <Typography variant='overline' fontSize="1.5rem">Create/Join a room</Typography>;
      case 1:
        return <Typography variant='overline' fontSize="1.5rem">Create a room</Typography>;
      case 2:
        return <Typography variant='overline' fontSize="1.5rem">Join a room</Typography>;

      case 3:
        return <Typography variant='overline' fontSize="1.5rem">Create a room successfully!</Typography>;
      
      case 4:
        return <Typography variant='overline' fontSize="1.5rem">Join a room successfully!</Typography>;

      default:
        return 'foo';
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog fullWidth onClose={handleClose} open={open} sx={{ itemAlign: "center" }}>
        <DialogTitle>
          <Box onClick={handleClose}>
            <HighlightOffIcon sx={{ cursor: 'pointer', float: 'right' }} />
          </Box>
        <Box textAlign="center">
        {getDialogtitle(page)}
      </Box>
        </DialogTitle>
        <DialogContent>
          {(() => {
        if (page===0) {
          return (
            <Stack>
            <GroupChatModal/>
            <Box onClick= {handleJoinRoom} sx={{ border: "1px solid", borderRadius: "3px", alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%", cursor: 'pointer' }}>
              <img src={joinRoomIcon} style={{ width: "10%" }} />
              <Typography variant='overline' fontSize="1rem">Join a room</Typography>
              <ChevronRightIcon sx={{ float: "right", marginLeft: "auto" }} />
            </Box>
          </Stack>
          )
        } else if (page===1) {
          return (
            <CreateRoom  onClose={handleClose} setPage={setPage}/>
          )
        } else if (page===2) {
          return (
            <JoinRoom onClose={onClose}/>
          )
        }
        else if (page===3) {
          return (
            <SuccessCreateRoom/>
          )
        }
      })()}
         
        </DialogContent>
      </Dialog>
    </ThemeProvider>

  );
}
