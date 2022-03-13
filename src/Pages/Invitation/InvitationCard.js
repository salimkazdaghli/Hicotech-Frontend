import React from "react";
import { Skeleton, Card, Avatar, Col } from "antd";
import { StopOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteInvitationApi,
  updateInvitationApi,
} from "../../Services/InvitationService";
import notificationComponent from "../../Components/NotificationComponent";

const InvitationCard = (props) => {
  const { Meta } = Card;
  const { invitation, loading } = props;
  const title = `Invitation  ${invitation.etat}`;
  const description = `vous avez invité le joueur ${invitation.userData.firstName} ${invitation.userData.lastName} son email est ${invitation.email} à ${invitation.createdAt}`;

  const onDelete = () => {
    deleteInvitationApi(invitation._id);
    window.location.reload(false);
    notificationComponent();
  };
  const onUpdate = () => {
    if (invitation.expired !== true) {
      updateInvitationApi(invitation._id, { etat: "annulé", expired: true });
      window.location.reload(false);
    } else {
      notificationComponent("Notification", "Invitation déja experid");
    }
  };
  return (
    <Col span={8} key={invitation._id}>
      <Card
        style={{ marginTop: 16 }}
        actions={[
          <DeleteOutlined
            key="delete"
            onClick={onDelete}
            style={{ color: "#e11111" }}
          />,
          <StopOutlined
            key="stop"
            onClick={onUpdate}
            style={{ color: "#ffcd00" }}
          />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar style={{ color: "#fff", backgroundColor: "#36a2e1" }}>
                {invitation.userData.firstName.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={title}
            description={description}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};
export default InvitationCard;
