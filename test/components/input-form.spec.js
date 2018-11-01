import React from "react";
import { shallow } from "enzyme";

import InputForm from "Components/input-form";

describe("Input Form", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<InputForm />);
    });
    it("should render the form", () => {
        expect(wrapper.props().className).to.eql("input-form");
    });
});
