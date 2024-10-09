import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CreateIcon from '@mui/icons-material/Create';
import Divider from '@mui/material/Divider';


export default function TodoForm({addTask}){

    const [text, setText] = useState('');

    const handleChange = e => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            alert("Are you so sure that you wanna do nothing or you got nothing to do?🌚");
            return;
        }
        addTask(text);
        setText('');
    }

    return(
        <>
        <form action=""
        onSubmit={handleSubmit}>
            <Typography
            variant="body1"
            cx={{color: 'grey'}}>
            What you do, big boss? 
            </Typography>
            <Divider />
            <br />
            <Stack direction="row">
                <TextField 
                id="filled-basic" 
                label="Filled" 
                variant="filled"
                value={text} 
                onChange={handleChange}
                />
                <Button 
                variant="text" 
                endIcon={<CreateIcon/>}
                type="submit">Add Task</Button>
            </Stack>
        </form>
        </>
    )
}