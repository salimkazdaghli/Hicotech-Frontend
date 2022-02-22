import React from "react";
import { Form, Input, Button, Row, Col, DatePicker, Select } from "antd";
import "./Register.css";

const { Option } = Select;

const index = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const validateMessages = {
    required: "${label} est requis!",
    types: {
      email: "${label} n'est pas valide",
    },
  };
  return (
    <>
      <div className="register">
        <Form
          name="normal_register"
          className="register-form"
          initialValues={{
            remember: true,
          }}
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <h1 className="register-label">Inscription</h1>
          <br />
          <Row>
            <Col span={11}>
              <p>nom :</p>
              <Form.Item
                name="nom"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="nom" />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <p>Prénom :</p>
              <Form.Item
                name="prénom"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Prénom" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <p>sexe :</p>
              <Form.Item
                name="sexe"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select defaultValue="sexe">
                  <Option value="Homme">Homme</Option>
                  <Option value="Femme">Femme</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <p>date de naissance :</p>
              <Form.Item
                name="date de naissance"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  format={"DD/MM/YYYY"}
                  placeholder="date"
                  style={{ display: "flex" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <p>email :</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="email" />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <p>mot de passe :</p>
              <Form.Item
                name="mot de passe"
                rules={[
                  {
                    required: true,
                  },
                  {
                    min: 6,
                    message:
                      "mot de passe doit comporter au moins 6 caractères",
                  },
                ]}
              >
                <Input.Password type="password" placeholder="mot de passe" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              S'inscrire
            </Button>
            <div style={{ marginTop: "5px" }}>
              <a href="">Vous avez déjà un compte?</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default index;
