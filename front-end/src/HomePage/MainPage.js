import "../Components/RoomSelectionBar";
import Grid from "@mui/material/Grid";
import theme from "../ui/Theme";
import {ThemeProvider} from '@mui/material/styles';
import { BrowserRouter as Router,Routes, Route, useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";
import RoomPage from "../RoomPage/RoomPage";
import HomePage from "../HomePage/HomePage"
import ProfilePage from "../ProfilePage/ProfilePage";

function MainPage() {

  const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
        <Grid container direction="row">
          <Grid item xs={0.6} sx={{bgcolor:'primary.dark', height:"100vh"}}>
          <SideBar/>
          </Grid>
          <Grid item xs={11.4}>
          <Routes>
              <Route path="room/*" element={<RoomPage/>}></Route>
              <Route path="home" element={<HomePage/>}></Route>
              <Route path="profile" element={<ProfilePage/>}></Route>
            </Routes>
          </Grid>
        </Grid>
        </ThemeProvider>
    )
}

export default MainPage;