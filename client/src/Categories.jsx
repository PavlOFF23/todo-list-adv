import { Box } from "@mui/material";
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit Icon
import EditCategoryForm from './EditCategoryForm'; // Import the EditCategoryForm

// eslint-disable-next-line react/prop-types
export default function Categories({ name, icon, isChecked, onToggle, onRemove, onEdit }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isHovered, setIsHovered] = React.useState(false); // State to track hover
    const [editOpen, setEditOpen] = React.useState(false); // State for edit dialog

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleRightClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget); 
    };

    const handleToggle = () => {
        onToggle(); // Call the toggle function directly
    };

    const handleMouseEnter = () => {
        setIsHovered(true); // Set hover state to true
    };

    const handleMouseLeave = () => {
        setIsHovered(false); // Set hover state to false
    };

    return (
        <div 
            onContextMenu={handleRightClick}
            onMouseEnter={handleMouseEnter} // Use the new mouse enter handler
            onMouseLeave={handleMouseLeave} // Use the new mouse leave handler
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} // Flex container for alignment
        >
            <Paper elevation={6}
                sx={{
                    borderRadius: '10px',
                    fontSize: '22px',
                    cursor: 'pointer',
                    mb: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center the content
                    alignItems: 'center', // Align items vertically centered
                    p: '4px',
                    backgroundColor: isChecked ? '#d3d3d3' : 'transparent',
                    position: 'relative', // Position relative for absolute positioning of buttons
                }}
                onClick={handleToggle} // Make the entire Paper clickable for toggling
            >
                {isHovered && (
                    <>
                        <IconButton 
                            aria-label="edit category" 
                            onClick={() => setEditOpen(true)} 
                            sx={{ 
                                mb: 1, 
                                opacity: isHovered ? 1 : 0, 
                                transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
                                transition: 'opacity 3s ease, transform 3s ease' // Smooth transition
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </>
                )}
                <Box
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    {icon}
                </Box>
                {isHovered && (
                    <IconButton 
                        aria-label="delete category" 
                        onClick={onRemove} 
                        sx={{ 
                            mt: 1, 
                            opacity: isHovered ? 1 : 0, 
                            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                            transition: 'opacity 0.3s ease, transform 0.3s ease' // Smooth transition
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </Paper>
            <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none' }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>{name}</Typography>
            </Popover>
            <EditCategoryForm 
                open={editOpen} 
                onClose={() => setEditOpen(false)} 
                category={{ name, icon }} 
                onEdit={onEdit} 
            />
        </div>
    );
}
