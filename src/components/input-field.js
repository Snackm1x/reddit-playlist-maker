import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

export default class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    handleChange(event) {
        const text = event.target.value;
        this.setState({
            name: text
        });
        this.props.updateParent(text);
    }

    render() {
        return (
            <TextField
                id="input-field"
                label={this.props.label}
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                margin="normal"
            />
        );
    }
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    updateParent: PropTypes.func.isRequired
};
