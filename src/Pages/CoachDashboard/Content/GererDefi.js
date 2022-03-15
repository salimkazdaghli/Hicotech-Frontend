import React from "react";
import { Select, Row, Col, Space, Button, Typography, Form } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { Title } = Typography;
const Profile = () => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i += 1) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const onFinish = () => {};
  const handleChange = () => {};

  return (
    <>
      <Title level={2}>Attribuer un défi à un joueur</Title>
      <br />
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row>
          <Col span={8} offset={1}>
            <Form.Item
              label="Veuillez sélectionner les joueurs :"
              name="joueurs"
              rules={[
                {
                  required: true,
                  message: "entrer le type du statistique!",
                },
              ]}
            >
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  maxTagCount="responsive"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={["a10", "c12"]}
                  onChange={handleChange}
                >
                  {children}
                </Select>
              </Space>
            </Form.Item>
          </Col>
          <Col span={8} offset={3}>
            <Form.Item
              label="Veuillez sélectionner le défi :"
              name="joueurs"
              rules={[
                {
                  required: true,
                  message: "entrer le type du statistique!",
                },
              ]}
            >
              <Select
                defaultValue="lucy"
                style={{ width: "100%" }}
                onChange={(v) => handleChange(v)}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="joueurs"
              rules={[
                {
                  required: true,
                  message: "entrer le type du statistique!",
                },
              ]}
            >
              <br />
              <p> </p>
              <Button
                style={{ marginLeft: "20px" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                icon={<SendOutlined />}
              >
                Envoyer
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Profile;
