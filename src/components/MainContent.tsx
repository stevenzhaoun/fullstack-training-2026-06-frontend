import { Box, Toolbar, Typography } from "@mui/material";

export default function MainContent() {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar/>
            <Box>
                <Typography variant="body1">Main Content</Typography>
            </Box>
        </Box>
    )
}