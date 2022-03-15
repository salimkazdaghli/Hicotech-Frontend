/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import {
  Row,
  Table,
  Col,
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
  CheckOutlined,
  EnvironmentOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import trainingGround from "../../../Services/trainingGround";
import gouvernorats from "../../../utils/gouvernorats";
import authService from "../../../Services/authService";
import Location from "../../../Components/Map";
import AddTrainingGround from "./AddTrainingGround";
import "./TrainingGround.css";

const ManageTrainingGround = () => {
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [alert, setAlert] = useState(null);
  const [editing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      trainingGround
        .getTrainingGroudsApi(authService.getCurrentUser().id)
        .then(({ data }) => {
          setDataSource(() => data.data);
        })
        .catch((err) => {
          if (err && err.response && err.response.data.error) {
            setAlert(err.response.data.error);
          } else {
            setAlert({ type: "error", message: "erreur de serveur" });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [refetch]);
  const onFinish = (userinputs) => {
    setLoading(true);
    const data = { ...userinputs, createdBy: authService.getCurrentUser().id };
    trainingGround
      .updateTrainingGroudApi(rowToEdit, data)
      .then(({ data }) => {
        setAlert(data);
        setRowToEdit(null);
        setIsEditing(false);
        setRefetch((prev) => prev + 1);
      })
      .catch((err) => {
        if (err && err.response && err.response.data.error) {
          setAlert(err.response.data.error);
        } else {
          setAlert({ type: "error", message: "erreur de serveur" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "êtes-vous sûr de supprimer ce lieu ?",
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",

      onOk: () => {
        setLoading(true);
        trainingGround
          .deleteTrainingGroudApi(id)
          .then(({ data }) => {
            setAlert(data);
            setRefetch((prev) => prev + 1);
          })
          .catch((err) => {
            if (err && err.response && err.response.data.error) {
              setAlert(err.response.data.error);
            } else {
              setAlert({ type: "error", message: "erreur de serveur" });
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };
  const columns = [
    {
      title: "Gouvernaurat",
      dataIndex: "city",
      key: uuidv4(),
      render: (text, record) => {
        if (rowToEdit === record._id)
          return (
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "entrer le type du statistique!",
                },
              ]}
            >
              <Select defaultValue={text}>
                {gouvernorats.map((gouvernorat) => (
                  <Select.Option key={uuidv4()} value={gouvernorat}>
                    {gouvernorat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Lieu d'entrainement",
      dataIndex: "address",
      key: uuidv4(),
      render: (text, record) => {
        if (rowToEdit === record._id)
          return (
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "lieu d'entrainement est requis",
                },
              ]}
            >
              <Input defaultValue={text} placeholder="lieu d'entrainement" />
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Localisation",
      dataIndex: "coordinates",
      key: uuidv4(),
      render: (text, record) => {
        if (rowToEdit === record._id)
          return (
            <Form.Item
              name="coordinates"
              rules={[
                {
                  required: true,
                  message: "Localisation est requis",
                },
              ]}
            >
              <Button
                onClick={() => setIsModalVisible(true)}
                icon={<EnvironmentOutlined />}
              >
                Ouvrir la carte
              </Button>

              <Location
                form={form}
                initialPosition={form.getFieldValue("coordinates")}
                visible={isModalVisible}
                setvisibility={setIsModalVisible}
              />
            </Form.Item>
          );
        return (
          <Button disabled icon={<EnvironmentOutlined />}>
            Ouvrir la carte
          </Button>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "12%",
      render: (_, record) => {
        if (rowToEdit === record._id) {
          return (
            <>
              <Button
                danger
                shape="circle"
                className="redHoverColor"
                icon={<CloseOutlined />}
                onClick={() => {
                  setRowToEdit(null);
                  setIsEditing(false);
                }}
                style={{
                  marginRight: "10px",
                }}
              />
              <Button
                type="link"
                shape="circle"
                icon={<CheckOutlined />}
                htmlType="submit"
                style={{ color: "green", borderColor: "green" }}
              />
            </>
          );
        }
        return (
          <>
            <Button
              type="primary"
              ghost
              shape="circle"
              disabled={editing}
              icon={<EditOutlined />}
              onClick={() => {
                form.setFieldsValue(record);
                setRowToEdit(record._id);
                setIsEditing(true);
              }}
            />
            <Button
              danger
              shape="circle"
              className="redHoverColor"
              disabled={editing}
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelete(record._id);
              }}
              style={{ marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
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
      <AddTrainingGround setAlert={setAlert} setRefrech={setRefetch} />
      <Form form={form} onFinish={onFinish}>
        <Table
          tableLayout="fixed"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{
            pageSize: 5,
          }}
        />
      </Form>
    </>
  );
};

export default ManageTrainingGround;
