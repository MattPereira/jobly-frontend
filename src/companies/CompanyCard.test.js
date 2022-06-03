import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { MemoryRouter } from "react-router-dom";

it("matches snapshot with logo", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard
        handle="linux"
        name="Linux Kernel"
        description="Linux is a Unix-like and Linux-derived operating system."
        logo_url="https://upload.wikimedia.org/wikipedia/commons/d/dd/Linux_logo.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without logo", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard
        handle="ubuntu"
        name="Focal Fossa"
        description="Ubuntu is a free and open-source operating system."
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
