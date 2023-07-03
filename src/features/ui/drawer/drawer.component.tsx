import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {RouterConfig} from 'src/routing/router.config';

const drawerWidth = 240;

export default function DrawerContainer() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <List>
        <Toolbar>DNT</Toolbar>
        <Divider />
        {RouterConfig.map((e, index) => {
          return (
            <Link key={e.label} to={`${e.route}`}>
              <ListItem disablePadding>
                <ListItemButton>
                  {e.icon && <ListItemIcon>{e.icon}</ListItemIcon>}
                  <ListItemText primary={e.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
}
