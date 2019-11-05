import React from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PaletteInfoForm from './PaletteInfoForm';

const drawerWidth = 350;

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
    navBtns: {

    }
  });
class NewPaletteNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { classes, open, palettes, onSubmit } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <PaletteInfoForm palettes={palettes} onSubmit={onSubmit}/>
                        <Link to="/"><Button variant='contained' color='secondary'>Go Back</Button></Link>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteNav);