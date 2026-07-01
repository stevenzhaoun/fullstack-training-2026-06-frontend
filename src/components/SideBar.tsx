import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router'

const drawerWidth = 240;

const links = [
    {label: 'Dashboard', path: '/dashboard'},
    {label: 'Users', path: '/users'},
    {label: 'Roles', path: '/roles'},
    {label: 'Products', path: '/products'},
    {label: 'Orders', path: '/orders'},
]

export default function SideBar() {
    return (
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {links.map(({label, path}) => (
                <Link to={path}>
                    <ListItem key={label} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    )
}