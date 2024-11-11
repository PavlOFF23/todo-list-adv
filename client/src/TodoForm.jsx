/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateIcon from "@mui/icons-material/Create";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function TodoForm({ addTask, categories }) {
  const [taskNameText, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setText("");
    setSelectedCategory(""); // Сбрасываем выбранную категорию при закрытии
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Обновляем выбранную категорию
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskNameText === "") {
      // Проверяем заполненность полей
      alert("Please fill in the task name.");
      return;
    }

    // Находим выбранную категорию
    const selectedCategoryData = categories.find(
      (category) => category.id === selectedCategory
    );
    const categoryIcon = selectedCategoryData ? selectedCategoryData.icon : ""; // Получаем иконку выбранной категории

    addTask(taskNameText, selectedCategory, categoryIcon); // Передаем иконку в addTask
    setText("");
    setSelectedCategory("");
    handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<CreateIcon sx={{ color: "white" }} />} // Белая иконка
        sx={{
          color: "white", // Белый текст
        }}
      >
        Add Task
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>What you do, big boss?</DialogContentText>
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
            onKeyDown={handleKeyDown}
          />
          {/* Добавляем выпадающий список для выбора категории */}
          <InputLabel id="category-label" sx={{ mt: 2 }}>
            Category
          </InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
            fullWidth
            variant="standard"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.icon} {category.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
