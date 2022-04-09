import React, { useState, useEffect } from "react";
import { Row, Button, Spin, Space, Col } from "antd";
import { getAllSeanceApi } from "../../../../Services/SeanceService";
import SeanceCard from "./SeanceCard";
import SeanceForm from "./SeanceForm";
import Seance from "./seance";
import authService from "../../../../Services/authService";

const Seances = () => {
  const [loading, setLoading] = useState(false);
  const [seances, setSeances] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seanceSelected, setSeanceSelected] = useState({});
  const [isSeanceVisible, setSeanceVisible] = useState(false);
  const currentUser = authService.getCurrentUser();

  const showModal = () => {
    setSeanceSelected({ _id: "0000" });
    setIsModalVisible(true);
  };

  async function getSeances() {
    await getAllSeanceApi({ creacteBy: currentUser.id })
      .then((response) => {
        setSeances(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getSeances();
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        Nouvelle séance
      </Button>
      <div className="site-card-wrapper">
        {loading && (
          <Row gutter={16}>
            {seances.map((seance) => (
              <SeanceCard
                seance={seance}
                loading={loading}
                key={seance._id}
                seances={seances}
                setSeances={setSeances}
                setLoading={setLoading}
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                setSeanceSelected={setSeanceSelected}
                setSeanceVisible={setSeanceVisible}
              />
            ))}
          </Row>
        )}
        {!loading && (
          <Row gutter={16}>
            <Col span={8}>
              <Space size="middle" style={{ marginTop: 250, marginLeft: 600 }}>
                <Spin size="large" tip="Loading..." />
              </Space>
            </Col>
          </Row>
        )}
      </div>
      {loading && (
        <SeanceForm
          key={seanceSelected._id}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setSeances={setSeances}
          seances={seances}
          setLoading={setLoading}
          loading={loading}
          seanceSelected={seanceSelected}
        />
      )}
      {isSeanceVisible && (
        <Seance
          isSeanceVisible={isSeanceVisible}
          seance={seanceSelected}
          setSeanceVisible={setSeanceVisible}
        />
      )}
    </>
  );
};
export default Seances;
