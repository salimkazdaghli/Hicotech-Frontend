import React from "react";
import { Card, Col, Skeleton } from "antd";
import {
  EditOutlined,
  FormOutlined,
  CloseOutlined,
  CheckOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { deleteEventApi } from "../../../Services/EventService";
import notificationComponent from "../../../Components/NotificationComponent";

const EventCard = (props) => {
  const { Meta } = Card;
  const {
    event,
    loading,
    events,
    setEvents,
    setLoading,
    setIsModalVisible,
    setEventSelected,
  } = props;
  const { title, description, dateEvent } = event;

  const onDelete = () => {
    setLoading(false);
    deleteEventApi(event._id).then(() => {
      setEvents(events.filter((eventItem) => eventItem._id !== event._id));
      setLoading(true);
      notificationComponent("notification", "delete");
    });
  };

  const onUpdate = () => {
    setEventSelected(event);
    setIsModalVisible(true);
  };
  return (
    <Col span={8} key={event._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <CloseOutlined
              key="delete"
              onClick={onDelete}
              style={{ color: "#e11111" }}
            />,
            <FormOutlined
              key="stop"
              onClick={onUpdate}
              style={{ color: "#B918E1" }}
            />,
            <EyeOutlined
              key="stop"
              onClick={onUpdate}
              style={{ color: "#060601" }}
            />,
            <CheckOutlined
              key="stop"
              onClick={onUpdate}
              style={{ color: "#0779EC" }}
            />,
          ]}
          hoverable
          style={{ width: 320, marginTop: 40 }}
          cover={
            <img
              alt="example"
              src="https://i.pinimg.com/originals/df/5f/4c/df5f4c6fd3354253afe47e3e6aaef09a.jpg"
            />
          }
        >
          <Meta title={title} description={description} />
        </Card>
      </Skeleton>
    </Col>
  );
};
export default EventCard;
