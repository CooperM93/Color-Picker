import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: "form",
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.savePalette = this.savePalette.bind(this);
        this.showEmoji = this.showEmoji.bind(this);
    };
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleClickOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = () => {
      this.setState({open: false});
    };
    savePalette(emoji) {
        this.props.onSubmit({paletteName: this.state.newPaletteName, emoji: emoji.native})
    }
    showEmoji() {
        this.setState({stage: 'emoji'})
    }
    render() {
        const { newPaletteName } = this.state;
        const { hideForm } = this.props;
        return (
            <div>
                <Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
                    <DialogTitle id="form-dialog-title">New Palette Emoji</DialogTitle>
                    <Picker onSelect={this.savePalette} title='Pick an Emoji'/>
                </Dialog>
                <Dialog open={this.state.stage === 'form'} onClose={this.handleClose} aria-labelledby="form-dialog-title" onClose={hideForm}>ç
                    <DialogTitle id="form-dialog-title">New Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmoji}>
                        <DialogContent>
                        <DialogContentText>
                            Enter a unique name for your unique palette.
                        </DialogContentText>
                            <TextValidator 
                                value={newPaletteName} 
                                onChange={this.handleChange} 
                                fullWidth
                                margin='normal'
                                name="newPaletteName"
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["enter palette name", "this name is taken"]}
                            />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={hideForm} color="secondary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                        </DialogActions>
                        </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}

export default PaletteInfoForm;