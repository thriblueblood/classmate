import {Box, TextField, Button, InputAdornment, IconButton} from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";
import SendIcon from '@mui/icons-material/Send';

export default function ChatSectionPage(){
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{backgroundColor:"secondary.main", position:'relative', height:'100vh', overflow:"auto"}}>
      <Box sx={{width:"100%",position: "absolute", bottom: "0.1rem",justifyContent:"center"}}>
      <form noValidate autoComplete="off">
         <TextField label="Say something" fullWidth 
            InputProps={{ endAdornment:(<InputAdornment position="end">
                <IconButton>
                </IconButton>
                <SendIcon sx={{cursor:'pointer', color:"primary.main"}}/>
              </InputAdornment>)}}></TextField>
      </form>
      </Box>
      </Box>
    </ThemeProvider>
  );
}
