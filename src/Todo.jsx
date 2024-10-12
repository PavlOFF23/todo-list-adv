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

export default function Todo({ name, done, starred, toggleDone, toggleStar, deleteTask, editTask, categoryIcon }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        editTask(editedName); 
        setIsEditing(false);  
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <Box sx={{ width: '100%', height: '50px' }}>
            <Box sx={{
                display: 'flex',
                mb: '5px',
                borderRadius: '10px',
                alignItems: 'center',
                width: '100%',
                flexGrow: 1
            }}>
                <Paper elevation={5} sx={{ width: '100%' }}>
                    <Box component="section"
                        sx={{
                            height: '45px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between', // Убедитесь, что элементы располагаются по краям
                            paddingRight: '10px' // Добавьте немного отступа справа
                        }}
                    >
                        <Checkbox {...label} checked={done} onClick={toggleDone} />
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
                        {/* Здесь отображаем иконку категории */}
                        <Typography sx={{ ml: 2 }}> {/* Добавляем отступ слева для иконки */}
                            {categoryIcon}
                        </Typography>

                        <IconButton aria-label="edit task" onClick={handleEditClick}>
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
        </Box>
    );
}
