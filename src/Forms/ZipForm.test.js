import React from "react";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import ZipForm from "./ZipForm";
import CurrentContextProvider from "../CurrentContext";


describe(`ZipForm Component`, () => {
    describe(`Smoke test`, () => {
        it("should render without crashing", () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <CurrentContextProvider>
            <ZipForm/>
            </CurrentContextProvider>,
             div);
            ReactDOM.unmountComponentAtNode(div);
          });
    })

    describe(`Snapshot test`, () => {
        it(`Renders the UI as expected`, () => {
          const div = document.createElement('div');
            const tree = renderer.create(
            <CurrentContextProvider>
            <ZipForm/>
            </CurrentContextProvider>
            ).toJSON()
            expect(tree).toMatchSnapshot()
        });
    });

})


