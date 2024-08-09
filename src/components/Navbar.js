import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import Login from './Login'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the profile icon


function Navbar() {
    const [activeButton, setActiveButton] = useState('Home');
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleLoginButtonClick = (val) => {
        console.log(val);
        setIsLoginOpen(val);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (buttonName) => {
        handleButtonClick(buttonName);
        handleMenuClose();
    };

    const linkStyles = (buttonName) => ({
        backgroundColor: buttonName === 'Login' ? 'rgb(62,90,68)' : (activeButton === buttonName ? 'rgb(62,90,68)' : 'inherit'),
        color: buttonName === 'Login' || activeButton === buttonName ? 'white' : 'black',
        padding: '8px 16px',
        borderRadius: buttonName === 'Login' ? '15px' : '0',
        borderTopLeftRadius: buttonName === 'Login' ? '15px' : (buttonName === 'Home' ? '45px' : '0'),
        borderBottomLeftRadius: buttonName === 'Login' ? '15px' : (buttonName === 'Home' ? '45px' : '0'),
        borderTopRightRadius: buttonName === 'Login' ? '15px' : (buttonName === 'Contact' || buttonName === 'About' ? '25px' : '0'),
        borderBottomRightRadius: buttonName === 'Login' ? '15px' : (buttonName === 'Contact' || buttonName === 'About' ? '25px' : '0'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 'auto',
        textAlign: 'center',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: buttonName === 'Login' ? 'darkgreen' : (activeButton === buttonName ? 'darkgreen' : 'lightgray'),
        },
    });

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar>

                    <Box display="flex" alignItems="center">
                        <IconButton
                            edge="start"
                            aria-label="profile"
                            sx={{ mr: 2, color: 'rgb(62,90,68)' }}
                        >
                            <AccountCircleIcon sx={{ fontSize: '44px' }} />
                        </IconButton>
                    </Box>

                    {/* For Desktop  */}
                    <Box
                        display={{ xs: 'none', sm: 'inline-flex' }}
                        sx={{
                            backgroundColor: '#f0f0f0',
                            borderRadius: '25px',
                            border: '1px solid rgb(62,90,68)',
                        }}
                    >

                        <NavLink
                            to="/"
                            style={({ isActive }) => linkStyles('Home')}
                            onClick={() => handleButtonClick('Home')}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/contact"
                            style={({ isActive }) => linkStyles('Contact')}
                            onClick={() => handleButtonClick('Contact')}
                        >
                            Contact
                        </NavLink>
                        <NavLink
                            to="/about"
                            style={({ isActive }) => linkStyles('About')}
                            onClick={() => handleButtonClick('About')}
                        >
                            About
                        </NavLink>
                    </Box>
                    <Box flexGrow={1} /> {/* Spacer to push the Login link to the right */}
                    <Box display={{ xs: 'none', sm: 'inline-flex' }}>
                        <NavLink
                            to="/login"
                            style={({ isActive }) => linkStyles('Login')}
                            onClick={handleLoginButtonClick}
                        >
                            Login
                        </NavLink>
                    </Box>

                    {/* For Mobile  */}
                    <Box display={{ xs: 'flex', sm: 'none' }} sx={{ marginLeft: 'auto' }}>
                        <IconButton onClick={handleMenuClick} size="large" color="rgb(62,90,68)"
                            sx={{
                                border: '1px solid rgb(62,90,68)',
                                borderRadius: '30%',
                                padding: '4px',
                            }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleMenuItemClick('Home')}>Home</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('Contact')}>Contact</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('About')}>About</MenuItem>
                            <MenuItem onClick={() => handleLoginButtonClick(true)}>Login</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {isLoginOpen && <Login isLoginOpen={isLoginOpen} onClose={handleLoginButtonClick} />}
        </>
    );
}

export default Navbar;
