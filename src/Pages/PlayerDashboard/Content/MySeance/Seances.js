import React, { useState, useEffect } from "react";
import { Typography, Tabs, Row, Col, Spin, Space } from "antd";
import moment from "moment";
import {
  getSeancePlayerApi,
  getAllSeanceApi,
} from "../../../../Services/SeancesService";
import SeanceCard from "./SeanceCard";
import authService from "../../../../Services/authService";

const { TabPane } = Tabs;
const { Title } = Typography;

const Seances = () => {
  const [loading, setLoading] = useState(false);
  const [seances, setSeances] = useState({});
  const currentUser = authService.getCurrentUser();
  const [key, setKey] = useState("1");

  async function getSeances() {
    setLoading(false);
    await getAllSeanceApi({ player: currentUser.id })
      .then((response) => {
        setSeances(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }
  async function getSeancesByDate(data) {
    setLoading(false);
    await getSeancePlayerApi(currentUser.id, data)
      .then((response) => {
        setSeances(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getSeances();
  }, []);
  function callback(key) {
    if (key === "2") {
      // console.log(new Date());
      setKey("2");
      // console.log(moment(new Date).format("yyyy-MM-DDT23:59:59"));
      getSeancesByDate({
        from: moment(new Date()).format("yyyy-MM-DDT00:00:00"),
        to: moment(new Date()).format("yyyy-MM-DDT23:59:59"),
      });
    } else if (key === "1") {
      setKey("1");
      getSeances({});
    }
  }
  return (
    <>
      <Title level={2}>les séances :</Title>
      {loading && (
        <Tabs defaultActiveKey={key} onChange={callback}>
          <TabPane tab="Toutes les séances " key="1">
            <div className="site-card-wrapper">
              <Row gutter={16}>
                {seances.map((seance) => (
                  <SeanceCard
                    seance={seance}
                    key={seance._id}
                    loading={loading}
                  />
                ))}
              </Row>
            </div>
          </TabPane>

          <TabPane tab="les séances D`aujourdui " key="2">
            <div className="site-card-wrapper">
              <Row gutter={16}>
                {seances.map((seance) => (
                  <SeanceCard
                    seance={seance}
                    key={seance._id}
                    loading={loading}
                  />
                ))}
              </Row>
            </div>
          </TabPane>

          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
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
    </>
  );
};

export default Seances;
