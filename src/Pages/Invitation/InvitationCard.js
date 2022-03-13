import React from "react";
import { Skeleton, Card, Avatar, Col, notification } from "antd";
import { StopOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteInvitationApi,
  updateInvitationApi,
} from "../../Services/InvitationService";

const openNotification = (messageText, descriptionText) => {
  const args = {
    message: messageText,
    description: descriptionText,
  };
  notification.open(args);
};

const InvitationCard = (props) => {
  const { Meta } = Card;
  const { invitation, loading } = props;
  const title = `Invitation  ${invitation.etat}`;
  const description = `vous avez invité le joueur ${invitation.userData.firstName} ${invitation.userData.lastName} son email est ${invitation.email} à 13 mars 2020 15:35`;

  const onDelete = () => {
    deleteInvitationApi(invitation._id);
    window.location.reload(false);
    openNotification();
  };
  const onUpdate = () => {
    if (invitation.expired !== true) {
      updateInvitationApi(invitation._id, { etat: "annulé", expired: true });
      window.location.reload(false);
    } else {
      openNotification("Notification", "Invitation déja experid");
    }
  };
  return (
    <Col span={8} key={invitation._id}>
      <Card
        style={{ marginTop: 16 }}
        actions={[
          <DeleteOutlined key="delete" onClick={onDelete} />,
          <StopOutlined key="stop" onClick={onUpdate} />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={title}
            description={description}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};
export default InvitationCard;
