import React, {useState} from 'react'
import axios from "axios"
import EditIcon from '@mui/icons-material/Edit';
import { ChatState} from "../Context/ChatProvider"
import {Button, Box, Typography, Modal, FormControl, Input, TextField} from '@mui/material'
import Alert from "@mui/material/Alert"


const token = sessionStorage.getItem('token');

const EditProfileModal = ({user,children}) => {


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

    const { setUser} = ChatState();
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPic, setPic] = useState();

    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
  
    const onEditProfile = async () => {

      if (!userName || ! userEmail || !userPassword){
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          `/api/user/edit`,
          {
              _id: user._id,
              name: userName,
              email: userEmail,
              password: userPassword,
              pic: userPic,
          },
          config
        );
        setUser(data)
        localStorage.setItem("userinfo", JSON.stringify(data))
        console.log(data)
      
        handleClose()

      } catch (error) {
      }
      setUserEmail("")
      setUserName("")
      setUserPassword("")
    };
    const postDetails = async (pics) =>{
      setLoading(true)
      if(pics === undefined){
        <Alert variant="outlined" severity="error">
          This is an error alert — check it out!</Alert>
          return
      }
      if(pics.type === "image/jpeg" || "image/png"){
        const data = new FormData()
        data.append("file", pics)
        data.append("upload_preset", "Classmate")
        data.append("cloud_name", "dp1xewsqt")
        fetch("http://api.cloudinary.com/v1_1/dp1xewsqt/image/upload", {
          method:"post",
          body: data,
        })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString())
          console.log(data.url.toString())
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
      } else{
        <Alert variant="outlined" severity="error">
        This is an error alert — check it out!</Alert>
      }
    }

    return (
        <div>
        <Button onClick={handleOpen} style={{backgroundColor:"grey", width:"100%"}}variant="contained" startIcon={<EditIcon/>}>
                Edit Profile
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <FormControl>
                <Input value={userName}variant="h1" fontSize="0.5rem" placeholder="new name" onChange={(e) => setUserName(e.target.value)}>Full Name :</Input>
                <Input value={userEmail}variant="h1" fontSize="0.5rem"placeholder="new email" onChange={(e) => setUserEmail(e.target.value)}>Username :</Input>
                <Input value={userPassword}variant="h1" fontSize="0.5rem"placeholder="new password" onChange={(e) => setUserPassword(e.target.value)}>Username :</Input>
                <input
                      type="file"
                      accept="image/*"
                      onChange={ (e) => 
                        postDetails(e.target.files[0])
                      }
                    />
                <Button onClick={onEditProfile} style={{backgroundColor:"grey"}}variant="contained">
                Update
            </Button>
            </FormControl>
        </Box>
      </Modal>
      

    </div>
    )
}

export default EditProfileModal