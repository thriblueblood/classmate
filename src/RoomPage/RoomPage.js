import Grid from "@mui/material/Grid";
import MiddleSectionPage from "./MiddleSectionPage";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ChatSectionPage from '../ChatPage/ChatSectionPage';

function RoomPage(){
    return (
        <Grid container direction="row">
        <Grid item xs={3} sx={{bgcolor:'primary.main', height:"100vh"}}>
              <MiddleSectionPage/>
          </Grid>
          <Grid items xs={9} sx={{bgcolor:'secondary.main', height:"100vh"}}>
          <Routes>
              <Route path="chat" element={<ChatSectionPage/>}></Route>
              {/* <Route path="subject" element={<HomePage/>}></Route>
              <Route path="files" element={<ProfilePage/>}></Route>
              <Route path="members" element={<ProfilePage/>}></Route> */}
            </Routes>
          </Grid>
        </Grid>
    )
}

export default RoomPage;