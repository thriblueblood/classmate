import React, {createRef, useRef} from "react";
import {Stack, TextField, Avatar, MenuItem, Button, Grid} from "@mui/material";
import { Box } from "@mui/system";
import styled from '@emotion/styled';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { RedeemRounded } from "@mui/icons-material";


// First Step
const CustomImagePicker = styled(Avatar)(() => ({
  margin: "5% 0%",
  width: "70px",
  height: "70px",
  ":hover" : {
      backgroundColor : 'red',
      color : 'black',
      position : 'relative'
  },
  cursor: 'pointer',
}));

const schools = [
  {
    value: "kmitl",
    label: "King mongkut's institute of technology ladkrabang",
  },
  {
    value: "home",
    label: "Home",
  },
];

//Second Step
function AddSubjectMainPage(){
  return (
    <Stack>
      <TextField label="Subject name"/>
    </Stack>
  )
}

// function NameBestMatePage(){
//   return (
//     <Stack>
//     <Box  display="flex"
//   justifyContent="center"
//   alignItems="center">
//     <CustomImagePicker><AddPhotoAlternateIcon/></CustomImagePicker>
//     </Box>
//         <TextField label="Bot's name" sx={{marginBottom:"1rem"}}/>
//     </Stack>
//   )
// }

export default function CreateRoom(props){

    const {onClose, setPage} = props;
    const [school, setSchool] = React.useState("home");
    const imageRef = useRef(null);
    const [image, setImage] = React.useState(null);

    const handleChange = (event) => {
      setSchool(event.target.value);
    };

    const handleSubmit = () => {
      setPage(3);
    }

    const onImageClick = () =>{
      imageRef.current.click();
    }

    const imageHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2){
          setImage(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
      console.log("Hello")
    }
    return (
      <Stack>
      <Box  display="flex"
    justifyContent="center"
    alignItems="center">
      <input type="file"  accept="image/*" style={{display:"none"}} ref={imageRef} onChange={imageHandler}
      />
      <CustomImagePicker onClick={onImageClick} src={image}></CustomImagePicker>
      </Box>
          <TextField fullWidth label="Room's name" sx={{marginBottom:"1rem"}}/>
          <TextField sx={{marginBottom:"1rem"}} select defaultValue label="School" value={school} onChange={handleChange}>
              {schools.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
      <Grid container justifyContent="flex-end">
      <Button sx={{width:"10%"}} onClick={handleSubmit}>Submit</Button>
      </Grid>
      </Stack>
    );
}