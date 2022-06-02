import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./CompanyCard.css";

/** Company card component.
 *
 * Show information about a company
 *
 * CompanyCard is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  return (
    <div className="mb-3">
      <Link to={`/companies/${handle}`} className="CompanyCard-link">
        <Card body className="CompanyCard-card">
          <CardBody>
            <CardTitle tag="h5">{name}</CardTitle>
            {logoUrl && (
              <img
                src={logoUrl}
                alt={`${handle} logo`}
                className="CompanyCard-logo mb-3"
              />
            )}
            <CardText>{description}</CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default CompanyCard;
