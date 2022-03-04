import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, DatePicker, Select, Alert } from "antd";
import "./Register.css";
import { NavLink, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Logo from "../../Assets/logo.svg";
import { registerUserApi } from "../../Services/UserService";
import useLocalStorage from "../../Hooks/useLocalStorage";

const { Option } = Select;

const Register = () => {
  const gouvernorats = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "La Manouba",
    "Le Kef",
    "Mahdia",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage("token", null);
  const history = useHistory();

  const register = async (data) => {
    setLoading(true);
    registerUserApi(data)
      .then(({ data }) => {
        setToken(data.token);
        history.push("/dashboard");
      })
      .then(() => setError(false))
      .catch((err) => {
        setToken(null);
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("erreur de serveur");
        }
        setLoading(false);
      });
  };

  const onFinish = (data) => {
    register(data);
  };

  useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, [token]);
  return (
    <div className="register">
      <Form
        name="normal_register"
        className="register-form"
        initialValues={{
          remember: true,
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
            <p>nom :</p>
            <Form.Item
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
            <p>Prénom :</p>
            <Form.Item
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
            <p>sexe :</p>
            <Form.Item
              name="sexe"
              rules={[
                {
                  required: true,
                  message: "sexe est requis",
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
            <p>email :</p>
            <Form.Item
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
            <p>gouvernorat :</p>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "gouvernorat est requis",
                },
              ]}
            >
              <Select defaultValue="gouvernorat">
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
            <p>mot de passe :</p>
            <Form.Item
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
            <p>confirmer mot de passe :</p>
            <Form.Item
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
