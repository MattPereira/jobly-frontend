import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
} from "reactstrap";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply button click.
 *
 * JobCardList -> JobCard
 */

const JobCard = ({ id, title, salary, equity, companyName, companyHandle }) => {
  console.debug("JobCard");

  const { hasAppliedToJob, applyToJob, unApplyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(
    function updateAppliedStatus() {
      console.debug("JobCard useEffect updateAppliedStatus", "jobId=", id);

      setApplied(hasAppliedToJob(id));
    },
    [id, hasAppliedToJob]
  );

  /**Handle applying for a job */
  async function handleApply(e) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  /**Handle unApplying for a job */
  async function handleUnapply(e) {
    if (hasAppliedToJob(id)) {
      unApplyToJob(id);
      setApplied(false);
    }
  }

  return (
    <Card className="text-center mb-3">
      <CardBody>
        <CardTitle tag="h4" className="mb-3">
          {title}
        </CardTitle>
        <CardSubtitle className="mb-3 text-muted" tag="h5">
          <Link to={`/companies/${companyHandle}`}>{companyName}</Link>
        </CardSubtitle>
        <div className="col-md-8 offset-md-2">
          <Table bordered>
            <tbody>
              <tr>
                <th scope="row">Salary</th>
                <td>${salary}</td>
              </tr>
              <tr>
                <th scope="row">Equity</th>
                <td>{equity ? `${equity}%` : "None"}</td>
              </tr>
            </tbody>
          </Table>
          {applied ? (
            <Button
              color="danger"
              className="px-4 rounded-pill"
              onClick={handleUnapply}
            >
              Unapply
            </Button>
          ) : (
            <Button
              color="success"
              className="px-4 rounded-pill"
              onClick={handleApply}
            >
              Apply
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default JobCard;
