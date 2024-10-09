import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateIcon from '@mui/icons-material/Create';

export default function TodoForm({ addTask }) {

    const [taskNameText, setText] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setText('');
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskNameText === '') {
            alert("Are you sure that you want to do nothing or have nothing to do?🌚");
            return;
        }

        addTask(taskNameText);
        setText('');
        handleClose();
    };

    // Новый обработчик для нажатия клавиш
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e); // Вызываем отправку формы
        }
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                endIcon={<CreateIcon />}
            >
                Add Task
            </Button>

            <Dialog 
            open={open} 
            onClose={handleClose}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What you do, big boss?
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="taskName"
                        name="taskName"
                        label="Task Name"
                        fullWidth
                        variant="standard"
                        value={taskNameText}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} // Добавлено
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                    onClick={handleSubmit} 
                    type="submit">
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
