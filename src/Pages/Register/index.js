/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, DatePicker, Select, Alert } from "antd";
import "./Register.css";
import { NavLink, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Logo from "../../Assets/logo.svg";
import auth from "../../Services/authService";
import useLocalStorage from "../../Hooks/useLocalStorage";
import gouvernorats from "../../utils/gouvernorats";

const { Option } = Select;

const Register = (props, { location }) => {
  const { invi } = props;
  const user = invi ? invi.userData : null;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useLocalStorage("token", null);
  const history = useHistory();

  const register = async (data) => {
    setLoading(true);
    auth
      .registerUserApi(data)
      .then(({ data }) => {
        setToken(data.token);
        setError(false);
      })
      .catch((err) => {
        setToken(null);
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("erreur de serveur");
        }
      })
      .finally(() => setLoading(false));
  };

  const onFinish = (data) => {
    register(data);
  };
  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      history.push(
        location?.state
          ? location.state?.from?.pathname
          : currentUser.role && currentUser.role === "coach"
          ? "/dashboard"
          : "/test"
      );
    }
  }, [token]);
  return (
    <div className="register">
      <Form
        layout="vertical"
        name="normal_register"
        className="register-form"
        initialValues={{
          remember: true,
          email: invi ? invi.email : "",
          firstName: user ? user.firstName : "",
          lastName: user ? user.lastName : "",
        }}
        onFinish={onFinish}
      >
        {error && <Alert message={error} type="error" showIcon closable />}
        <br />
        <div className="logo-center">
          <img src={Logo} height={130} width={130} alt="" />
        </div>
        <Row>
          <Col span={11}>
            <Form.Item
              label="nom :"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "nom est requis",
                },
              ]}
            >
              <Input placeholder="nom" />
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              label="Prénom :"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "prénom est requis",
                },
              ]}
            >
              <Input placeholder="Prénom" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Form.Item
              label="sexe :"
              name="sexe"
              rules={[
                {
                  required: true,
                  message: "sexe est requis",
                },
              ]}
            >
              <Select placeholder="sexe">
                <Option value="Homme">Homme</Option>
                <Option value="Femme">Femme</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              label="date de naissance :"
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "date de naissance est requis",
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="date"
                style={{ display: "flex" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Form.Item
              label="email :"
              name="email"
              rules={[
                {
                  required: true,
                  message: "email est requis",
                },
                {
                  type: "email",
                  message: "email n'est pas valide",
                },
              ]}
            >
              <Input placeholder="email" />
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              label="gouvernorat :"
              name="city"
              rules={[
                {
                  required: true,
                  message: "gouvernorat est requis",
                },
              ]}
            >
              <Select placeholder="gouvernorat">
                {gouvernorats.map((gouvernorat) => (
                  <Option key={uuidv4()} value={gouvernorat}>
                    {gouvernorat}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Form.Item
              label="mot de passe :"
              name="password"
              rules={[
                {
                  required: true,
                  message: "mot de passe est requis",
                },
                {
                  min: 6,
                  message: "mot de passe doit comporter au moins 6 caractères",
                },
              ]}
            >
              <Input.Password type="password" placeholder="mot de passe" />
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              label="confirmer mot de passe :"
              name="confirm"
              rules={[
                {
                  required: true,
                  message: "mot de passe est requis",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "mot de passe et la confirmation ne correspondent pas!"
                      )
                    );
                  },
                }),
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
            loading={loading}
          >
            S`inscrire
          </Button>
          <div style={{ marginTop: "5px" }}>
            <NavLink exact to="/login">
              Vous avez déjà un compte?
            </NavLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
