import React from "react";
import { Card, Col, Skeleton, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteSeanceApi } from "../../../Services/seanceService";
import notificationComponent from "../../../Components/NotificationComponent";

const SeanceCard = (props) => {
  const { Meta } = Card;
  const {
    seance,
    loading,
    seances,
    setSeances,
    setLoading,
    setIsModalVisible,
    setSeanceSelected,
  } = props;
  const {
    title = `${seance.seanceName}`,
    description = ` ${seance.seanceObjectif} `,
    dateExpiration = `${seance.dateExpiration} `,
    seanceLien = ` ${seance.seanceLien} `,
  } = seance;

  const onDelete = () => {
    setLoading(false);
    deleteSeanceApi(seance._id).then(() => {
      setSeances(seances.filter((seanceItem) => seanceItem._id !== seance._id));
      setLoading(true);
      notificationComponent(
        "Notification",
        "Le défi est supprimé avec succeés"
      );
    });
  };

  const onUpdate = () => {
    setSeanceSelected(seance);
    setIsModalVisible(true);
  };
  return (
    <Col span={8} key={seance._id}>
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
          style={{ width: 320, marginTop: 40 }}
          cover={
            <a href={seanceLien}>
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
            <i format="YYYY/MM/DD">{dateExpiration.dateToFormat}</i>
          </Typography>
        </Card>
      </Skeleton>
    </Col>
  );
};
export default SeanceCard;
