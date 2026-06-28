import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'

export default function TopNav() {
    return (
        <AppBar component="nav" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    component="div"
                >
                    Business Management System
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>Steven</Typography>
                    <Button color="inherit">Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}