import React from "react";
import { Card, Col, notification, Skeleton } from "antd";
import {
  StopOutlined,
  CheckOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { updateEventApi } from "../../../../Services/EventService";
import notificationComponent from "../../../../Components/NotificationComponent";
import authService from "../../../../Services/authService";

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
    setEventVisible,
  } = props;
  const { title } = event;
  const currentUser = authService.getCurrentUser();
  const eventDetail = () => {
    setEventSelected(event);
    setEventVisible(true);
  };
  const onVisible = () => {
    if (event.eventVisible === true) {
      updateEventApi(event._id, { eventVisible: false });
      notification.open({
        message: "Notification",
        description: "Non interssé ",
        icon: <ExclamationCircleOutlined style={{ color: "#C1B024" }} />,
      });
    }
  };

  const onParticipateEvent = () => {
    if (event.participants.indexOf(currentUser.id) < 0) {
      updateEventApi(event._id, {
        participants: [...event.participants, currentUser.id],
      });
      notification.open({
        message: "Notification",
        description: "Vous avez participé à cet evenement ",
        icon: <CheckCircleOutlined style={{ color: "#5FC1F9" }} />,
      });
    } else {
      notification.open({
        message: "Notification",
        description: "Vous etes deja participé à cet evenement ",
        icon: <ExclamationCircleOutlined style={{ color: "#F97045" }} />,
      });
    }
  };
  return (
    <Col span={9} key={event._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <>
              <EyeOutlined
                key="stop"
                onClick={eventDetail}
                style={{ color: "#030100" }}
              />

              <CheckOutlined
                key="stop"
                onClick={onParticipateEvent}
                style={{ color: "#0C96EA" }}
              />
              <StopOutlined
                key="stop"
                onClick={onVisible}
                style={{ color: "#F74102" }}
              />
            </>,
          ]}
          hoverable
          style={{ width: 300, marginTop: 10 }}
          cover={
            <img
              alt="example"
              src="https://www.dynamique-mag.com/wp-content/uploads/94d8155cb7f2702d2b914dbfb56699d5.jpg"
            />
          }
        >
          <Meta title={title} />
        </Card>
      </Skeleton>
    </Col>
  );
};
export default EventCard;
