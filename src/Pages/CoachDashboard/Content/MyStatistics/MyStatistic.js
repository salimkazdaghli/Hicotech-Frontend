/* eslint-disable import/named */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  Space,
  Modal,
  Alert,
  Form,
  Input,
  Button,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  getAllStatisticsApi,
  deleteStatisticsApi,
  updateStatisticsApi,
} from "../../../../Services/StatisticService";
import StatisticFormField from "./StatisticFormField";
// import {
//   setAlert,
//   alertMessage,
//   showAlert,
// } from "../../../utils/alertComponent";

const { TextArea } = Input;
const MyStatistic = () => {
  const [, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statData, setStatData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form] = Form.useForm();

  const { Title } = Typography;
  const setAlert = (msg, duration) => {
    setAlertMessage(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  };
  const getStatistic = (page) => {
    setLoading(true);
    getAllStatisticsApi(page)
      .then((res) => res.data)
      .then(({ statistic }) => {
        setStatData(statistic);
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

  function handleDelete(id) {
    Modal.confirm({
      title: "êtes-vous sûr de supprimer cette statistique ?",
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",

      onOk: () => {
        setLoading(true);
        deleteStatisticsApi(id)
          .then(({ data }) => {
            setStatData((oldStats) =>
              oldStats.filter((stat) => stat._id !== data.statistique._id)
            );
            setAlert(data.message, 2000);
          })
          .catch();
        setTimeout(() => {
          setLoading(false);
        }, 700);
      },
    });
  }

  const columns = [
    {
      title: "Nom Statistique",
      dataIndex: "statisticName",
      key: "statisticName",
      render: (text, record) => {
        if (editingRow === record._id)
          return (
            <Form.Item
              name="statisticName"
              rules={[
                {
                  required: true,
                  message: "entrer le nom du statistique!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Type",
      dataIndex: "statisticType",
      key: "statisticType",
      render: (text, record) => {
        if (editingRow === record._id)
          return (
            <Form.Item
              name="statisticType"
              rules={[
                {
                  required: true,
                  message: "entrer le type du statistique!",
                },
              ]}
            >
              <Select defaultValue={text}>
                <Select.Option value="compteur">Compteur</Select.Option>
                <Select.Option value="timer">Timer</Select.Option>
              </Select>
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Unité de mesure",
      dataIndex: "unit",
      key: "unit",
      render: (text, record) => {
        if (editingRow === record._id)
          return (
            <Form.Item
              name="unit"
              rules={[
                {
                  required: true,
                  message: "entrer l'unité du statistique!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "45%",
      render: (text, record) => {
        if (editingRow === record._id)
          return (
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "entrer la description du statistique!",
                },
              ]}
            >
              <TextArea
                placeholder="description du statistique"
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (editingRow === record._id)
          return (
            <>
              {!editingRow && (
                <EditOutlined
                  type="link"
                  onClick={() => {
                    setEditingRow(record._id);
                    form.setFieldsValue({
                      _id: record._id,
                      statisticName: record.statisticName,
                      statisticType: record.statisticType,
                      unit: record.unit,
                      description: record.description,
                      max: record.max,
                    });
                  }}
                  style={{ fontSize: "25px" }}
                />
              )}

              {editingRow ? (
                <div>
                  <Button
                    type="link"
                    icon={<CheckCircleOutlined />}
                    htmlType="submit"
                    style={{ marginBottom: "10px" }}
                  />
                  <CloseCircleOutlined
                    color="red"
                    onClick={() => setEditingRow(null)}
                    style={{
                      color: "red",
                      fontSize: "16px",
                    }}
                  />
                </div>
              ) : (
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(record._id);
                  }}
                  style={{ color: "red", marginLeft: 12, fontSize: "25px" }}
                />
              )}
            </>
          );

        return (
          <>
            <EditOutlined
              onClick={() => {
                setEditingRow(record._id);
                form.setFieldsValue({
                  statisticName: record.statisticName,
                  statisticType: record.statisticType,
                  unit: record.unit,
                  description: record.description,
                  max: record.max,
                });
              }}
            />
            <DeleteOutlined
              onClick={() => {
                handleDelete(record._id);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const onFinish = (values) => {
    const updatedDataSource = statData.map((el) => {
      if (el._id === editingRow) return { _id: editingRow, ...values };
      return { ...el };
    });
    setLoading(true);
    updateStatisticsApi(editingRow, { ...values }).then(({ data }) => {
      setEditingRow(null);
      setStatData(updatedDataSource);
      setLoading(false);
      setAlert(data.message, 2000);
    });
  };
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
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{ marginBottom: "18px" }}
        onClick={() => setShowModal(!showModal)}
      >
        Ajouter Statistique
      </Button>
      <StatisticFormField
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        statData={statData}
        setStatData={setStatData}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
      />
      <Form form={form} onFinish={onFinish}>
        <Table
          tableLayout="fixed"
          columns={columns}
          dataSource={statData}
          loading={loading}
          pagination={{
            pageSize: 5,
          }}
          rowKey={(record) => record._id}
        />
      </Form>
    </>
  );
};

export default MyStatistic;
