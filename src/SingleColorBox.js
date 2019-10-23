import React, { Component } from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard";
import './SingleColorBox.css';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

const styles = {
    lightText: {
        color: props => 
            chroma(props.background).luminance() >= 0.65 ? "black" : "white"
    },
    darkText: {
        color: props => 
            chroma(props.background).luminance() <= 0.09 ? "white" : "black"
    
    }
}


class SingleColorBox extends Component {
    constructor(props){
        super(props);
        this.state = { copy: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
       this.setState({copy: true}, () => {
           setTimeout(() => this.setState({copy: false}), 1500);
       }) 
    }
    render() {
        const {name, background, classes} = this.props;
        const {copy} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="SingleColorBox">
                    <div 
                        style={{background}} 
                        className={`copy-overlay ${copy && "show"}`}
                    />
                    <div className={`copy-msg ${copy && "show"}`}>
                        <h1>Copied</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.darkText}>{name}</span>
                        </div>
                        <button className={`copy-button ${classes.lightText}`}>Copy</button>
                    </div>
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(SingleColorBox);
