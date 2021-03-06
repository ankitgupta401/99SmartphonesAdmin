import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import Styles from './sidebar.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
   adj: {
    maxWidth: '35px',
    alignItems:'left',
    paddingRight: '5px'
   },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
 background: 'brown',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
   
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
   
  },
  toolbar2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    background: 'brown',
    color:'white',
     fontSize: '15px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  btnHide: {
    display: 'hidden'
  }
 
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>

      <CssBaseline />
     
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
      
        <Toolbar>
      
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
      
          { !open ? <span className={Styles.fnt}><img src="logo/logo3.jpeg" alt="" className={classes.adj} />Smartphones Admin</span> : null}
        
      
<div className={Styles.logout}>

<Dropdown>
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
  <i className="icofont-business-man-alt-2" ></i>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
    
    <Dropdown.Item >My Blogs</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</div>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
          
        <div className={classes.toolbar2}>
        { open ? <span ><img src="logo/logo3.jpeg" alt="" className={classes.adj} />Smartphones Admin</span> : null}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[{value: 'Dashboard', link:"/"}, {value: 'Add Products', link:"/"}, {value: 'Add  Blog', link:"/add-blog"}, {value: 'Add News', link:"/add-news"}, {value: 'Backlinks', link:"/mail"}, {value: 'Main Page Blog', link:"/add-blog-main-page"},{value: 'Profile', link:"/"}].map((text, index) => (
             <Link to={text.link} key={index}>
           <ListItem button >
            
              <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text.value} />
            
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
       
          {['Ankit Gupta', 'Access: Admin', 'ag3831124@gmail.com'].map((text, index) => (
            <ListItem button key={index}>
             
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
          <br/>  <br/>
     {props.children}
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}