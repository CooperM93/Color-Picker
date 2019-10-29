import React, { Component } from 'react'
import SingleColorBox from './SingleColorBox';
import "./SingleColorPalette.css"
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";

const styles = {
    Palette: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    PaletteColors: {
        height: "90%",
        width: "100vw",
        overflow: "hidden"
    },
    PaletteFooter: {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        fontWeight: "bold"
    },
    emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem"
    },
    backBox: {
        backgroundColor: "rgb(40, 40, 40)"
    },
    backButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        color: "white",
        opacity: "1",
        "&:hover": {
            background: "rgba(255, 255, 255, 0.5)"
        }
    },
    SingleColorBox: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
        }
    }
}

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
                    <div className={`${classes.backBox} ${classes.SingleColorBox}`}> 
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