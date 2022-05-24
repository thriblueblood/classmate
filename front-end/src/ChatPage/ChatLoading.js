import React from 'react'
import { Skeleton } from '@mui/material'
import { Stack } from '@mui/material'

export const ChatLoading = () => {
    return (
        <Stack>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
        </Stack>
    )
}

export default ChatLoading