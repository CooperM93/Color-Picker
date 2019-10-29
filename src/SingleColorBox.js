import React, { Component } from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard";
import styles from './styles/SingleColorBoxStyles';
import { withStyles } from '@material-ui/styles';
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
                <div style={{background}} className={classes.SingleColorBox}>
                    <div 
                        style={{background}} 
                        className={`${classes.copyOverlay} ${copy && classes.showOverlay}`}
                    />
                    <div className={`${classes.copyMessage} ${copy && classes.copyShow} ${classes.lightText}`}>
                        <h1>Copied</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className={classes.boxContent}>
                            <span className={classes.darkText}>{name}</span>
                        </div>
                        <button className={`${classes.copyButton} ${classes.lightText}`}>Copy</button>
                    </div>
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(SingleColorBox);
