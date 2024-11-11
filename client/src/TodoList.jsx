/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Todo from "./Todo";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TodoForm from "./TodoForm";
import {
  callTasks,
  updateTaskName,
  toggleTaskDoneOnServer,
  toggleTaskStarredOnServer,
  deleteTask,
  postTask,
  removeTaskById,
  callCategories,
  postCategory,
  deleteCategory,
  updateCategoryOnServer,
} from "./utils";
import Categories from "./Categories";
import Grid from "@mui/material/Grid2";
import CategoryForm from "./CategoryForm";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Tabs, Tab } from "@mui/material"; // Import Tabs and Tab components
import StarIcon from "@mui/icons-material/Star"; // Import StarIcon
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';


export default function TodoList() {
  const [tasks, setTasks] = useState([]); // Initial state is empty
  const [categories, setCategories] = useState([]); // Initial state is empty
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [filterType, setFilterType] = useState("active"); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesFromServer = await callCategories(); // Fetch categories
        setCategories(categoriesFromServer); // Set categories from server response

        const tasksFromServer = await callTasks(); // Fetch tasks
        const tasksWithIcons = tasksFromServer.map((task) => ({
          ...task,
          categoryIcon: getCategoryIconById(task.categoryId), // Get icon based on categoryId
        }));
        setTasks(tasksWithIcons); // Set tasks from server response
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []); // Empty dependency array to run only on mount

  const getCategoryIconById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.icon : null; // Return icon or null if not found
  };

  const handleToggleDone = async (id, currentStatus) => {
    try {
      const newDoneStatus = !currentStatus;
      await toggleTaskDoneOnServer(id, newDoneStatus);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, done: newDoneStatus } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task done status:", error);
    }
  };

  const handleToggleStar = async (id, currentStatus) => {
    try {
      const newStarStatus = !currentStatus;
      await toggleTaskStarredOnServer(id, newStarStatus);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, starred: newStarStatus } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task star status:", error);
    }
  };

  const editTask = async (id, newName) => {
    try {
      await updateTaskName(id, newName);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, name: newName } : task
        )
      );
    } catch (error) {
      console.error("Error updating task name:", error);
    }
  };

  const createTask = async (taskName, categoryId) => {
    try {
      await postTask(taskName, categoryId);
      const tasksFromServer = await callTasks();
      const tasksWithIcons = tasksFromServer.map((task) => ({
        ...task,
        categoryIcon: getCategoryIconById(task.categoryId),
      }));
      setTasks(tasksWithIcons);
    } catch (error) {
      console.error("Error creating the task", error);
    }
  };

  const removeTask = (id) => {
    try {
      deleteTask(id);
      setTasks((oldTasks) => removeTaskById(oldTasks, id));
      console.log(`Big boss, task ID ${id} was removed 🏄‍♂️`);
    } catch (error) {
      console.error("Error doing that, big boss:", error);
    }
  };

  const handleToggleCategory = (categoryId) => {
    setCheckedCategory((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const toggleAllCategories = () => {
    setCheckedCategory([]);
  };

  const filteredTasks = tasks.filter((task) => {
    const isInCheckedCategory =
      checkedCategory.length === 0 || checkedCategory.includes(task.categoryId);

    if (filterType === "active") {
      return task.done === false && isInCheckedCategory;
    } else if (filterType === "starred") {
      return (
        task.starred === true && task.done === false && isInCheckedCategory
      );
    } else if (filterType === "done") {
      return task.done === true && isInCheckedCategory;
    } else {
      return isInCheckedCategory;
    }
  });

  const addCategory = async (name, icon) => {
    try {
      const newCategory = await postCategory(name, icon);
      if (newCategory) {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        console.log("Added category like a champ", newCategory);
      }
    } catch (error) {
      console.error("We got problems:", error);
    }
  };

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      console.log(`Category ID ${id} was removed`);
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  const updateCategory = async (id, newName, newIcon) => {
    try {
      await updateCategoryOnServer(id, newName, newIcon);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id
            ? { ...category, name: newName, icon: newIcon }
            : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setFilterType(newValue); // Update the filter type based on the selected tab
  };

  return (
    <Box
      component="section"
      sx={{
        border: "1px solid grey",
        borderRadius: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "750px",
      }}
    >
      <Box>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            display: "inline-block",
            py: 6,
            textShadow: "10px 10px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          ✅Tasks:
        </Typography>
      </Box>
      <Grid container spacing={3} 
      sx={{ width: "95%", 
      minHeight: "450px" }}>
        <Grid
          size="auto"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={toggleAllCategories}>
            <CloseIcon></CloseIcon>
          </IconButton>
          {categories.map((category) => (
            <Categories
              name={category.name}
              key={category.id}
              icon={category.icon}
              isChecked={checkedCategory.includes(category.id)}
              onToggle={() => handleToggleCategory(category.id)}
              onRemove={() => removeCategory(category.id)}
              onEdit={updateCategory}
            />
          ))}
          <CategoryForm addCategory={addCategory} />
        </Grid>
        <Grid size="grow">
          <Box
            sx={{
              maxWidth: "1000px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "350px",
              maxHeight: "500px",
              top: 0,
              overflow: "auto",
            }}
          >
            <Box sx={{ width: "100%", mb: 2 }}>
              <Tabs
                value={filterType}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="secondary"
                centered
                sx={{
                  width: "90%",
                  pl: '2%'
                }}
              >
                <Tab value="active" label="All Active" icon={<DoneOutlineRoundedIcon />} />
                <Tab value="starred" label="Starred" icon={<StarIcon />} />
                <Tab value="all" label="All" icon={<DoneAllRoundedIcon />} />
                <Tab value="done" label="Done" icon={<DoneRoundedIcon />} />
              </Tabs>
            </Box>
            {filteredTasks.map((task) => (
              <Todo
                key={task.id}
                name={task.name}
                done={task.done}
                starred={task.starred}
                toggleDone={() => handleToggleDone(task.id, task.done)}
                toggleStar={() => handleToggleStar(task.id, task.starred)}
                deleteTask={() => removeTask(task.id)}
                editTask={(newName) => editTask(task.id, newName)}
                categoryIcon={getCategoryIconById(task.categoryId)}
              />
            ))}
            {filteredTasks.length === 0 && (
              <Typography variant="h5" align="center">
                🕺Woah, you done for real? (I hate CSS)🪩
              </Typography>
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
