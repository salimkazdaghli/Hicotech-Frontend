import React from "react";
import { Card, Col, Skeleton, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteDefiApi } from "../../Services/defiService";

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
        >
          <Skeleton loading={loading} avatar active>
            <Meta title={title} />
          </Skeleton>
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
          <Typography paragraph>
            <a href={defiLien}>
              <i>Lien Vidéo : {defiLien} </i>
            </a>
          </Typography>
        </Card>
      </Skeleton>
    </Col>
  );
};
export default DefiCard;
