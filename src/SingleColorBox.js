import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import styles from './styles/SingleColorBoxStyles';

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
        const shadeNum = name.slice(-4);
        const shadeName = name.slice(0, -3);
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className={classes.SingleColorBox}>
                    <div 
                        style={{background}} 
                        className={clsx(classes.copyOverlay, {
                            [classes.showOverlay]: copy,
                        })}
                    />
                    <div
                        className={clsx(classes.copyMessage, classes.lightText, {
                            [classes.copyShow]: copy,
                        })}
                    >
                        <h1>Copied</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{shadeName}</span>
                            <span className={classes.colorNum}>{shadeNum}</span>
                        </div>
                        <button className={`${classes.copyButton} ${classes.lightText}`}>Copy</button>
                    </div>
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(SingleColorBox);
