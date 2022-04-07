import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllEventApi } from "../../../Services/EventService";
import EventCard from "./EventCard";
import EventForm from "./EventForm";
import authService from "../../../Services/authService";

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventSelected, setEventSelected] = useState({});
  const currentUser = authService.getCurrentUser();

  const showModal = () => {
    setEventSelected({ _id: "0000" });
    setIsModalVisible(true);
  };

  async function getEvents() {
    await getAllEventApi({ creacteBy: currentUser.id })
      .then((response) => {
        setEvents(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ float: "right" }}
        icon={<PlusOutlined />}
      >
        Ajouter un nouveau Event
      </Button>
      <div className="site-card-wrapper">
        {loading && (
          <Row gutter={16}>
            {events.map((event) => (
              <EventCard
                event={event}
                loading={loading}
                key={event._id}
                events={events}
                setEvents={setEvents}
                setLoading={setLoading}
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                setEventSelected={setEventSelected}
              />
            ))}
          </Row>
        )}
        ;
      </div>
      {loading && (
        <EventForm
          key={eventSelected._id}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setEvents={setEvents}
          events={events}
          setLoading={setLoading}
          loading={loading}
          eventSelected={eventSelected}
        />
      )}
    </>
  );
};
export default Events;
