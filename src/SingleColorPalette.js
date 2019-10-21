import React, { Component } from 'react'
import SingleColorBox from './SingleColorBox';
import "./SingleColorPalette.css"
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

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
        const { emoji, paletteName, id } = this.props.palette
        return (
            <div className="Palette">
                <NavBar 
                    level={null} 
                    handleChange={this.changeFormat} 
                    changeLevel={this.changeLevel} 
                    showSlider={false}
                />
                <div className="Palette-colors">
                    {colors}
                    <div className="back-box SingleColorBox"> 
                    <Link to={`/palette/${id}`}><a className="back-button">Go Back</a></Link>
                    </div>
                </div>
                <footer className="Palette-footer">
                    <div>
                        {paletteName}
                        <span className="emoji">{emoji}</span>
                    </div>
                </footer>
            </div>
        )
    }
}

export default SingleColorPalette