import React from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
//import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PaletteInfoForm from './PaletteInfoForm';
import styles from './styles/NewPaletteNavStyles';
class NewPaletteNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newPaletteName: "",
            formShowing: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
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
    showForm() {
        this.setState({ formShowing: true })
    }
    hideForm() {
        this.setState({ formShowing: false })
    }
    render() {
        const { classes, open, palettes, onSubmit } = this.props;
        return (
            <div className={classes.root}>
                
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
                        <Typography variant="h6" className={classes.title} noWrap>
                            Custom Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/" className={classes.link}>
                            <Button variant='outlined' color='secondary' className={classes.button}>
                                Go Back
                            </Button>
                        </Link>
                        <Button variant="outlined" color="primary" onClick={this.showForm} className={classes.button}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {this.state.formShowing && <PaletteInfoForm palettes={palettes} onSubmit={onSubmit} hideForm={this.hideForm} />}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteNav);