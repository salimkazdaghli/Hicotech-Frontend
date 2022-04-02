import {
  ColumnHeightOutlined,
  DashboardOutlined,
  MailOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import gouvernorats from "../../../../../utils/gouvernorats";

const UpdatePlayerProfile = ({ user }) => {
  const [data] = useState(user);
  return (
    <Form layout="vertical" name="modify-player">
      <Row
        gutter={[16, 16]}
        style={{
          backgroundColor: "#fcfcfc",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col span={9}>
          <Form.Item
            initialValue={data.firstName}
            label="Nom joueur"
            name="firstName"
            rules={[
              {
                required: true,
                message: "entrer le nom du joueur!",
              },
            ]}
          >
            <Input
              placeholder="Entrer le nom du joueur"
              prefix={<UserOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            initialValue={data.Lastname}
            label="Prénom joueur"
            name="lastName"
            rules={[
              {
                required: true,
                message: "entrer le prénom du joueur!",
              },
            ]}
          >
            <Input placeholder="default size" prefix={<SolutionOutlined />} />
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            initialValue={data.sexe}
            label="sexe :"
            name=""
            rules={[
              {
                required: true,
                message: "sexe est requis",
              },
            ]}
          >
            <Select placeholder="sexe du joueur">
              <Select.Option value="Homme">Homme</Select.Option>
              <Select.Option value="Femme">Femme</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            label="date de naissance :"
            name="dateOfBirth"
            initialValue={data.dateOfBirth}
            rules={[
              {
                required: true,
                message: "date de naissance est requis",
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="date de naissance"
              style={{ display: "flex" }}
            />
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            initialValue={data.email}
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
            <Input
              prefix={<MailOutlined />}
              placeholder="entrer l'email du joueur"
            />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            initialValue={data.city}
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
                <Select.Option key={uuidv4()} value={gouvernorat}>
                  {gouvernorat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            label="Hauteur"
            initialValue={data.height}
            name="height"
            rules={[
              {
                required: true,
                message: "entrer la hauteur du joueur!",
              },
            ]}
          >
            <InputNumber
              placeholder=" Poids du joueur  "
              style={{ width: "600px" }}
              prefix={<ColumnHeightOutlined />}
              addonAfter="Cm"
            />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            label="poids"
            initialValue={data.weight}
            name="weight"
            rules={[
              {
                required: true,
                message: "entrer le poids du joueur!",
              },
            ]}
          >
            <InputNumber
              placeholder=" Poids du joueur  "
              style={{ width: "600px" }}
              prefix={<DashboardOutlined />}
              addonAfter="Kg"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Enregistrer
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdatePlayerProfile;
