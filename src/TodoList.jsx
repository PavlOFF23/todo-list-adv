import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import Todo from "./Todo";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TodoForm from "./TodoForm";

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (!data) return [];
    return data;
}

export default function TodoList() {
    const [tasks, setTasks] = useState(getInitialData); // Исправлено: вызов getInitialData

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleToggleDone = (id) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === id ? { ...task, done: !task.done } : task
        ));
    }

    const editTask = (id, newName) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === id ? { ...task, name: newName } : task
        ));
    };
    

    const handleToggleStar = (id) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === id ? { ...task, starred: !task.starred } : task
        ));
    }

    const createTask = (taskName) => {
        setTasks(oldTasks => [
            ...oldTasks, 
            { id: uuid(), name: taskName, done: false, starred: false }
        ]);
    }

    const removeTask = (id) => {
        setTasks(oldTasks => oldTasks.filter(t => t.id !== id));
    }

    return (
        <Box component="section" sx={{ 
            border: '1px solid grey',
            borderRadius: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '750px'
        }}>
            <Box>
                <Typography  
                    variant="h2" 
                    component="h2"
                    sx={{ display: 'inline-block', py: 6, textShadow: '10px 10px 15px rgba(0, 0, 0, 0.2)' }}
                >
                    ✅Tasks:
                </Typography>
            </Box>
            <Box
                sx={{
                    width: '70%',
                    maxWidth: '1000px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '169px',
                    overflowY: 'auto',
                    minHeight: '350px',
                    maxHeight: '500px'
                }}> 
                {
                    tasks.map(task => (
                        <Todo
                            name={task.name}
                            done={task.done}
                            starred={task.starred}
                            key={task.id}
                            toggleDone={() => handleToggleDone(task.id)}
                            toggleStar={() => handleToggleStar(task.id)}
                            deleteTask={() => removeTask(task.id)}
                            editTask={(newName) => editTask(task.id, newName)}
                        />
                    ))
                }
                {
                    tasks.length === 0 && (
                        <Typography variant='h4'>🕺Woah, you done for real?🪩</Typography>
                    )
                }
            </Box>
            <Box sx={{ my: "50px" }}>
                <TodoForm addTask={createTask} />
            </Box>
        </Box>
    );
}
