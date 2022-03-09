/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { Typography, Table, Tag, Space, Modal, Alert } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getAllStatisticsApi,
  deleteStatisticsApi,
} from "../../../Services/StatisticService";

const MyStatistic = () => {
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statData, setStatData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { Title } = Typography;
  const getStatistic = (page) => {
    setLoading(true);
    getAllStatisticsApi(page)
      .then((res) => res.data)
      .then(({ statistic, totalpages, pageSize }) => {
        setStatData(statistic);
        setTotalPages(totalpages);
        setPageSize(pageSize);
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
  const handleDelete = (id) => {
    Modal.confirm({
      title: "êtes-vous sûr de supprimer cette statistique ?",
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",

      onOk: () => {
        setLoading(true);
        deleteStatisticsApi(id)
          .then(({ data }) => {
            setAlertMessage(data.message);
            setStatData((oldStats) =>
              oldStats.filter((stat) => stat._id !== data.statistique._id)
            );
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
          })
          .catch((err) => console.log(err));
        setLoading(false);
      },
    });
  };
  const handleEdit = () => {};

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
      render: (record) => (
        <>
          <EditOutlined
            onClick={() => {
              handleEdit(record._id);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              handleDelete(record._id);
            }}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      {showAlert && (
        <Space
          align="center"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Alert message={alertMessage} type="success" showIcon closable />
        </Space>
      )}
      <Title>Mes Statistiques</Title>
      <Table
        columns={columns}
        dataSource={statData}
        loading={loading}
        pagination={{
          pageSize,
          total: totalPages,
          onChange: (page) => getStatistic(page),
        }}
      />
    </>
  );
};

export default MyStatistic;
