import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import SingleColorBox from './SingleColorBox';
import NavBar from './NavBar';
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {
    constructor(props){
        super(props)
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: 'rgb'
        }
        this.changeFormat = this.changeFormat.bind(this);
        this.gatherShades = this.gatherShades.bind(this);
    }
    changeFormat(val){
        this.setState({ format: val })
    }
    gatherShades(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);
    }
    render() {
        const colors = this._shades.map(shade => (
            <SingleColorBox                 
                background={shade[this.state.format]} 
                key={shade.name} 
                name={shade.name}
            />
        ))
        const { classes } = this.props;
        const { emoji, paletteName, id } = this.props.palette;
        return (
            <div className={classes.Palette}>
                <NavBar 
                    level={null} 
                    handleChange={this.changeFormat} 
                    changeLevel={this.changeLevel} 
                    showSlider={false}
                />
                <div className={classes.PaletteColors}>
                    {colors}
                    <div className={classes.backBox}> 
                        <Link to={`/palette/${id}`}><button className={classes.backButton}>Go Back</button></Link>
                    </div>
                </div>
                <footer className={classes.PaletteFooter}>
                    <div>
                        {paletteName}
                        <span className={classes.emoji}>{emoji}</span>
                    </div>
                </footer>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette)