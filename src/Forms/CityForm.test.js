import React from "react";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import CityForm from "./CityForm";
import CurrentContextProvider from "../CurrentContext";


describe(`CityForm Component`, () => {
    describe(`Smoke test`, () => {
        it("should render without crashing", () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <CurrentContextProvider>
            <CityForm/>
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
            <CityForm/>
            </CurrentContextProvider>
            ).toJSON()
            expect(tree).toMatchSnapshot()
        });
    });

})


