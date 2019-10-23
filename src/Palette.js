import React from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar'
import "./Palette.css";
import { withStyles } from "@material-ui/styles";

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    PaletteColors: {
        height: "90%"
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
    }
};
 
class Palette extends React.Component {
    constructor(props){
        super(props);
        this.state = { level: 500, format: 'hex' };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level){
        this.setState({ level })
    }
    changeFormat(val){
        this.setState({ format: val })
    }
    render () {
        const { colors, paletteName, emoji, id } = this.props.palette
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color => (
            <ColorBox 
                background={color[format]} 
                key={color.id} 
                name={color.name}
                moreUrl={`/palette/${id}/${color.id}`}
            />
        ));
        return(
            <div className={this.props.classes.Palette}>
                <NavBar 
                    level={level} 
                    handleChange={this.changeFormat} 
                    changeLevel={this.changeLevel} 
                    showSlider={true}
                />
                <div className={this.props.classes.PaletteColors}>
                    {colorBoxes}
                </div>
                <footer className={this.props.classes.PaletteFooter}>
                    <div>
                        {paletteName}
                        <span className={this.props.classes.emoji}>{emoji}</span>
                    </div>
                </footer>
            </div>
        )
    }
}

export default withStyles(styles)(Palette);