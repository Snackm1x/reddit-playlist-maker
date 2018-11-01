import React from "react";
import { shallow } from "enzyme";

import InputField from "Components/input-field";
import TextField from "@material-ui/core/TextField";

describe("Input Field", () => {
    let wrapper;
    let props;
    let updateParentStub;
    beforeEach(() => {
        updateParentStub = stub();
        props = {
            label: chance.string(),
            updateParent: updateParentStub
        };
        wrapper = shallow(<InputField {...props} />);
    });

    it("should render the text field", () => {
        expect(wrapper.type()).to.eql(TextField);
    });

    it("should update the parent state on change", () => {
        const input = { target: { value: chance.string() } };
        wrapper.props().onChange(input);
        expect(updateParentStub).to.have.been.calledOnce();
        expect(updateParentStub).to.have.been.calledWith(input.target.value);
    });
});
