import React, { useState } from "react";
import { Form, Input, Button, Row, Col, DatePicker, Select, Alert } from "antd";
import "./Register.css";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/logo.svg";
import { registerUserApi } from "../../Services/UserService";
import { updateInvitation } from "../../Services/InvitationService";
const { Option } = Select;
const Register = (props) => {
  const invi = props.invi ; 
  const user = invi ? invi.userData : null ;
  //console.log(user);
  const onFinish = (data) => {
    console.log(data);
    register(data);
  };
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
  const register = async (data) => {
    setLoading(true);
    data.role = invi.id ? "joueur" : "coach" ; 
    registerUserApi(data)
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
    updateInvitation(invi.id,{etat : "accepté"})
  };
  return (
    <>
      <div className="register">
        <Form
          name="normal_register"
          className="register-form"
          initialValues={{
            city : "gouvernorat" ,
            sexe :  "sexe" ,
            remember: true,
            email:  invi ? invi.email : "" ,
            firstName : user ? user.firstName : "",
            lastName : user ? user.lastName : ""
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
              <p>Nom :</p>
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
                <Select >
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
                    message: "email est requis",
                  },
                  {
                    type: "email",
                    message: "email n'est pas valide",
                  },
                ]}
              >
                <Input placeholder="email"  />
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
                <Select >
                  {gouvernorats.map((gouvernorat) => (
                    <Option value={gouvernorat}>{gouvernorat}</Option>
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
                    message:
                      "mot de passe doit comporter au moins 6 caractères",
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
              S'inscrire
            </Button>
            <div style={{ marginTop: "5px" }}>
              <NavLink exact to="/login">
                Vous avez déjà un compte?
              </NavLink>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
