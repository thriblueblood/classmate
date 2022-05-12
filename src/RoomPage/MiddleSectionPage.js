import { Stack, Box, Typography, Divider} from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";

import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';

function MiddleSectionPage(){
    return(
        <ThemeProvider theme={theme}>
            <Stack sx={{bgcolor:"primary.main", width:"100%", height:"100%", overflow:"auto"}}>

            <Box textAlign="center" margin="2% 0%">
            <Typography variant="h1" fontSize="1.5rem" color="secondary.main" margin="5% 0%">Software Engineering 10</Typography>
            <Divider sx={{color:'primary.dark'}}/>
            </Box>

            <Stack alignItems="center">
            <Box sx={{alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%"}}>
              <LocationCityIcon sx={{color:"primary.dark"}}/>
              <Typography color="primary.dark" variant='h2' fontSize="1rem">King Mongkut of Ladgrbang</Typography>
            </Box>

            <Box sx={{alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%"}}>
              <PeopleIcon sx={{color:"primary.dark"}}/>
              <Typography color="primary.dark" variant='h2' fontSize="1rem">2</Typography>
            </Box>
            </Stack>

            <Typography variant='h2' color="secondary.main" fontSize="1rem">Chats</Typography>
            <Typography variant='h2' color ="secondary.main" fontSize="1rem" >#General</Typography>
            <Typography variant='h2' color ="secondary.main" fontSize="1rem" > Subject</Typography>
            <Typography variant='h2' color ="secondary.main" fontSize="1rem" > Other Files</Typography>
            <Typography variant='h2' color ="secondary.main" fontSize="1rem" > Members</Typography>
            

            </Stack>
        </ThemeProvider>
    );
}

export default MiddleSectionPage;