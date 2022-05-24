import Grid from "@mui/material/Grid";
import MiddleSectionPage from "./MiddleSectionPage";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ChatSectionPage from '../ChatPage/ChatSectionPage';
import SingleChat from "../ChatPage/SingleChat";
import { Box, Typography } from "@mui/material";
import { ChatState } from "../Context/ChatProvider";

import SubjectPage from "../SubjectPage/SubjectPage";
import MemberPage from "../RoomPage/MemberPage";
import SubjectDetailPage from "../SubjectPage/SubjectDetailPage";
import FilePage from "../SubjectPage/FilePage"

function RoomPage(){
  const { selectedChat} = ChatState();
  
    return (
        <Grid container direction="row">
        <Grid item xs={3} sx={{bgcolor:'primary.main', height:"100vh"}}>
              <MiddleSectionPage/>
          </Grid>
          <Grid items xs={9} sx={{bgcolor:'secondary.main', height:"100vh"}}>
            {/* <Box 
                  d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
                  alignItems="center"
                  flexDir="column"
                  p={3}
                  bg="white"
                  height="100%"
                  w={{ base: "100%", md: "68%" }}
                  borderRadius="lg"
                  borderWidth="1px">  
            </Box> */}
          <Routes>
              <Route path="chat" element={<SingleChat/>}></Route>
              <Route path="subject" element={<SubjectPage/>}></Route>
              <Route path="member" element={<MemberPage/>}></Route>
              <Route path="subject/:id" element={<SubjectDetailPage />} />
              <Route path="subject/:id/file" element={<FilePage/>} />
            </Routes>
          </Grid>
        </Grid>
    )
}

export default RoomPage;