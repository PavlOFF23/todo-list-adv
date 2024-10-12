import { useState, useEffect } from "react";
import Todo from "./Todo";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TodoForm from "./TodoForm";
import { getTasks, 
    filterTasksByCategory, 
    createNewTask, 
    toggleTaskDone, 
    toggleTaskStar, 
    removeTaskById, 
    updateLocalStorage,
    getCategories } from "./utils";
import Categories from "./Categories";
import Grid from '@mui/material/Grid2';
import {v4 as uuid} from 'uuid'
import CategoryForm from "./CategoryForm";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function TodoList() {
    const [tasks, setTasks] = useState(getTasks);
    const [categories, setCategories] = useState(getCategories);
    const [checkedCategory, setCheckedCategory] = useState([]);

    useEffect(() => {
        updateLocalStorage("tasks", tasks);
    }, [tasks]);

    const handleToggleDone = (id) => {
        setTasks(prevTasks => toggleTaskDone(prevTasks, id));
    };

    const editTask = (id, newName) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === id ? { ...task, name: newName } : task
        ));
    };

    const handleToggleStar = (id) => {
        setTasks(prevTasks => toggleTaskStar(prevTasks, id));
    };

    const createTask = (taskName, categoryId, categoryIcons) => {
        const newTask = createNewTask(taskName, categoryId, categoryIcons);
        setTasks(oldTasks => [...oldTasks, newTask]);
    };

    const removeTask = (id) => {
        setTasks(oldTasks => removeTaskById(oldTasks, id));
    };

    const handleToggleCategory = (categoryId) => {
        setCheckedCategory((prev) => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId); 
            } else {
                return [...prev, categoryId]; 
            }
        });
    };

    const toggleAllCategories = () => {
        setCheckedCategory([]);
    }

    const filteredTasks = filterTasksByCategory(tasks, checkedCategory);

    const addCategory = (name, icon) => {
        const newCategory = { id: uuid(), name, icon };
        setCategories(oldCategories => {
            const updatedCategories = [...oldCategories, newCategory];
            updateLocalStorage("categories", updatedCategories); // Сохраняем категории в локальное хранилище
            return updatedCategories;
        });
    };

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
            <Grid container spacing={3} sx={{ width: '80%', minHeight: '450px' }}>
                <Grid 
                size='auto'
                sx={{display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center'}}>
                    <IconButton onClick={toggleAllCategories}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                    {categories.map(category => (
                        <Categories
                            name={category.name}
                            key={category.id}
                            icon={category.icon}
                            isChecked={checkedCategory.includes(category.id)}
                            onToggle={() => handleToggleCategory(category.id)}
                            id={category.id}
                        />
                    ))}
                    <CategoryForm addCategory={addCategory}/>
                </Grid>
                <Grid size='grow'>
                    <Box sx={{
                        maxWidth: '1000px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '350px',
                        maxHeight: '500px',
                        top: 0,
                        overflow: 'auto'
                    }}>
                        {filteredTasks.map(task => (
                        <Todo
                            name={task.name}
                            done={task.done}
                            starred={task.starred}
                            key={task.id}
                            toggleDone={() => handleToggleDone(task.id)}
                            toggleStar={() => handleToggleStar(task.id)}
                            deleteTask={() => removeTask(task.id)}
                            editTask={(newName) => editTask(task.id, newName)}
                            categoryIcon={task.categoryIcons} // Предполагается, что у вас есть это свойство в задаче
                        />
                        ))}
                        {filteredTasks.length === 0 && (
                            <Typography variant='h5' align="center">🕺Woah, you done for real? (I hate CSS)🪩</Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ my: "50px" }}>
                <TodoForm addTask={createTask} categories={categories} />
            </Box>
        </Box>
    );
}
