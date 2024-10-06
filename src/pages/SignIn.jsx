import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, TextField, Typography, Container, Box, Link } from '@mui/material';
import axios from 'axios';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const nav = useNavigate();

    // TODO: currently hardcoded signing in, fix
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            axios.get("http://localhost:5050/users/signin", {
                params: {
                    email: email,
                    password: password
                }
            })
            .then(() => {
                nav("/status");
            })
            .catch((error) => {
                console.log(error);
            });
            alert("Signed in successfully!");
        } else {
            alert("Please fill in all fields.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#F5F7F8',
                    padding: '20px',
                    borderRadius: '15px',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                    Sign in to manage your parking permit
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <Button onClick={togglePasswordVisibility}>
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#7DCFA6', '&:hover': { backgroundColor: '#6ABD8D' } }}
                    >
                        Sign In
                    </Button>
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Don't have an account? <Link href="create" sx={{ color: '#7DCFA6' }}>Create one</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default SignInForm;