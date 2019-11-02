import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "white",
            newColorName: ""
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }
    updateCurrentColor(newColor){
        this.setState({ currentColor: newColor.hex });
    };
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(){
        const newColor = {color: this.state.currentColor, name: this.state.newColorName};
        this.props.addNewColor(newColor);
        this.setState({newColorName: ""})
    }
    render() {
        const { paletteFull } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker 
                    color={currentColor} 
                    onChangeComplete={this.updateCurrentColor} 
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                        value={newColorName}
                        name="newColorName"
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["this field is required", "that name is taken", "color must be unique"]}
                    />
                    <Button 
                    disabled={paletteFull}
                    variant="contained" 
                    style={{ backgroundColor: paletteFull ? 'gray' : currentColor }}
                    type='submit'
                    >
                        {paletteFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>

            </div>
        )
    }
}

export default ColorPickerForm;