import { useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        my: '50px',
        borderRadius: '10px',
      }}>
      <Paper sx={{
        borderRadius: '10px'
      }}
      elevation={12}>
      <TodoList/>
      </Paper>
      </Box>
      
      <p>You know, sometimes it ain't the way you want, and in the place where you'd want it to be. And it's fine.</p>
    </>
  )
}

export default App
