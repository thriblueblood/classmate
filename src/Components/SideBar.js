import { Stack, Avatar, Box, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';

import * as React from "react";

import { AddRoomPopup } from './AddRoomPopup';

const CustomSideBarItem = styled(Avatar)(() => ({
    margin: "5% 0%",
    ":hover" : {
        backgroundColor : 'red',
        color : 'black',
        position : 'relative'
    },
    cursor: 'pointer',
  }));


export default function SideBar(){ 

    const [open, setOpen] = React.useState(false);

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
            <CustomSideBarItem>
               <HomeIcon/>
            </CustomSideBarItem>
            </Box>
            <Divider sx={{width:'70%', backgroundColor:"white", margin:"5% 0%"}}/>
            <CustomSideBarItem variant='rounded'>
                SE
            </CustomSideBarItem>
            <CustomSideBarItem onClick={handleClickOpen} >
               <AddIcon/>
            </CustomSideBarItem>
            <Avatar sx={{position:"fixed", bottom:"0", marginBottom:"1rem"}}></Avatar>
        </Stack>
        <AddRoomPopup open={open} onClose={handleClose} />
      </div>
    )
}