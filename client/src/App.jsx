/* eslint-disable no-unused-vars */
import './App.css'
import TodoList from './TodoList'
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00C853', // Яркий зелёный цвет
      },
      secondary: {
        main: '#FFC107', // Дополнительный цвет можно оставить или поменять
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        my: '50px',
        borderRadius: '10px'
      }}>
      <Paper sx={{
        borderRadius: '10px',
        width: '80%',
        minWidth: '400px',
        minHeight: '500px',
        maxWidth: '800px'
      }}
      elevation={12}>
      <TodoList/>
      </Paper>
      </Box>
      <p>You know, sometimes it ain&apos;t the way you want, and in the place where you&apos;d want it to be. And it&apos;s fine.</p>
    </ThemeProvider>
  )
}

export default App
