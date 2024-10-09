import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Todo({ name, done, starred, toggleDone, toggleStar, deleteTask }) {

    return (
        <Box
        sx={{display: 'flex',
        py: 0.5,
            marginBottom: '5px',
            borderRadius: '10px',
            display: 'flex', 
            alignItems: 'center',
            width: '100%'  }}>
        <Paper elevation={3} 
        sx={{ width: '100%' }}> 
            <Box component="section"
                sx={{ 
                py: 0.5,
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
            <Typography variant="h6" 
                sx={{ flexGrow: 1,
                wordBreak: 'break-all',
                textDecoration: done && 'line-through'
                }}> 
                {name}
            </Typography>
            <Checkbox {...label}
                checked={starred}
                onClick={toggleStar}
                checkedIcon={<StarIcon sx={{color: 'gold'}}/>}
                icon={<StarBorderIcon/>}
            />
                
            </Box>
        </Paper>
        <IconButton aria-label="delete" size="small" onClick={deleteTask}>
        <DeleteIcon fontSize="inherit" />
        </IconButton>
        </Box>
    );
}