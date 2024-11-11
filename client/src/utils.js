import { v4 as uuid } from 'uuid';

export const callTasks = async () => {
    try {
        const response = await fetch('http://localhost:5000/tasks');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();
        return tasks.map(task => ({
            id: task.Id, 
            name: task.Name, 
            done: task.Done === 1, 
            starred: task.Starred === 1, 
            categoryId: task.fkCategoryId, 
            categoryIcons: task.CategoryIcons 
        }));
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const updateTaskName = async (id, newName) => {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}/name`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        });

        if (!response.ok) {
            throw new Error(`Error updating task name: ${response.status}`);
        }

        const updatedTask = await response.json();
        return updatedTask;
    } catch (error) {
        console.error('Error updating task name:', error);
    }
};

export const toggleTaskStarredOnServer = async (id, starred) => {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}/starred`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ starred }),
        });

        if (!response.ok) {
            throw new Error(`Error updating task star status: ${response.status}`);
        }

        const updatedTask = await response.json();
        return updatedTask;
    } catch (error) {
        console.error('Error updating task star status:', error);
    }
};

export const toggleTaskDoneOnServer = async (id, done) => {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}/done`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ done }),
        });

        if (!response.ok) {
            throw new Error(`Error updating task status: ${response.status}`);
        }

        const updatedTask = await response.json();
        return updatedTask;
    } catch (error) {
        console.error('Error updating task status:', error);
    }
};

export const postTask = async (name, categoryId) => {
    try {
        const response = await fetch(`http://localhost:5000/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, categoryId })
        });
        if (!response.ok){
            throw new Error(`Error creating task, status: ${response.status}`)
        }
        const createdTask = await response.json();
        return createdTask;
    } catch (error){
        console.error('Boss, we got problems:', error)
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting task: ${response.status}`);
        }

        console.log(`Deleted task with ID ${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

export const callCategories = async () => {
    try{
        const response = await fetch('http://localhost:5000/categories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();
        return categories.map(category => ({
            id: category.Id,
            name: category.Name,
            icon: category.Icon
        }))
    } catch (error){
        console.error('Brudda, categoriz not found :c', error);
        return [];
    }
}

export const getCategoryIcon = async (categoryId) => {
    const categories = await callCategories();
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : null; 
};

export const postCategory = async (name, icon) => {
    try {
        const response = await fetch('http://localhost:5000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, icon }), 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const createdCategory = await response.json();
        return createdCategory;
    } catch (error) {
        console.error('Boss, we got trouble:', error);
    }
}

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

export const addCategory = (name, icon) => {
    const newCategory = { id: uuid(), name, icon };
    // eslint-disable-next-line no-undef
    setCategories(oldCategories => {
        const updatedCategories = [...oldCategories, newCategory];
        updateLocalStorage("categories", updatedCategories); 
        return updatedCategories;
    });
};

export const deleteCategory = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/categories/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting category: ${response.status}`);
        }

        console.log(`Deleted category with ID ${id}`);
    } catch (error) {
        console.error('Error deleting category:', error);
    }
};

export const updateCategoryOnServer = async (id, name, icon) => {
    try {
        const response = await fetch(`http://localhost:5000/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, icon }),
        });

        if (!response.ok) {
            throw new Error(`Error updating category: ${response.status}`);
        }

        const updatedCategory = await response.json();
        return updatedCategory;
    } catch (error) {
        console.error('Error updating category:', error);
    }
};
