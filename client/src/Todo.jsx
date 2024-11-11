/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SortableTodo({
    id,
    name,
    done,
    starred,
    toggleDone,
    toggleStar,
    deleteTask,
    editTask,
    categoryIcon
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleEditClick = () => setIsEditing((prev) => !prev);
    const handleSave = () => {
        editTask(editedName);
        setIsEditing(false);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Box ref={setNodeRef} style={style} {...attributes} {...listeners} sx={{ width: '100%', height: '50px' }}>
            <Box sx={{ display: 'flex', mb: '5px', alignItems: 'center', pl: '1%' }}>
                <Paper elevation={5} sx={{ width: '100%', borderRadius: '10px' }}>
                    <Box
                        component="section"
                        sx={{
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: '10px',
                        }}
                    >
                        <Checkbox {...label} checked={done} onClick={toggleDone} />
                        {isEditing ? (
                            <TextField
                                variant="standard"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onBlur={handleSave}
                                fullWidth
                            />
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{
                                    flexGrow: 1,
                                    wordBreak: 'break-all',
                                    textDecoration: done ? 'line-through' : 'none',
                                    textOverflow: 'ellipsis',
                                    maxHeight: '150px',
                                    overflow: 'auto',
                                }}
                            >
                                {name}
                            </Typography>
                        )}
                        <Typography sx={{ ml: 2 }}>{categoryIcon}</Typography>
                        <Checkbox
                            {...label}
                            checked={starred}
                            onClick={toggleStar}
                            checkedIcon={<StarIcon sx={{ color: 'gold' }} />}
                            icon={<StarBorderIcon />}
                        />
                    </Box>
                </Paper>
                <IconButton aria-label="edit task" onClick={handleEditClick}>
                    <EditNoteIcon />
                </IconButton>
                {confirmDelete ? (
                    <>
                        <IconButton aria-label="confirm delete" size="small" onClick={deleteTask}>
                            <CheckIcon color="success" />
                        </IconButton>
                        <IconButton aria-label="cancel delete" size="small" onClick={() => setConfirmDelete(false)}>
                            <CloseIcon color="error" />
                        </IconButton>
                    </>
                ) : (
                    <IconButton aria-label="delete" size="small" onClick={() => setConfirmDelete(true)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}
