import React, { Component } from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import styles from "./styles/ColorBoxStyles";
import { withStyles } from '@material-ui/styles';
export class ColorBox extends Component {
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
        const {name, background, moreUrl, classes} = this.props;
        const {copy} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className={classes.ColorBox}>
                    <div 
                        style={{background}} 
                        className={`${classes.copyOverlay} ${copy && classes.showOverlay}`}
                    />
                    <div className={`${classes.copyMessage} ${copy && classes.copyShow} ${classes.lightText}`}>
                        <h1>Copied</h1>
                        <p>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.darkText}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={classes.seeMore}>MORE</span>
                    </Link>
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);
