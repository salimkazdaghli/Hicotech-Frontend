import React, { useState } from "react";
import "./Login.css";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/logo.svg";
import { loginUserApi } from "../../Services/UserService";

const Login = () => {
  const onFinish = (data) => {
    login(data);
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    loginUserApi(data)
      .then(() => {
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
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
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
          <Input
            size="large"
            prefix={
              <MailOutlined
                className="site-form-item-icon"
                style={{ marginRight: "5px" }}
              />
            }
            placeholder="email"
          />
        </Form.Item>
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
          <Input.Password
            size="large"
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ marginRight: "5px" }}
              />
            }
            type="password"
            placeholder="mot de passe"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          <div style={{ marginTop: "5px" }}>
            Ou
            <NavLink exact to="/register">
              {" "}
              Inscrivez-vous!
            </NavLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
