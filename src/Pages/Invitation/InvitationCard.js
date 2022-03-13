import React from "react";
import { Skeleton, Card, Avatar, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const InvitationCard = (props) => {
  const { Meta } = Card;
  const { invitation } = props;
  const title = `Invitation  ${invitation.etat}`;
  const description = `vous avez invité le joueur ${invitation.userData.firstName} ${invitation.userData.lastName} son email est ${invitation.email} à 13 mars 2020 15:35`;
  const loading = false;
  return (
    <Col span={8} key={invitation._id}>
      <Card
        style={{ marginTop: 16 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
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
