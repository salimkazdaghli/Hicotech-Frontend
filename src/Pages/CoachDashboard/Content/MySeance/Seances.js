import React, { useState, useEffect } from "react";
import {
  Row,
  Button,
  Spin,
  Space,
  Col,
  DatePicker,
  Input,
  Select,
  Table,
} from "antd";
import { getAllSeanceApi } from "../../../../Services/SeancesService";
import SeanceForm from "./SeanceForm";
import Seance from "./seance";
import authService from "../../../../Services/authService";

const { RangePicker } = DatePicker;
const { Option } = Select;
const Seances = () => {
  const [loading, setLoading] = useState(false);
  const [seances, setSeances] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seanceSelected, setSeanceSelected] = useState({});
  const [isSeanceVisible, setSeanceVisible] = useState(false);
  const [lieux, setLieux] = useState(["tunis", "Beja"]);
  const [joueurs, setJoueurs] = useState(["test1", "test2"]);

  const currentUser = authService.getCurrentUser();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Joueur",
      dataIndex: "joueur",
      key: "joueur",
    },
    {
      title: "Competance",
      dataIndex: "competences",
      key: "competences",
    },
    {
      title: "Date",
      dataIndex: "jour",
      key: "jour",
    },
    {
      title: "Programme",
      dataIndex: "programme",
      key: "programme",
    },
    {
      title: "Statistique",
      key: "statistique",
      dataIndex: "statistique",
    },
    {
      title: "Lieu",
      key: "lieu",
      dataIndex: "lieu",
    },
  ];

  const data2 = [
    {
      key: "1",
      name: "S1",
      joueur: "test2",
      competences: "compet 4",
      statistique: "stat 2",
      jour: "09/04/2022",
      lieu: "tunis",
      programme: "prog 2",
    },
    {
      key: "2",
      name: "S2",
      joueur: "test2",
      competences: "compet 4",
      statistique: "stat 2",
      jour: "29/04/2022",
      lieu: "tunis",
      programme: "prog 3",
    },
    {
      key: "3",
      name: "S3",
      joueur: "test2",
      competences: "compet 4",
      statistique: "stat 2",
      jour: "09/04/2022",
      lieu: "Beja",
      programme: "prog 2",
    },
    {
      key: "4",
      name: "S3",
      joueur: "test2",
      competences: "compet 4",
      statistique: "stat 2",
      jour: "10/04/2022",
      lieu: "Beja",
      programme: "prog 2",
    },
  ];
  const [data, setData] = useState(data2);

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
  const onJoueurChange = (value) => {
    const dataChange = data2.filter((seance) => seance.joueur === value);
    setData(dataChange);
  };
  const onLieuxChange = (value) => {
    const dataChange = data2.filter((seance) => seance.lieu === value);
    setData(dataChange);
  };

  const onDateNowChange = (value) => {
    const dataChange = data2.filter((seance) => seance.jour === value);
    setData(dataChange);
  };
  useEffect(() => {
    getSeances();
  }, []);
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button key={date} onClick={onDateNowChange}>
          {date}
        </Button>
        <RangePicker />
        <Select
          showSearch
          onChange={onJoueurChange}
          placeholder="Filter par joueur "
        >
          {joueurs.map((joueur) => (
            <Option key={joueur}>{joueur}</Option>
          ))}
        </Select>
        <Select
          showSearch
          onChange={onLieuxChange}
          placeholder="Filter par Lieu "
        >
          {lieux.map((lieu) => (
            <Option key={lieu}>{lieu}</Option>
          ))}
        </Select>
      </Space>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        Nouvelle séance
      </Button>
      <div className="site-card-wrapper">
        {loading && <Table columns={columns} dataSource={data} />}
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
