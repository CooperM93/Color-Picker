import { DRAWER_WIDTH } from '../constants';

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
    root: {
      display: 'flex'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    navBtns: {
        marginRight: '1rem',
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        minWidth: '100px',
        margin: '0 0.5rem',
        fontSize: '13px',
    },
    link: {
        textDecoration: 'none'
    }
  });
  
  export default styles;