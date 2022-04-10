import { useState } from "react";
import { PageHeader, Tabs, Statistic, Row, Col, Alert } from "antd";
import { useLocation } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import UpdatePlayerProfile from "./UpdatePlayerProfile";
import DisplayStats from "../DisplayStats/DisplayStats";
import "./ModifyPlayer.css";

const ModifyPlayer = () => {
  const location = useLocation();
  const user = location.state;
  const [player, setPlayer] = useState(user);
  const [alert, setAlert] = useState(null);
  const { TabPane } = Tabs;
  return (
    <>
      <Title>Modifier Joueur</Title>
      {alert && (
        <Row justify="center">
          <Col>
            <Alert
              message={alert.message}
              type={alert.type}
              showIcon
              closable
            />
          </Col>
        </Row>
      )}
      <PageHeader
        onBack={() => window.history.back()}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
        title={`${player.firstName} ${player.lastName}`}
        // tags={
        //   <Tag color={player.active ? "green" : "red"}>
        //     {player.active ? "active" : "pas active"}
        //   </Tag>
        // }
        extra={[
          <Statistic
            title="Status"
            value={player.active ? "active" : "pas active"}
            valueStyle={
              player.active ? { color: "#3f8600" } : { color: "#cc0000" }
            }
            style={{ marginRight: "100px" }}
          />,
          <Statistic
            title="Prix Séance"
            value={player.sessionPrice ? `${player.sessionPrice} TND` : "--"}
            valueStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{
              marginRight: "100px",
            }}
          />,
        ]}
      >
        {/* <Row>
        <Title>hello</Title>
      </Row> */}
      </PageHeader>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Modifier information" key="1">
          <UpdatePlayerProfile
            user={player}
            setPlayer={setPlayer}
            setAlert={setAlert}
          />
        </TabPane>
        <TabPane tab="Les Buts à atteindre" key="2">
          <DisplayStats player={player} setAlert={setAlert} />
        </TabPane>
      </Tabs>
    </>
  );
};
export default ModifyPlayer;
