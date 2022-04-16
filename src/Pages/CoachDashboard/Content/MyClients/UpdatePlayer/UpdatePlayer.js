import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Select } from "antd";
import Title from "antd/lib/typography/Title";
import DisplayInfo from "./DisplayInfo";

const UpdatePlayer = () => (
  <>
    <Title level={2}>Modifier Joueur</Title>
    <Form
      layout="vertical"
      style={{
        backgroundColor: "#f6f6f6",
        paddingTop: "11px",
        borderRadius: "8px",
        background: "#fbfbfb",
        border: "1px solid #d9d9d9",
      }}
    >
      <Row>
        <Col span={8} offset={1}>
          <Form.Item label="Selectionner joueur :">
            <Select
              placeholder="Selectionner joueur"
              style={{ width: 200 }}
              allowClear
            >
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="lucy">Marouene</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Selectionner séance :">
            <Select
              placeholder="Selectionner séance"
              style={{ width: 200 }}
              allowClear
            >
              <Select.Option value="lucy">Séance1</Select.Option>
              <Select.Option value="lucy">Séance2</Select.Option>
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
            <Button
              style={{ marginTop: "30px" }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              icon={<SearchOutlined />}
            >
              Chercher
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <DisplayInfo />
  </>
);

export default UpdatePlayer;
