import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router";

export default function MainContent() {
    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <Toolbar />
            <Box sx={{ flexGrow: 1, overflow: 'hidden', p: 3, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </Box>
        </Box>
    )
}