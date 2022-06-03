import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { UserProvider } from "../testUtils";

it("matches snapshot", function() {
  const { asFragment } = render(
    <UserProvider>
      <JobCard
        id={1}
        title="lawnmower"
        salary={222}
        equity={0.5}
        companyName="Always Greener"
      />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
