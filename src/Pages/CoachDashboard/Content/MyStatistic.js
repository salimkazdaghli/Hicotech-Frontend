/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { Typography, Table, Tag, Space } from "antd";
import { getAllStatisticsApi } from "../../../Services/StatisticService";

const MyStatistic = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statData, setStatData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { Title } = Typography;
  const getStatistic = async () => {
    setLoading(true);
    getAllStatisticsApi()
      .then((res) => res.data)
      .then(({ statistic, totalpages }) => {
        setStatData(statistic);
        setTotalPages(totalpages);
        console.log(totalpages);
        setLoading(false);
      })
      .then(() => setError(false))
      .catch((err) => {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("erreur de serveur");
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    getStatistic();
  }, []);

  const data = [
    {
      key: "1",
      name: "John Brown",
      type: "accélération",
      unit: "m/s",
      description: "ceci pour mesurer l'accélération lors d'un course",
      max: true,
      visible: true,
    },
    {
      key: "2",
      name: "vitesse",
      type: "poid",
      unit: "kg",
      description: "ceci pour mesurer le poid d'un joueur",
      max: false,
      visible: false,
    },
  ];
  const columns = [
    {
      title: "Nom Statistique",
      dataIndex: "statisticName",
      key: "statisticName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Unité de mesure",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Nature Statistique",
      dataIndex: "max",
      key: "max",
      render: (max) => (
        <Tag color={max ? "green" : "red"}>
          {max ? "maximiser" : "minimiser"}
        </Tag>
      ),
    },
    {
      title: "Visible au joueur",
      dataIndex: "visible",
      key: "visible",
      render: (text) => (
        <Space size="small">{text ? "visible" : "non visible"}</Space>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Modifier</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title>Mes Statistiques</Title>
      <Table
        columns={columns}
        dataSource={statData}
        loading={loading}
        pagination={{
          pageSize: 3,
          total: totalPages,
          onChange: (page) => {
            console.log(page);
          },
        }}
      />
    </>
  );
};

export default MyStatistic;
