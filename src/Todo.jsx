import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TextField from '@mui/material/TextField';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Todo({ name, done, starred, toggleDone, toggleStar, deleteTask, editTask }) {
    // Стейт для управления режимом редактирования
    const [isEditing, setIsEditing] = useState(false);
    // Стейт для временного хранения отредактированного текста
    const [editedName, setEditedName] = useState(name);

    // Функция для включения/выключения режима редактирования
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    // Функция для сохранения изменений
    const handleSave = () => {
        editTask(editedName);  // Передаем новое имя задачи
        setIsEditing(false);   // Выключаем режим редактирования
    };

    // Функция для обработки нажатия Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <Box sx={{ display: 'flex', 
        my: '3px', 
        borderRadius: '10px', 
        alignItems: 'center', 
        width: '100%' }}>
            <Paper elevation={2} sx={{ width: '100%' }}>
                <Box component="section"
                    sx={{
                        my: '2.5px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Checkbox {...label}
                        checked={done}
                        onClick={toggleDone}
                    />
                    {isEditing ? (
                        <TextField
                            variant="standard"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onKeyDown={handleKeyDown} // Обрабатываем Enter
                            onBlur={handleSave} // Сохраняем изменения при уходе фокуса
                            fullWidth
                        />
                    ) : (
                        <Typography variant="body1"
                            sx={{
                                flexGrow: 1,
                                wordBreak: 'break-all',
                                textDecoration: done && 'line-through',
                                textOverflow: 'ellipsis',
                                maxHeight: '150px',
                                overflow: 'auto'
                            }}>
                            {name}
                        </Typography>
                    )}

                    <IconButton color="yellow" aria-label="edit task" onClick={handleEditClick}>
                        <EditNoteIcon />
                    </IconButton>

                    <Checkbox {...label}
                        checked={starred}
                        onClick={toggleStar}
                        checkedIcon={<StarIcon sx={{ color: 'gold' }} />}
                        icon={<StarBorderIcon />}
                    />
                </Box>
            </Paper>
            <IconButton aria-label="delete" size="small" onClick={deleteTask}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </Box>
    );
}
