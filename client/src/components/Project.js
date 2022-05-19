import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const Project = ({name}) => {
    const [todoText, setTodoText] = useState();
    const [todos, setTodos] = useState([]);
    return (
        <Wrapper p={3}>
        <Box mb={2}>
            <Typography component="h1" variant="h5">
                {name}
            </Typography>
        </Box>
        <Box mb={2}>
            <TextField
                fullWidth
                variant="outlined"
                value={todoText}
                placeholder="Add a Todo"
                onChange={(e) => { setTodoText(e.target.value) }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Button
                                onClick={() => {
                                    if (todoText)
                                        setTodos([...todos, { text: todoText, complete: false }]);
                                    setTodoText('');
                                }}
                                variant="outlined"
                            > + </Button>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
        <Box mb={2}>
            <Typography component="p"> Todo </Typography>
            {todos && todos.filter(t => !t.complete).map(todo => (
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={(e) => {
                                    setTodos(todos.map(j => j.text == todo.text ? { ...todo, complete: true } : j))
                                }}
                                checked={todo.complete}
                            />
                        }
                        label={
                            <StyledTodo done={todo.complete} component="p">
                                {todo.text}
                            </StyledTodo>
                        }
                    />
                </div>
            ))}
        </Box>
        <Box mb={2}>
            <Typography component="p"> Completed </Typography>
            {todos && todos.filter(t => t.complete).map(todo => (
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={(e) => {
                                    setTodos(todos.map(j => j.text == todo.text ? { ...todo, complete: true } : j))
                                }}
                                checked={todo.complete}
                            />
                        }
                        label={
                            <StyledTodo done={todo.complete} component="p">
                                {todo.text}
                            </StyledTodo>
                        }
                    />
                </div>
            ))}
        </Box>
    </Wrapper>
    )
}

const StyledTodo = styled(Typography)`
    ${props => props.done && `
    text-decoration: line-through;
  `}
`

const Wrapper = styled(Box)`
    background-color: #fafbfc;
    border: 1px solid #e0e3e7;
    border-radius: 20px;
`


export default Project;