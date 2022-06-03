import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import { useParams } from "react-router-dom";
import EditCompanyForm from "./EditCompanyForm";
import LoadingSpinner from "../common/LoadingSpinner";

/** This component is used to fetch company data to pass to <EditCompanyForm/>
 *  in order to populate the form with the company's current data.
 *
 * Routed as /company/:handle/edit
 * Routes -> EditCompany -> EditCompanyForm -> Alert
 */

const EditCompany = () => {
  const { handle } = useParams();

  const [company, setCompany] = useState(null);

  /* On component mount, load company from API to populate form data */
  useEffect(function getCompanyOnMount() {
    console.debug("EditCompany useEffect getCompanyOnMount");

    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getCompany();
  }, []);

  console.debug("EditCompany", "company=", company);

  return company ? <EditCompanyForm company={company} /> : <LoadingSpinner />;
};

export default EditCompany;
