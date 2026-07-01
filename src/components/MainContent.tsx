import { Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router";

export default function MainContent() {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar/>
            <Box>
                <Typography variant="body1"><Outlet /></Typography>
            </Box>
        </Box>
    )
}