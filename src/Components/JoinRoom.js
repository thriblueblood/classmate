import { Stack, Typography, TextField, Grid, Button } from '@mui/material';

export default function JoinRoom(props){

    const {onClose} = props;

    const handleSubmit = () =>{
        onClose(true)
    }

    return(
        <Stack alignItems="center">
        <TextField placeholder="Type the invitation link such as dfdfdfd.co/dfd"  fullWidth ></TextField>
        {/* <Typography variant="subtitles">Copy this invitation code and send it to your friend to join the room!</Typography> */}
        <Grid container justifyContent="flex-end">
      <Button sx={{width:"10%"}} onClick={handleSubmit}>Join</Button>
      </Grid>
    </Stack>
    )
}