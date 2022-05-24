import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Typography, Avatar} from "@mui/material";
import { Box } from "@mui/material";


const UserListItem = ({user, handleFunction}) => {

    return (
        <Box onClick={handleFunction}
        cursor="pointer"
        backgroundColor="#E8E8E8"
        sx={{
            background: "#E8E8E8",
            '&:hover':{
                backgroundColor: "#38B2AC"
            }
        }}
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="20px"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
            <Typography>{user.name}</Typography>
            <Typography fontSize="xs">
                <b>Email : </b>
                {user.email}
            </Typography>
            </Box>
        </Box>
    )
}

export default UserListItem;