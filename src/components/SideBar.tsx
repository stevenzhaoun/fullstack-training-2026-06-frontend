import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

const drawerWidth = 240;

const links = [
    {label: 'Dashboard'},
    {label: 'Users'},
    {label: 'Roles'},
    {label: 'Products'},
    {label: 'Orders'},

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
            {links.map(({label}) => (
              <ListItem key={label} disablePadding>
                <ListItemButton>
                
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    )
}