const { v4: uuid } = require('uuid');
const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'database.sqlite');
const cors = require('cors');


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

///GET PART

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM Tasks', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

app.get('/categories', (req, res) => {
    db.all('SELECT * FROM Categories', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

///PUT PART

app.put('/tasks/:id/name', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        res.status(400).send('Name is required');
        return;
    }

    const query = `UPDATE Tasks SET name = ? WHERE id = ?`;
    db.run(query, [name, id], function(err) {
        if (err) {
            console.error('Error updating task name:', err);
            res.status(500).send('Error updating task name');
            return;
        }
        res.json({ message: 'Task name updated successfully', taskId: id });
    });
});

app.put('/tasks/:id/starred', (req, res) => {
    const { id } = req.params;
    const { starred } = req.body;

    if (typeof starred !== 'boolean') {
        res.status(400).send('Starred must be a boolean value');
        return;
    }

    const query = `UPDATE Tasks SET starred = ? WHERE id = ?`;
    db.run(query, [starred ? 1 : 0, id], function(err) {
        if (err) {
            console.error('Error updating task star status:', err);
            res.status(500).send('Error updating task star status');
            return;
        }
        res.json({ message: 'Task star status updated successfully', taskId: id });
    });
});

app.put('/tasks/:id/done', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;

    if (typeof done !== 'boolean') {
        res.status(400).send('Done must be a boolean value');
        return;
    }

    const query = `UPDATE Tasks SET done = ? WHERE id = ?`;
    db.run(query, [done ? 1 : 0, id], function(err) {
        if (err) {
            console.error('Error updating task status:', err);
            res.status(500).send('Error updating task status');
            return;
        }
        res.json({ message: 'Task status updated successfully', taskId: id });
    });
});

app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name, icon } = req.body;

    if (!name || !icon) {
        res.status(400).send('Name and icon are required');
        return;
    }

    const query = `UPDATE Categories SET Name = ?, Icon = ? WHERE Id = ?`;
    db.run(query, [name, icon, id], function(err) {
        if (err) {
            console.error('Error updating category:', err);
            res.status(500).send('Error updating category');
            return;
        }
        res.json({ message: 'Category updated successfully', categoryId: id });
    });
});

///DELETE Part

app.delete('/tasks/:id/delete', (req,res) =>{
    const {id} = req.params;

    const query = `DELETE FROM Tasks WHERE id = ?`;
    db.run(query, id, function(err) {
        if (err){
            console.error('Error deleting:', err);
            res.status(500).send('Oi-oi, error deleting the task');
            return;
        }
        res.json({message: 'Hoyaaa, we did it!'});
    })
})

app.delete('/categories/:id/delete', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Categories WHERE id = ?`;
    db.run(query, id, function(err) {
        if (err) {
            console.error('Error deleting category:', err);
            res.status(500).send('Error deleting the category');
            return;
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    });
});

///POST part

app.post('/tasks', (req, res) => {
    const id = uuid(); 
    const { name, categoryId } = req.body;
    const query = `INSERT INTO Tasks (Id, Name, Done, Starred, fkCategoryId) 
        VALUES (?, ?, 0, 0, ?)`;

    db.run(query, [id, name, categoryId], function(err) {
        if (err) {
            console.error('Error inserting new task:', err);
            return res.status(500).json({ error: 'Failed to create task' });
        }

        res.status(201).json({
            id,
            name,
            done: false,
            starred: false,
            categoryId,
        });
    });
});

app.post('/categories', (req,res) =>{
    const id = uuid();
    const {name, icon} = req.body;
    const query = `INSERT INTO Categories (Id, Name, Icon)
        VALUES (?, ?, ?)`;

        db.run(query, [id, name, icon], function(err) {
            if (err) {
                console.error('Smth went wrong, boss. No category:', err);
                return res.status(500).json({error: `Some deedle don't`})
            }

            res.status(201).json({
                id,
                name,
                icon
            })
        })
})

// Add this PUT endpoint for updating categories


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
