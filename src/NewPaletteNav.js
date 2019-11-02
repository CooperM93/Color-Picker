import React from 'react';
import {Link} from 'react-router-dom'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class NewPaletteNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.savePalette = this.savePalette.bind(this);
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
    savePalette() {
        this.props.onSubmit(this.state.newPaletteName)
    }
    render() {
        const { classes, open } = this.props;
        return (
            <div>
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
                    <ValidatorForm onSubmit={this.savePalette}>
                        <TextValidator 
                            value={this.state.newPaletteName} 
                            label="Palette Name" 
                            onChange={this.handleChange} 
                            name="newPaletteName"
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["enter palette name", "this name is taken"]}
                        />
                        <Button variant="contained" color="secondary" type="submit">Save Palette</Button>
                        <Link to="/"><Button variant='contained' color='secondary'>Go Back</Button></Link>
                    </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default NewPaletteNav;