import { Typography, Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function SuccessCreateRoom (){

    const handleCopy = () => {
        navigator.clipboard.writeText("Address")
        console.log("copied")
      }; 

    return (
        <Stack alignItems="center">
            <TextField value="dsdsd./sdsds" disabled fullWidth 
            InputProps={{ endAdornment:(<InputAdornment position="end">
                <IconButton 
                  onClick={handleCopy}
                >
                </IconButton>
                <ContentCopyIcon onClick={handleCopy} sx={{cursor:'pointer'}}/>
              </InputAdornment>)}}></TextField>
            <Typography variant="subtitles">Copy this invitation code and send it to your friend to join the room!</Typography>
        </Stack>
    )
}