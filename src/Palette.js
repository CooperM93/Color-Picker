import React from 'react';
import "./Palette.css";
import ColorBox from './ColorBox'

class Palette extends React.Component {
    render () {
        const colorBoxes = this.props.palette.colors.map(color => (
            <ColorBox background={color.color} name={color.name}/>
        ))
        return(
            <div className="Palette">
                {/* NavBar */}
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* footer */}
            </div>
        )
    }
}

export default Palette;