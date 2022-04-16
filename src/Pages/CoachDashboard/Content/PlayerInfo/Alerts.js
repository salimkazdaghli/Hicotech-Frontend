import React from "react";
import { Button, Space, Alert, Collapse } from "antd";

const { Panel } = Collapse;
const Alerts = () => (
  <div className="site-card-wrapper">
    <Collapse
      style={{ width: "50%" }}
      defaultActiveKey={["1"]}
      onChange={() => {}}
    >
      <Panel header="This is panel header 1" key="1">
        <Alert
          message="Info Text"
          description="Info Description Info Description Info Description Info Description"
          type="info"
          action={
            <Space direction="vertical">
              <Button size="small" type="primary" style={{ width: "100%" }}>
                utils
              </Button>
              <Button size="small" type="primary" danger>
                pas utils
              </Button>
            </Space>
          }
        />
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>text</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>text</p>
      </Panel>
    </Collapse>
    ,
  </div>
);

export default Alerts;
