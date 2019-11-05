import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import NewPaletteNav from './NewPaletteNav';
import { arrayMove } from 'react-sortable-hoc';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: 'flex',
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
    display: 'flex',
    alignItems: 'center'
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
  container: {
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'center',
      height: '100%'
  },
  btns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '100%'
  },
  button: {
      width: '45%',
      fontSize: '13px',
  },
  drawerTitle: {
    alignSelf: 'center'
  }
});

class NewPalette extends React.Component {
    static defaultProps = {
        maxColors: 20
    };
    constructor(props){
        super(props)
        this.state = {
            open: false,
            colors: this.props.palettes[0].colors
        };
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.savePalette = this.savePalette.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });    
    };
    addNewColor(newColor){
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" })
    }
    savePalette(newPaletteName){
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
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
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteFull = colors.length >= maxColors
        return (
            <div className={classes.root}>
            <NewPaletteNav handleDrawerOpen={this.handleDrawerOpen} classes={classes} open={open} palettes={palettes} onSubmit={this.savePalette} />
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
                <div className={classes.container}>
                    <Typography variant="h5" gutterBottom className={classes.drawerTitle}>
                        Design a Palette
                    </Typography>
                    <div className={classes.btns}>
                        <Button 
                            disabled={paletteFull}
                            variant="contained" 
                            className={classes.button}
                            onClick={this.addRandomColor}
                            className={classes.button}
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
                    <ColorPickerForm paletteFull={paletteFull} addNewColor={this.addNewColor} colors={colors}/>
                </div>
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