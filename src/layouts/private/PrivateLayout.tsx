import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {Avatar, Menu, MenuItem} from '@mui/material';
import {Logout, Settings} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {logout} from '../../store/slices/auth';
import {PrivateAppBar} from './PrivateAppBar';
import {PrivateDrawer} from './PrivateDrawer';
import {DrawerHeader} from './DrawerHeader';

const menuItems = [
  {
    text: 'Конструктор',
    icon: <SearchIcon/>,
    path: '/query-constructor',
  },
  {
    text: 'Админка',
    icon: <SupervisorAccountIcon/>,
    path: '/admin-panel',
  },
  {
    text: 'Миграции',
    icon: <SwapHorizIcon/>,
    path: '/data-sources-connection',
  },
];

const PrivateLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAccountMenu = Boolean(anchorEl);

  const handleClickAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const onLink = (path: string) => {
    navigate(path);
  };

  const getFirstLetters = () => {
    let result = '';
    if (user) {
      if (user.firstName) {
        result += user.firstName[0].toUpperCase();
      }
      if (user.lastName) {
        result += user.lastName[0].toUpperCase();
      }
    }

    if (!result) {
      return 'NN';
    }

    return result;
  };

  return (
      <Box sx={{display: 'flex'}}>
        <PrivateAppBar position="fixed" open={openDrawer}>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: '36px',
                  ...(openDrawer && {display: 'none'}),
                }}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
              Doc Search
            </Typography>
            <Box>
              <IconButton
                  onClick={handleClickAccountMenu}
                  size="small"
                  sx={{ml: 2}}
                  aria-controls={openAccountMenu ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccountMenu ? 'true' : undefined}
              >
                <Avatar sx={{width: 32, height: 32}}>
                  {getFirstLetters()}
                </Avatar>
              </IconButton>
              <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openAccountMenu}
                  onClose={handleCloseAccountMenu}
                  onClick={handleCloseAccountMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    },
                  }}
                  transformOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small"/>
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={onLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small"/>
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </PrivateAppBar>
        <PrivateDrawer variant="permanent" open={openDrawer}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </DrawerHeader>
          <Divider/>
          <List>
            {
              menuItems.map(({path, text, icon}) => (
                  <ListItem
                      button
                      key={path}
                      onClick={() => onLink(path)}
                      sx={{
                        background: location.pathname === path ? '#eaeaea' : undefined,
                      }}
                  >
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                  </ListItem>
              ))
            }
          </List>
        </PrivateDrawer>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
          <DrawerHeader/>
          <Outlet/>
        </Box>
      </Box>
  );
};

export default PrivateLayout;
