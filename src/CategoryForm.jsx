import { useState } from "react";
import * as React from 'react';
import IconButton from '@mui/material/IconButton'; // Исправлено импорт IconButton
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button'; // Убедитесь, что Button импортирован

export default function CategoryForm({ addCategory }) {
    const [open, setOpen] = useState(false);
    const [categoryNameText, setCategoryNameText] = useState('');
    const [categoryIconText, setCategoryIconText] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCategoryNameText('');
        setCategoryIconText('');
    };

    const handleChangeName = (e) => {
        setCategoryNameText(e.target.value);
    };

    const handleChangeIcon = (e) => {
        setCategoryIconText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!categoryNameText || !categoryIconText) {
            alert("Please provide both category name and icon!");
            return;
        }
        addCategory(categoryNameText, categoryIconText);
        handleClose();
    };

    return (
        <>
            <IconButton
                onClick={handleClickOpen}
                sx={{ margin: 1 }} // Добавлено немного отступа
            >
                <AddCircleOutlineIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What category?
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="categoryName"
                        name="categoryName"
                        label="Category Name"
                        fullWidth
                        variant="standard"
                        value={categoryNameText}
                        onChange={handleChangeName}
                    />
                    <TextField
                        margin="dense"
                        id="categoryIcon"
                        name="categoryIcon"
                        label="Icon"
                        fullWidth
                        variant="standard"
                        value={categoryIconText}
                        onChange={handleChangeIcon}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} type="submit">
                        Add Category
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
