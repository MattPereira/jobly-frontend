import React from "react";
import { render } from "@testing-library/react";
import CompanyDetails from "./CompanyDetails";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <UserProvider>
        <CompanyDetails />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/companies/ecorp"]}>
      <UserProvider>
        <Route path="/company/:handle">
          <CompanyDetails />
        </Route>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
