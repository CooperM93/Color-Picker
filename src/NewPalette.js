import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: 'calc(100vh - 64px)'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPalette extends React.Component {
    static defaultProps = {
        maxColors: 20
    };
    constructor(props){
        super(props)
        this.state = {
            open: false,
            currentColor: 'white',
            colors: this.props.palettes[0].colors,
            newColorName: "",
            newPaletteName: ""
        };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.savePalette = this.savePalette.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
            this.state.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });    
    };
    updateCurrentColor(newColor){
        this.setState({ currentColor: newColor.hex });
    };
    addNewColor(){
        const newColor = {color: this.state.currentColor, name: this.state.newColorName};
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" })
    }
    savePalette(){
        let newName = this.state.newPaletteName
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors: this.state.colors
        }
        this.props.savePalette(newPalette)
        this.props.history.push("/")
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    deleteColor(colorName){
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        })
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    }
    clearPalette() {
        this.setState({colors: []});
    }
    addRandomColor() {
        //combines all colors form all palette
        const allColors = this.props.palettes.map(p => p.colors).flat()
        var rand = Math.floor(Math.random() * allColors.length)
        const randomColor = allColors[rand];
        this.setState({colors: [...this.state.colors, randomColor]})
    }
    render() {
        const { classes, maxColors } = this.props;
        const { open, colors } = this.state;
        const paletteFull = colors.length >= maxColors
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
                    onClick={this.handleDrawerOpen}
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
                </ValidatorForm>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <Typography varient="h4">
                    Design a Palette
                </Typography>
                <div>
                    <Button 
                        disabled={paletteFull}
                        variant="contained" 
                        className={classes.button}
                        onClick={this.addRandomColor}
                    >
                        Random Color
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}
                        onClick={this.clearPalette}
                    >
                        Clear Palette
                    </Button>
                </div>
                <ChromePicker 
                    color={this.state.currentColor} 
                    onChangeComplete={this.updateCurrentColor} 
                />
                <ValidatorForm onSubmit={this.addNewColor}>
                    <TextValidator 
                        value={this.state.newColorName}
                        name="newColorName"
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["this field is required", "that name is taken", "color must be unique"]}
                    />
                    <Button 
                    disabled={paletteFull}
                    variant="contained" 
                    style={{ backgroundColor: paletteFull ? 'gray' : this.state.currentColor }}
                    type='submit'
                    >
                        {paletteFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>

            </Drawer>
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList 
                    colors={this.state.colors} 
                    deleteColor={this.deleteColor} 
                    axis='xy'
                    onSortEnd={this.onSortEnd}
                />
            </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPalette);