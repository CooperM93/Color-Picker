import React from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar'
import "./Palette.css";

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
            <div className="Palette">
                <NavBar level={level} handleChange={this.changeFormat} changeLevel={this.changeLevel} />
                <div className="Palette-colors">
                    {colorBoxes}
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

export default Palette;