import React from "react";
import { Card, Col, Skeleton } from "antd";
import { StopOutlined, CheckOutlined, EyeOutlined } from "@ant-design/icons";

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
      notificationComponent(
        "Notification",
        "Vous n'etes pas interessé par cet evenement .."
      );
    }
  };

  const onParticipateEvent = () => {
    if (event.participants.indexOf(currentUser.id) < 0) {
      updateEventApi(event._id, {
        participants: [...event.participants, currentUser.id],
      });
      notificationComponent(
        "Notification",
        "Vous avez participé à cet evenement "
      );
    } else {
      notificationComponent(
        "Notification",
        "Vous etes deja participé à cet evenement "
      );
    }
  };
  return (
    <Col span={9} key={event._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <>
              {" "}
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
          style={{ width: 280, marginTop: 10 }}
          cover={
            <img
              alt="example"
              src="https://i.pinimg.com/originals/df/5f/4c/df5f4c6fd3354253afe47e3e6aaef09a.jpg"
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
