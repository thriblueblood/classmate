import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
        <Badge
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={50}
        color="secondary"
        cursor="pointer"
        onClick={handleFunction}
      >
        {user.name}
        {admin === user._id && <span> (Admin)</span>}
        <CloseIcon />
      </Badge>
    )
}

export default UserBadgeItem