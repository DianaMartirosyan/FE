import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';


function Login({ isLoginOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(isLoginOpen ? true : false);
    const [isOpenLoginP, setOpenLoginP] = useState(isLoginOpen)
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmitForm = (event) => {
        event.preventDefault();
        setError(null);

        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: email,
                password: password,
                expiresInMins: 30,
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.token) {
                    setToken(data.token);
                    setRefreshToken(data.refreshToken);
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    fetchUserData(data.token);
                } else {
                    setError('Failed to retrieve token');
                }
            });

        /* providing token in bearer */

        const fetchUserData = (token) => {
            fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('User Data:', data);

                })
                .catch((error) => {
                    console.error('User Data Fetch Error:', error);
                    setError(error.message || 'An error occurred while fetching user data');
                });
        };

    }

    const refreshAccessToken = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            fetch('https://dummyjson.com/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                    expiresInMins: 30,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Refresh Token Response:', data);
                    if (data.token) {
                        setToken(data.token);
                        localStorage.setItem('authToken', data.token);
                    } else {
                        setError('Failed to refresh token');
                    }
                })
                .catch((error) => {
                    console.error('Refresh Token Error:', error);
                    setError('An error occurred while refreshing the token');
                });
        } else {
            setError('No refresh token available');
        }
    };

    const handleCancel = () => {
        setEmail('');
        setPassword('');
        setShowLoginForm(!showLoginForm)
        setOpenLoginP(!isOpenLoginP)
        onClose(false)
    };


    return (
        <>
            {
                showLoginForm && { isOpenLoginP } &&
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="85vh"
                    sx={{
                        '@media (max-width: 500px)': {
                            width: '80%',
                            margin: '0 auto'
                        },
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmitForm}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            width: '100%',
                            maxWidth: '400px',
                            backgroundColor: 'white',
                        }}
                    >

                        <Typography variant="h4" sx={{ color: 'rgb(62,90,68)', textAlign: 'left' }}>
                            Login
                        </Typography>


                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <TextField
                            label="Email"
                            type="email"
                            margin="normal"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                input: { color: 'rgb(62,90,68)' },
                                '& .MuiInputLabel-root': { color: 'gray' },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'rgb(62,90,68)' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'gray',
                                    },

                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(62,90,68)',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                input: { color: 'rgb(62,90,68)' },
                                '& .MuiInputLabel-root': { color: 'gray' },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'rgb(62,90,68)' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'gray',
                                    },

                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(62,90,68)',
                                    },
                                },
                            }}
                        />

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                            mt={2}

                        >
                            <Button
                                sx={{ color: 'rgb(62,90,68)', border: '1px solid rgb(62,90,68)' }}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ color: 'white', background: 'rgb(62,90,68)' }}

                            >
                                Login
                            </Button>
                        </Box>
                        <Button
                            color="primary"
                            onClick={refreshAccessToken}
                            sx={{ mt: 2, color: 'rgb(62,90,68)', border: '1px solid rgb(62,90,68)' }}
                        >
                            Refresh Token
                        </Button>
                    </Box>
                </Box>
            }
        </>

    );
}

export default Login;
