
import React from "react";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import Header from "./Header";

describe(`Header Component`, () => {
    describe(`Smoke test`, () => {
        it("should render without crashing", () => {
            const div = document.createElement('div');
            ReactDOM.render(<Header/>, div);
            ReactDOM.unmountComponentAtNode(div);
          });
    })

    describe(`Snapshot test`, () => {
        it(`Renders the UI as expected`, () => {
          const div = document.createElement('div');
            const tree = renderer.create(<Header/>).toJSON()
            expect(tree).toMatchSnapshot()
        });
    });

})


