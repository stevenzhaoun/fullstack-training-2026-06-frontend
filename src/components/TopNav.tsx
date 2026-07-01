import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { useUser } from '../hooks/useUser'

export default function TopNav() {

    const { logout, userData } = useUser()

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
                    <Typography>{userData?.name}</Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}