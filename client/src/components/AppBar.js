import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLogout } from '../store/user/actions';


export default function ButtonAppBar({username}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () => {
        dispatch(userLogout());
        localStorage.setItem('token', '');
        history.push('/login')
    };
  return (
    <Box sx={{ flexGrow: 1 }} mb={5}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
          <Typography variant="h11" component="div">
            {username}
          </Typography>
          <IconButton onClick={handleLogout} color="error" aria-label="logout" component="span">
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}