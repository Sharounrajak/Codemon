//user registeration page

import React from "react";
import { Box, Typography, Button, Grid, TextField, Stack, Paper  } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
    return (
      <Box
            sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center ',
                justifyContent: 'center',
                height: '80vh',
            }}
        >
            <Typography sx={{ color: '#8978b1ff', fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="h4" gutterBottom >
               Sign Up
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                       sx={{mb: 2, color: '#8978b1ff'}}
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth>
                        Sign up 
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                       Already have an account? <Link to="/register">Login</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Register;