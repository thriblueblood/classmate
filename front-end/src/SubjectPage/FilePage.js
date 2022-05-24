import { Box, Typography,Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { ChatState} from '../Context/ChatProvider'

export default function FilePage(){

    const { user, selectedChat, setSelectedChat} = ChatState();
    return(
        <Box sx={{padding:"2%"}}>
        <Box sx={{backgroundColor:"primary.dark", padding:"2%"}}>
            <Box sx={{ alignItems: "center", display: "flex", flexWrap: "wrap", cursor: 'pointer', marginBottom:"0.5%"}}>
            <Typography variant='h1' fontSize="2rem" color="secondary.main">Slide 1 : Variable</Typography>
            <div style={{marginLeft:"auto"}}>
            <Button style={{backgroundColor:"grey"}}variant="contained" startIcon={<EditIcon/>}>
                Edit
            </Button>
            <Button style={{backgroundColor:"red"}}variant="contained" startIcon={<DeleteForeverIcon/>}>
                Delete
            </Button>
            </div>
            </Box>
            <Typography variant='h2' fontSize="1rem" color="secondary.main">Description</Typography>
            <Box bgcolor="primary.light" height="150px" marginBottom="2%" padding="1%">
            <Typography variant='h2' fontSize="1rem" color="secondary.main">Variables are used to store information to be referenced and manipulated in a computer program. 
                They also provide a way of labeling data with a descriptive name</Typography>
            </Box>
            <Typography variant='h2' fontSize="1rem" color="secondary.main">Attached File</Typography>
            <Box bgcolor="primary.light" height="100px">

            </Box>
        </Box>
        </Box>

    )
}