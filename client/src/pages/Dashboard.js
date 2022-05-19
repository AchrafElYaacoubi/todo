import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CreateProject from '../components/CreateProject';
import Project from '../components/Project';
import AppBar from '../components/AppBar';

export default function Dashboard() {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    return (
        <>
        <AppBar username={"Achraf"}/>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <CreateProject 
                        projectName={projectName}
                        setProjectName={setProjectName}
                        onCreate={(e) => {
                            setProjects([...projects, projectName]);
                            setProjectName('');
                        }}
                    />
                </Grid>
                {projects && projects.map(project => (
                    <Grid item xs={4} >
                    <Project name={project}/>
                </Grid>
                ))}
            </Grid>
        </Container>
        </>
    )
}