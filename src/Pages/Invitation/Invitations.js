import React, { useState, useEffect } from "react";
import { Switch, Row } from "antd";
import { getAllInvitationApi } from "../../Services/InvitationService";
import InvitationCard from "./InvitationCard";

const Invitations = () => {
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState([]);

  const onChange = () => {
    setLoading(!loading);
  };
  async function getInvitations() {
    await getAllInvitationApi()
      .then((response) => {
        setInvitations(response.data);
      })
      .catch(() => {});
  }
  useEffect(() => {
    getInvitations();
  }, []);
  return (
    <>
      <Switch checked={!loading} onChange={onChange} />
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {invitations.map((invitation) => (
            <InvitationCard invitation={invitation} />
          ))}
        </Row>
      </div>
    </>
  );
};
export default Invitations;
