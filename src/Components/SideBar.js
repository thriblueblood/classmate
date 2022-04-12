import { Stack, Avatar, Box, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';

const CustomSideBarItem = styled(Avatar)(() => ({
    margin: "5% 0%",
    ":hover" : {
        backgroundColor : 'red',
        color : 'black',
        position : 'relative'
    },
    cursor: 'pointer',
  }));

function SideBar(){ 
    return (
        <Stack alignItems="center">
            <Box>
            <Divider/>
            <CustomSideBarItem>
               <HomeIcon/>
            </CustomSideBarItem>
            </Box>

            <CustomSideBarItem variant='rounded'>
                SE
            </CustomSideBarItem>
            <CustomSideBarItem >
               <AddIcon/>
            </CustomSideBarItem>
        </Stack>
    )
}

export default SideBar;