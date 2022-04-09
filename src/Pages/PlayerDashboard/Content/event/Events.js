import React, { useState, useEffect } from "react";
import { Row, Typography } from "antd";

import { getAllEventApi } from "../../../../Services/EventService";

import EventCard from "./EventCard";

import Event from "./Event";

const { Title } = Typography;

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventSelected, setEventSelected] = useState({});
  const [isEventVisible, setEventVisible] = useState(false);

  async function getEvents() {
    await getAllEventApi({ eventVisible: true })
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
      <Title level={2}>Mes évenements </Title>
      <div className="site-card-wrapper">
        {loading && (
          <Row gutter={10}>
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
                setEventVisible={setEventVisible}
              />
            ))}
          </Row>
        )}
        ;
      </div>
      {isEventVisible && (
        <Event
          isEventVisible={isEventVisible}
          event={eventSelected}
          setEventVisible={setEventVisible}
        />
      )}
    </>
  );
};
export default Events;
