import React from "react";
import { Card, Col, Skeleton } from "antd";
import { StopOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteSeanceApi } from "../../../../Services/SeanceService";
import notificationComponent from "../../../../Components/NotificationComponent";

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
    setSeanceVisible,
  } = props;
  const { seanceName } = seance;
  const onDelete = () => {
    setLoading(false);
    deleteSeanceApi(seance._id).then(() => {
      setSeances(seances.filter((seanceItem) => seanceItem._id !== seance._id));
      setLoading(true);
      notificationComponent("notification", "delete");
    });
  };

  const onUpdate = () => {
    setSeanceSelected(seance);
    setIsModalVisible(true);
  };
  const seanceDetail = () => {
    setSeanceSelected(seance);
    setSeanceVisible(true);
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
            <StopOutlined
              key="stop"
              onClick={onUpdate}
              style={{ color: "#ffcd00" }}
            />,
            <EyeOutlined
              key="eye"
              onClick={seanceDetail}
              style={{ color: "#ffcdaa" }}
            />,
          ]}
          hoverable
          style={{ width: 320, marginTop: 40 }}
        >
          <Meta title={seanceName} />
        </Card>
      </Skeleton>
    </Col>
  );
};
export default SeanceCard;
