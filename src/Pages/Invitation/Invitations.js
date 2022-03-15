import React, { useState, useEffect } from "react";
import { Switch, Row, Button } from "antd";
import { getAllInvitationApi } from "../../Services/InvitationService";
import InvitationCard from "./InvitationCard";
import SendInvitation from "./SendInvitation";

const Invitations = () => {
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

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
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        Send Invotation
      </Button>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {invitations.map((invitation) => (
            <InvitationCard invitation={invitation} loading={loading} />
          ))}
        </Row>
      </div>
      <SendInvitation
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </>
  );
};
export default Invitations;
