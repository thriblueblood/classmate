import React from 'react'
import {FormControl, Input } from '@mui/material'

const AssignmentPage = () => {

    const submit_file = () => {

    }
    return (
        <form onSubmit={submit_file}>
        <input type="text" name="text" />
        <input type="file" name="file" />
        <input type="submit" value="Submit" />
    </form>
    )
}

export default AssignmentPage
