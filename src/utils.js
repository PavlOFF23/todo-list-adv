import { v4 as uuid } from 'uuid';

export const getTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const getCategories = () => {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
};

export const filterTasksByCategory = (tasks, checkedCategory) => {
    if (checkedCategory.length === 0) return tasks; 
    return tasks.filter(task => checkedCategory.includes(task.categoryId));
};

export const createNewTask = (taskName, categoryId, categoryIcons) => {
    return { id: uuid(), name: taskName, done: false, starred: false, categoryId, categoryIcons };
};

export const toggleTaskDone = (tasks, id) => {
    return tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
};

export const toggleTaskStar = (tasks, id) => {
    return tasks.map(task => task.id === id ? { ...task, starred: !task.starred } : task);
};

export const removeTaskById = (tasks, id) => {
    return tasks.filter(task => task.id !== id);
};

export const updateLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
