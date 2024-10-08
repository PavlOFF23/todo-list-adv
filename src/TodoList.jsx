import { useState } from "react";
import {v4 as uuid} from 'uuid';
import Todo from "./Todo";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Typography } from "@mui/material";
import TodoForm from "./TodoForm";


const fakeTasks = [
    {id: uuid(), name: "overthrow Riigikogu", done: false, starred: true},
    {id: uuid(), name: "pokakat", done: false, starred: false},
    {id: uuid(), name: "popit kofe", done: true, starred: true},
]

export default function TodoList(todos){
    
    const [tasks, setTasks] = useState(fakeTasks)

    const handleToggleDone = (id) => {
        setTasks(prevTasks => prevTasks.map((task) => 
        task.id === id ? {...task, done: !task.done} : task
        ))
    }

    const handleToggleStar = (id) => {
        setTasks(prevTasks => prevTasks.map((task) => 
        task.id === id ? {...task, starred: !task.starred} : task
        ))
    }

    const createTask = (taskName) => {
        setTasks(oldTasks => [...oldTasks, {id: uuid(), name:taskName, done: false, starred: false}])
    }



    return (
        <Box component="section" sx={{ 
            paddingTop: 10, 
            border: '1px solid grey',
            borderRadius: '10px',
            width: '75%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '500px',
            minHeight: '500px'
        }}>
            <Box>
            <Typography  
                variant="h2" 
                component="h2"
                sx={{display: 'inline-block', pb: '25px'}}
            >
            ✅Todos:
            </Typography>
            </Box>
            <Box
            sx={{
            width: '70%',
            maxWidth: '3000px'}}> 
                {
                    tasks.map((task) => <Todo
                        name={task.name}
                        done={task.done}
                        starred={task.starred}
                        key={task.id}
                        toggleDone={() => handleToggleDone(task.id)}
                        toggleStar={() => handleToggleStar(task.id)}
                    />)
                }
            </Box>
            <Box sx={{my:"50px"}}>
            <TodoForm addTask={createTask}/>
            </Box>
        </Box>
    );
}