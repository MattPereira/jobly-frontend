import React from "react";
import { render } from "@testing-library/react";
import EditProfileForm from "./EditProfileForm";
import { UserProvider } from "../testUtils";

it("matches snapshot", function() {
  const { asFragment } = render(
    <UserProvider>
      <EditProfileForm />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
