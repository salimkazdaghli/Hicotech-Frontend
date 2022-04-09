import React, { useState, useEffect } from "react";
import { Row, Button, DatePicker, Space, Select } from "antd";

import { getAllSeanceApi } from "../../../Services/seanceService";
import SeanceCard from "./SeanceCard";
import SeanceForm from "./SeanceForm";
import authService from "../../../Services/authService";
import { getAllStatisticsApi } from "../../../Services/StatisticService";

const { Option } = Select;
const { RangePicker } = DatePicker;
const Seances = () => {
  const [loading, setLoading] = useState(false);
  const [seances, setSeances] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seanceSelected, setSeanceSelected] = useState({});
  const [statistics, setStatistics] = useState([]);

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

  async function getStatistics() {
    await getAllStatisticsApi(currentUser.discipline)
      .then((response) => {
        setStatistics(response.data.statistic);
        setLoading(true);
      })
      .catch(() => {});
  }
  useEffect(() => {
    getSeances();
    getStatistics();
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        Nouvelle séance
      </Button>
      <Space style={{ marginBottom: 16 }}>
        <Button>Tous</Button>
        <Button>Aujourdhui</Button>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
        <Space direction="vertical" size={10}>
          <RangePicker showTime />
        </Space>
      </Space>

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
              />
            ))}
          </Row>
        )}
        ;
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
          statistics={statistics}
        />
      )}
    </>
  );
};
export default Seances;
