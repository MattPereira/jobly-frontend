import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import { Card, CardTitle, CardText, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

/** Company details page.
 *
 * On component mount, load the company from API
 * which includes the jobs for that company
 *
 * This is routed to path "/companies/:handle"
 *
 * Routes -> CompanyDetails -> JobCardList
 */

const CompanyDetails = () => {
  const { handle } = useParams();

  console.debug("CompanyDetails", "handle=", handle);
  const [company, setCompany] = useState(null);

  /* On component mount, load company from API */
  useEffect(
    function getCompanyOnMount() {
      console.debug("CompanyDetails useEffect getCompanyOnMount");

      async function getCompany() {
        setCompany(await JoblyApi.getCompany(handle));
      }
      getCompany();
    },
    [handle]
  );

  if (!company) return <LoadingSpinner />;

  return (
    <div>
      <Card className="text-center bg-white p-3 rounded mb-3 col-md-10 offset-md-1">
        <CardBody>
          {company.logoUrl && (
            <div className="col-md-6 offset-md-3">
              <img
                src={company.logoUrl}
                alt={`${handle} logo`}
                className="mb-3 img-fluid"
              />
            </div>
          )}

          <CardTitle tag="h2">{company.name}</CardTitle>
          <CardTitle tag="h6">
            # of Employees : {company.numEmployees ? company.numEmployees : "?"}
          </CardTitle>

          <CardText className="lead">{company.description}</CardText>
          <Link to={`/companies/${company.handle}/edit`}>
            <Button color="warning" className="px-4 rounded-pill">
              Edit Company Details
            </Button>
          </Link>
        </CardBody>
      </Card>
      <div className="col-md-8 offset-md-2">
        <JobCardList jobs={company.jobs} />
      </div>
    </div>
  );
};

export default CompanyDetails;
