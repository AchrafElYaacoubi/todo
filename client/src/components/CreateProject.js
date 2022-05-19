import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const WrapperCreate = styled(Box)`
    background-color: #e7ebef;
    border-radius: 20px;
    padding: 30px;
`
const CreateProject = ({ projectName, setProjectName, onCreate }) => {
    return (
        <WrapperCreate p={3}>
            <Box mb={2}>
                <Typography component="h1" variant="h5" align="center">
                    Create a new Project
                </Typography>
            </Box>
            <Box mb={2}>
                <TextField
                    value={projectName}
                    onChange={(e) => { setProjectName(e.target.value) }}
                    placeholder="Project name"
                    variant="outlined"
                    fullWidth
                />
            </Box>
            <Box mb={2}>
                <Button onClick={onCreate} fullWidth variant='outlined'> Create Project</Button>
            </Box>
        </WrapperCreate>
    )
}

export default CreateProject;