import React from "react";
import { Modal } from "antd";

const Seance = (props) => {
  const { seance, isSeanceVisible, setSeanceVisible } = props;
  const { title, description, videoLink } = seance;
  const handleOk = () => {
    setSeanceVisible(false);
  };

  const handleCancel = () => {
    setSeanceVisible(false);
  };

  return (
    <Modal
      title="Basic Modal"
      width={1000}
      visible={isSeanceVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{title}</p>
      <p>{description}</p>

      <iframe
        width="950"
        height="615"
        src={videoLink}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </Modal>
  );
};
export default Seance;
