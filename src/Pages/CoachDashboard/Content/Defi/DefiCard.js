import React from "react";
import { Card, Col, Skeleton, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteDefiApi } from "../../../../Services/defiService";

import notificationComponent from "../../../../Components/NotificationComponent";

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
    dateExpiration = `${defi.dateExpiration} `,
    defiLien = ` ${defi.defiLien} `,
    defiVisible = ` ${defi.defiVisible} `,
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
              style={{ color: "#A0660D" }}
            />,
          ]}
          hoverable
          style={{ width: 290, marginTop: 40 }}
          cover={
            <a href={defiLien}>
              <img
                alt="Video"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxPguujnk0QFLgGe9aVYlb2W6X9rSW7APDehkusJBjPPtCJD_tK5Ltdx5v2sG6ST8hUJk&usqp=CAU"
                width="150"
                height="150"
              />
            </a>
          }
        >
          <Meta title={title} />
          <Typography paragraph>{description}</Typography>
          {/* <Typography paragraph>
            <i>
              <b>Créer le :</b>
            </i>{" "}
            <i format="YYYY/MM/DD">{createdAt.dateToFormat}</i>
          </Typography> */}
          <Typography paragraph>
            <i>
              <b>Expiré le :</b>{" "}
            </i>
            <i format="YYYY/MM/DD">{defi.dateExpiration}</i>
          </Typography>
        </Card>
      </Skeleton>
    </Col>
  );
};
export default DefiCard;
