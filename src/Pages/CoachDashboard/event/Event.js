import React from "react";
import { Modal } from "antd";

const Event = (props) => {
  const { event, isEventVisible, setEventVisible } = props;
  const { title, description } = event;
  const handleOk = () => {
    setEventVisible(false);
  };

  const handleCancel = () => {
    setEventVisible(false);
  };

  return (
    <Modal
      title="Détails Event"
      visible={isEventVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <img
        alt="details"
        src="https://thumbs.dreamstime.com/b/ic%C3%B4ne-de-programme-d-%C3%A9v%C3%A9nement-120823059.jpg"
        width="80"
        height="80"
      />

      <p>Titre : {title}</p>
      <p>Description : {description}</p>
      <p>Date : {event.dateEvent}</p>
      <p>Participé : Oui</p>
    </Modal>
  );
};
export default Event;
