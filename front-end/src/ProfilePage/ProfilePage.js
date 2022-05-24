import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";
import {Box, Grid, Stack, Typography, Divider, Avatar, Button, Modal, IconButton} from "@mui/material";
import { ChatState } from "../Context/ChatProvider"
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import React from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import EditProfileModal from "./EditProdileModal"

import { useNavigate } from "react-router-dom";

function ProfilePage(){
    const { user } = ChatState();
    console.log(user);

    const navigate = useNavigate();

    const handleRouteLogOut = () => {
        localStorage.removeItem("userinfo");
        navigate("/");
      }
      
    return(
        <ThemeProvider theme={theme}>
            <Box sx={{bgcolor:"primary.main", width:"100%", height:"100%", overflow:"auto"}}>
            <Box textAlign="center" marginTop="2%">
            <Typography variant="h1" fontSize="2rem" color="secondary.main">My Profile</Typography>
            </Box>
            <Box sx={{ width:"95%", marginLeft:"2%"}}>
            <Box sx={{bgcolor:"#DBE2EF", borderRadius:"2px"}}>
                <Stack>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar sx={{width:"5rem", height:"5rem", margin:"3%"}} src={user.pic}/> 
                    </Box>
                <Box padding="2%">
                <Typography variant="h1" fontSize="0.5rem" color="primary.dark">Full Name :</Typography>
    <Typography variant="h3" fontSize="1rem" color="primary.main" marginBottom="0.5%">{user.name}</Typography>

                {/* <Typography variant="h1" fontSize="0.5rem" color="primary.dark">Username :</Typography> */}
                <Typography variant="h1" fontSize="0.5rem" color="primary.dark">Email :</Typography>
    <Typography variant="h3" fontSize="1rem" color="primary.main" marginBottom="0.5%">{user.email}</Typography>
                {/* <Typography variant="h1" fontSize="0.5rem" color="primary.dark">Phone number :</Typography>
                <Typography variant="h3" fontSize="1rem" color="primary.main" marginBottom="0.5%">0881111111</Typography> */}
                </Box>
                </Stack>
            
            </Box>
            <Stack direction="column" marginTop="1%">
            {/* <Button style={{backgroundColor:"grey"}}variant="contained" startIcon={<EditIcon/>}>
                Edit Profile
            </Button> */}
            <EditProfileModal variant="contained" sx={{marginTop:"1%"}} user={user}/>
            <Button onClick={handleRouteLogOut} style={{backgroundColor:"red"}} variant="contained" sx={{marginTop:"1%"}} startIcon={<LogoutIcon/>}>
                Log Out
            </Button>
            </Stack>
            </Box>
            </Box>
        </ThemeProvider>
    );
}

// const ProfilePage = ({ user, children }) => {
//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//       };

    

//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     return <>

//     { children ? ( <span onClick={handleOpen}>{children}</span>
//     ) : (
//         <Button arialable="profile" onClick={handleOpen}>
//             <AccountCircleIcon/>
//         </Button>
//     )}
//     <Modal
//   open={open}
//   onClose={handleClose}
//   aria-labelledby="modal-modal-title"
//   aria-describedby="modal-modal-description"
// >
//   <Box sx={style}>
//     <Typography id="modal-modal-title" variant="h6" component="h2">
//       Text in a modal
//     </Typography>
//     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//     </Typography>
//   </Box>
// </Modal>
        
//     </>
    
// }

export default ProfilePage;