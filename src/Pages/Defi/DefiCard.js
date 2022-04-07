import React from "react";
import { Card, Col, Skeleton, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteDefiApi } from "../../Services/DefiService";

import notificationComponent from "../../Components/NotificationComponent";

const DefiCard = (props) => {
  const { Meta } = Card;
  const {
    defi,
    loading,
    defis,
    setDefis,
    setLoading,
    setIsModalVisible,
    setDefiSelected,
  } = props;
  const {
    title = `${defi.defiName}`,
    description = ` ${defi.defiObjectif} `,
    defiLien = ` ${defi.defiLien} `,
    createdAt = `${defi.createdAt}  `,
    dateExpiration = `${defi.dateExpiration} `,
  } = defi;
  console.log(title);
  const onDelete = () => {
    setLoading(false);
    deleteDefiApi(defi._id).then(() => {
      setDefis(defis.filter((defiItem) => defiItem._id !== defi._id));
      setLoading(true);
      notificationComponent(
        "Notification",
        "Le défi est supprimé avec succeés"
      );
    });
  };

  const onUpdate = () => {
    setDefiSelected(defi);
    setIsModalVisible(true);
  };
  return (
    <Col span={8} key={defi._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <DeleteOutlined
              key="delete"
              onClick={onDelete}
              style={{ color: "#e11111" }}
            />,
            <EditOutlined
              key="stop"
              onClick={onUpdate}
              style={{ color: "#ffcd00" }}
            />,
          ]}
          hoverable
          style={{ width: 300, marginTop: 20 }}
          cover={
            <a href={defiLien}>
              <img
                alt="Video"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8YPDtFDdBb7Z8mC7bkldgpUXuPkQvrSjIOdKTKcrrelZJoywv6g0LgmwY9illSeO_r4E&usqp=CAU"
                width="150"
                height="150"
                style={{ alignSelf: "center" }}
              />
            </a>
          }
        >
          <Meta title={title} />
          <Typography paragraph>{description}</Typography>
          <Typography paragraph>
            <i>
              <b>Créer le :</b>
            </i>{" "}
            <i format="YYYY/MM/DD">{createdAt.dateToFormat}</i>
          </Typography>
          <Typography paragraph>
            <i>
              <b>Expiré le :</b>{" "}
            </i>
            <i format="YYYY/MM/DD">{dateExpiration.dateToFormat}</i>
          </Typography>
        </Card>
      </Skeleton>
    </Col>
  );
};
export default DefiCard;
