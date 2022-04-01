import React, { useState, useEffect } from "react";
import { Tabs, Form, Select, Empty } from "antd";
import { v4 as uuidv4 } from "uuid";
import Statistics from "./Statistics";
import Skills from "./Skills";
import Alerts from "./Alerts";
import userService from "../../../Services/userService";
import auth from "../../../Services/authService";
import { getAllStatisticsApi } from "../../../Services/StatisticService";

const { Option } = Select;
const { TabPane } = Tabs;

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const PlayerInfo = () => {
  const [form] = Form.useForm();
  const [statisticTypes, setStatisticTypes] = useState([]);
  const [statisticData, setStatisticData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(undefined);

  const FilterStats = (stat) => {
    // filter session data to get statistics
    // const statData = statisticData.filter((elm)=> elm.statistics.name).map()
    // setStatisticData(statData)
  };

  useEffect(() => {
    // fetch statistics and skills and alerts from session (using coach and player ids)
    if (selectedPlayer) {
      if (auth.getCurrentUser()) {
        getAllStatisticsApi(auth.getCurrentUser().discipline)
          .then(({ data }) => {
            setStatisticTypes(data.statistic);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [selectedPlayer]);

  const onFinish = () => {};
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const Joueurs = [
    "Hassene",
    "Marouene",
    "Talel",
    "Mohsen",
    "Amel",
    "Karim",
    "Nizar",
  ];
  return (
    <Form
      form={form}
      autoComplete="off"
      name="Afficher Info Joueur"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={
          <Form.Item
            style={{ margin: 0 }}
            name="player"
            label="Sélectionnez joueur :"
            rules={[
              {
                required: true,
                message: "Veuiller selectionner le joueur",
              },
            ]}
          >
            <Select placeholder="Joueur" onChange={(v) => setSelectedPlayer(v)}>
              {Joueurs.map((joueur) => (
                <Option key={uuidv4()} value={joueur}>
                  {joueur}
                </Option>
              ))}
            </Select>
          </Form.Item>
        }
      >
        <TabPane tab="Statistiques" key="1">
          {selectedPlayer ? (
            <>
              <Form.Item
                style={{ maxWidth: "20%" }}
                name="Statistic"
                label="Statistique :"
                rules={[
                  {
                    required: true,
                    message: "Veuiller selectionner une statistique",
                  },
                ]}
              >
                <Select placeholder="Statestique" onChange={FilterStats}>
                  {statisticTypes.map((stat) => (
                    <Option key={uuidv4()} value={stat.statisticName}>
                      {stat.statisticName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Statistics data={data} />
            </>
          ) : (
            <Empty description="Aucune Donnée" />
          )}
        </TabPane>
        <TabPane tab="Compétences" key="2">
          {selectedPlayer ? <Skills /> : <Empty description="Aucune Donnée" />}
        </TabPane>
        <TabPane tab="Alerts" key="3">
          {selectedPlayer ? <Alerts /> : <Empty description="Aucune Donnée" />}
        </TabPane>
      </Tabs>
    </Form>
  );
};

export default PlayerInfo;
