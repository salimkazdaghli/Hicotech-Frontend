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
  Row,
  Col,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  getAllStatisticsApi,
  deleteStatisticsApi,
  updateStatisticsApi,
  addStatisticApi,
} from "../../../../Services/StatisticService";
// import {
//   setAlert,
//   alertMessage,
//   showAlert,
// } from "../../../utils/alertComponent";

const { TextArea } = Input;
const MyStatistic = () => {
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statData, setStatData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [editingRow, setEditingRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newStatistic, setNewStatistic] = useState({
    statisticName: "",
    statisticType: "",
    unit: "",
    description: "",
  });
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
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
  const resetStatForm = () => {
    form2.resetFields();
    setNewStatistic({
      statisticName: "",
      statisticType: "",
      unit: "",
      description: "",
    });
  };
  const onAddSTats = () => {
    setConfirmLoading(true);
    setLoading(true);
    addStatisticApi(newStatistic)
      .then(({ data: { message, data } }) => {
        setConfirmLoading(false);
        // setStatData(...statData, data);
        setShowModal(!showModal);
        resetStatForm();
        setStatData((pre) => [data, ...pre]);
        setLoading(false);
        setAlert(message, 2000);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setConfirmLoading(false);
          setShowModal(!showModal);
          setLoading(false);
          setAlert(err.response.data, 2000);
        }
      });
  };
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
          .catch((err) => console.log(err));
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
                <Button
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  style={{ marginBottom: "28px" }}
                >
                  enregistrer
                </Button>
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
    const updatedDataSource = [...statData];
    updatedDataSource.splice(editingRow, 1, { ...values, _id: editingRow });
    setLoading(true);
    updateStatisticsApi(editingRow, { ...values }).then(({ data }) => {
      console.log(
        ` le message est${data.message} , le stat est : ${data.stat}`
      );
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
        style={{ marginButton: "10px" }}
        onClick={() => setShowModal(!showModal)}
      >
        Ajouter Statistique
      </Button>
      <Modal
        title="Ajouter une nouvelle statistique"
        visible={showModal}
        okText="Ajouter"
        cancelText="Annuler"
        confirmLoading={confirmLoading}
        okButtonProps={{
          form: "statistic-editor-form",
          key: "ok",
          htmlType: "submit",
        }}
        onCancel={() => {
          setShowModal(!showModal);
          resetStatForm();
        }}
        onOk={() => form2.validateFields()}
        centered
        width={700}
      >
        <Form
          id="statistic-editor-form"
          initialValues={{
            statisticName: "",
            statisticType: "",
            unit: "",
            description: "",
          }}
          form={form2}
          onFinish={onAddSTats}
        >
          {/* row one */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Nom statistique"
                rules={[
                  {
                    required: true,
                    message: "entrer le nom du statistique!",
                  },
                ]}
              >
                <Input
                  placeholder="Nom statistique"
                  onChange={(e) => {
                    setNewStatistic((pre) => ({
                      ...pre,
                      statisticName: e.target.value,
                    }));
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="type"
                rules={[
                  {
                    required: true,
                    message: "entrer le type du statistique!",
                  },
                ]}
              >
                <Select
                  placeholder="type statistique"
                  onChange={(value) =>
                    setNewStatistic((prev) => ({
                      ...prev,
                      statisticType: value,
                    }))
                  }
                >
                  <Select.Option key="compteur" value="compteur">
                    compteur
                  </Select.Option>
                  <Select.Option key="timer" value="timer">
                    timer
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* row two */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="l'unité">
                <Input
                  placeholder="l'unité de mesure"
                  rules={[
                    {
                      required: true,
                      message: "entrer l'unité du statistique!",
                    },
                  ]}
                  onChange={(e) => {
                    setNewStatistic((pre) => ({
                      ...pre,
                      unit: e.target.value,
                    }));
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Lien">
                <Input
                  rules={[
                    {
                      required: true,
                      message: "entrer le lien associé au statistique!",
                    },
                  ]}
                  placeholder="lien associé à cette statistique"
                  onChange={(e) => {
                    setNewStatistic((pre) => ({
                      ...pre,
                      lien: e.target.value,
                    }));
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description">
                <TextArea
                  placeholder="description du statistique"
                  autoSize={{ minRows: 2, maxRows: 3 }}
                  onChange={(e) => {
                    setNewStatistic((pre) => ({
                      ...pre,
                      description: e.target.value,
                    }));
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Form form={form} onFinish={onFinish}>
        <Table
          columns={columns}
          dataSource={statData}
          loading={loading}
          pagination={{
            pageSize,
            total: totalPages,
            onChange: (page) => getStatistic(page),
          }}
          rowKey={(record) => record._id}
        />
      </Form>
    </>
  );
};

export default MyStatistic;
