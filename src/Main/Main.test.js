import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Main from "./Main";
import CurrentContextProvider from "../CurrentContext";

describe(`Main Component`, () => {
  describe(`Smoke test`, () => {
    it("should render without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(
        <CurrentContextProvider>
          <Main />
        </CurrentContextProvider>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe(`Snapshot test`, () => {
    it(`Renders the UI as expected`, () => {
      const div = document.createElement("div");
      const tree = renderer
        .create(
          <CurrentContextProvider>
            <Main />
          </CurrentContextProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
