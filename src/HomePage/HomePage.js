import "../Components/RoomSelectionBar";
import Grid from "@mui/material/Grid";
import theme from "../ui/Theme";
import {ThemeProvider} from '@mui/material/styles';

import SideBar from "../Components/SideBar";

function HomePage() {
    return (
        <ThemeProvider theme={theme}>
        <Grid container direction="row" >
          <Grid item xs={0.6} sx={{bgcolor:'primary.dark', height:"100vh"}}>
          <SideBar/>
          </Grid>
          <Grid item xs={2.5} sx={{bgcolor:'primary.main', height:"100vh"}}>
          <div>
                Middle Section Content
            </div>
          </Grid>
          <Grid item xs={8.75} sx={{bgcolor:'secondary.main', height:"100vh"}}>
            <div>
                Right Section Content
            </div>
          </Grid>
        </Grid>
        </ThemeProvider>
    )
}

export default HomePage;