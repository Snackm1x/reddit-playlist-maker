import React, { Component } from "react";
import InputField from "./input-field";

export default class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: "",
            thread: ""
        };
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.updateThread = this.updateThread.bind(this);
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name
        });
    }

    updateThread(thread) {
        this.setState({
            thread: thread
        });
    }
    render() {
        return (
            <div className="input-form">
                <InputField
                    label="Playlist Name"
                    updateParent={this.updatePlaylistName}
                />
                <InputField
                    label="Thread URL"
                    updateParent={this.updateThread}
                />
            </div>
        );
    }
}
