import React from "react";
import { Card, Col, Skeleton } from "antd";
import {
  FormOutlined,
  StopOutlined,
  CloseOutlined,
  CheckOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  deleteEventApi,
  updateEventApi,
} from "../../../../Services/EventService";
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

  const onDelete = () => {
    setLoading(false);
    deleteEventApi(event._id).then(() => {
      setEvents(events.filter((eventItem) => eventItem._id !== event._id));
      setLoading(true);
      notificationComponent(
        "Notification",
        "L'évenement est supprimé avec succées"
      );
    });
  };

  const onUpdate = () => {
    setEventSelected(event);
    setIsModalVisible(true);
  };
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
    // console.log(event);
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
        "Vous êtes déjà participé à cet evenement "
      );
    }
  };
  return (
    <Col span={9} key={event._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <>
              <CloseOutlined
                key="delete"
                onClick={onDelete}
                style={{ color: "#e11111" }}
              />
              ,
              <FormOutlined
                key="stop"
                onClick={onUpdate}
                style={{ color: "#B918E1" }}
              />
              ,
              <EyeOutlined
                key="stop"
                onClick={eventDetail}
                style={{ color: "#060601" }}
              />
            </>,
          ]}
          hoverable
          style={{ width: 280, marginTop: 50 }}
          cover={
            <img
              alt="example"
              src="https://i.pinimg.com/originals/df/5f/4c/df5f4c6fd3354253afe47e3e6aaef09a.jpg"
            />
          }
          // hoverable
          // style={{ width: 320, marginTop: 40 }}
          // cover={<img alt="example" src={event.image} />}>
        >
          <Meta title={title} />
        </Card>
      </Skeleton>
    </Col>
  );
};
export default EventCard;
