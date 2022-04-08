import React from "react";
import { Card, Col, Skeleton } from "antd";
import {
  FormOutlined,
  StopOutlined,
  CloseOutlined,
  CheckOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { deleteEventApi, updateEventApi } from "../../../Services/EventService";
import notificationComponent from "../../../Components/NotificationComponent";
import authService from "../../../Services/authService";

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
        "Vous etes deja participé à cet evenement "
      );
    }
  };
  return (
    <Col span={9} key={event._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <p>
              {currentUser.role === "coach" && (
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
                  ,
                  <CheckOutlined
                    key="stop"
                    onClick={onParticipateEvent}
                    style={{ color: "#0779EC" }}
                  />
                  ,
                  <StopOutlined
                    key="stop"
                    onClick={onVisible}
                    style={{ color: "#ffcd00" }}
                  />
                </>
              )}

              {!currentUser.role === "coach" && (
                <>
                  {" "}
                  <EyeOutlined
                    key="stop"
                    onClick={eventDetail}
                    style={{ color: "#060601" }}
                  />
                  ,
                  <CheckOutlined
                    key="stop"
                    onClick={onParticipateEvent}
                    style={{ color: "#0779EC" }}
                  />
                  ,
                  <StopOutlined
                    key="stop"
                    onClick={onVisible}
                    style={{ color: "#ffcd00" }}
                  />
                </>
              )}
            </p>,
          ]}
          hoverable
          style={{ width: 280, marginTop: 50 }}
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
