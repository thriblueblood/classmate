import { Avatar,Typography,Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ReactScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/ChatLogics"
import { ChatState } from "../Context/ChatProvider";

import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ThemeProvider theme={theme}>
<ReactScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{display:"flex"}} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <div style={{marginTop:"2.5%"}}> 
            <Tooltip title={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
                </div>
                
            )}
            <div style={{marginLeft: isSameSenderMargin(messages, m, i, user._id),
            marginTop: isSameUser(messages, m, i, user._id) ? 20 : 20}}>
            {isSameSender(messages,m,i,user._id)?
              <Typography variant="h2" color="primary.dark" sx={{
            display: `${
                  m.sender._id === user._id ? "none" : ""
                }`,marginLeft:"7%",
                fontSize:"12px",
                marginBottom:"5%"
            }}>
              {m.sender.name}
            </Typography>  : <div></div>
            }
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#3f72af" : "#DBE2EF"
                }`,
                color: `${
                  m.sender._id === user._id ? "#f9f7f7" : "black"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",                
              }}
            >
            {m.content}
            </span>
            </div>
          
          </div>
        ))}
    </ReactScrollableFeed>
    </ThemeProvider>
      
    
  );
};

export default ScrollableChat;