import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, TextField, Typography, Container, Box, Link } from '@mui/material';
import axios from 'axios'

function CreateAccountForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const nav = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: email
        }
        if (email && password) {
            if (password === confirmPassword) {
                axios.post("http://localhost:5050/users", userData)
                    .then(() => {
                        nav("/preferences")
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                alert("Account created successfully!");
            }
            else {
                setPasswordError(true)
            }
        } else {
            alert("Please fill in all fields and ensure passwords match.");
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
                    Create An Account
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                    Create an account to enjoy all the services without any ads for free!
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={passwordError}
                        helperText={passwordError ? "Passwords do not match." : ""}
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <Button onClick={togglePasswordVisibility}>
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            ),
                        }}
                    >
                        test
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#7DCFA6', '&:hover': { backgroundColor: '#6ABD8D' } }}
                    >
                        Create Account
                    </Button>
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Already Have An Account? <Link href="/" sx={{ color: '#7DCFA6' }}>Sign In</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default CreateAccountForm;
