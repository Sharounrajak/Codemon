import {Box, Typography, Button, Grid, TextField, Stack, Paper} from '@mui/material';
import {Link} from 'react-router-dom';

export default function login() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
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
                        Login
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}