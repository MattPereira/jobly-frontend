import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import { useParams, useHistory } from "react-router-dom";

// import LoadingSpinner from "../common/LoadingSpinner";

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
} from "reactstrap";

/** Form to edit a company
 *
 * Displays edit company form and handles changes to local form state.
 * Submission of form calls the API to save, and triggers company details
 * reloading throughout the site.
 *
 * Form is used to edit a company's name, description, numEmployyees,
 * and logoUrl
 *
 * Confirmation of a successful save is a simple bootsrap <Alert>.
 *
 * Routed as /company/:handle/edit
 * Routes -> EditCompanyForm -> Alert
 */

const EditCompanyForm = () => {
  const { handle } = useParams();
  const history = useHistory();

  const token = localStorage.getItem("jobly-token");
  console.log(token);
  //   const [company, setCompany] = useState(null);

  //   /* On component mount, load company from API to populate form data*/
  //   useEffect(
  //     function getCompanyOnMount() {
  //       console.debug("CompanyList useEffect getCompanyOnMount");

  //       async function getCompany() {
  //         setCompany(await JoblyApi.getCompany(handle));
  //       }
  //       getCompany();
  //     },
  //     [handle]
  //   );

  //   if (!company) return <LoadingSpinner />;

  //   const [formData, setFormData] = useState({
  //     name: company.name,
  //     description: company.description,
  //     numEmployees: company.numEmployees,
  //     logoUrl: company.logoUrl,
  //   });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    numEmployees: "",
    logoUrl: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "EditCompanyForm",
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  //update state of formData onChange of any form input field
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
    setFormErrors([]);
  };

  /**on form submission:
   * -attempt save to backend & report any errors
   * -if successful
   *  -clear previous error messages and password
   *  - show update-confirmed alert
   *  - set company info throughout the site
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    let companyData = {
      name: formData.name,
      description: formData.description,
      numEmployees: +formData.numEmployees,
      logoUrl: formData.logoUrl,
    };

    console.log(companyData);

    try {
      await JoblyApi.updateCompany(handle, companyData);
      history.push(`/companies/${handle}`);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    // setFormData((fData) => ({ ...fData, password: "" }));
    setFormErrors([]);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-8">
        <Card className="px-5 py-3">
          <CardBody>
            <CardTitle className="display-4 text-center">
              Edit Company
            </CardTitle>
            <h6 className="text-center display-6">{handle}</h6>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Company Name :</Label>
                <Input
                  className="form-control"
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={formData.name}
                  required
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                  className="form-control"
                  id="description"
                  name="description"
                  type="text"
                  onChange={handleChange}
                  value={formData.description}
                  required
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="numEmployees">Number of Employees</Label>
                <Input
                  className="form-control"
                  id="numEmployees"
                  name="numEmployees"
                  type="number"
                  onChange={handleChange}
                  value={formData.numEmployees}
                  required
                  autoComplete="current-password"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="logoUrl">Logo Url</Label>
                <Input
                  className="form-control"
                  id="logoUrl"
                  name="logoUrl"
                  type="text"
                  onChange={handleChange}
                  value={formData.logoUrl}
                  required
                ></Input>
              </FormGroup>

              {formErrors.length
                ? formErrors.map((err) => (
                    <Alert key={err} color="danger">
                      {err}
                    </Alert>
                  ))
                : null}

              {/* {updateConfirmed ? (
                <Alert type="success">Company information updated!</Alert>
              ) : null} */}

              <div className="row justify-content-end">
                <div className="col-auto">
                  <button className="btn btn-primary btn-block px-4">
                    Update
                  </button>
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EditCompanyForm;
