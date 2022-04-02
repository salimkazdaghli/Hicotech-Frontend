import { PageHeader, Tabs, Button, Statistic, Tag, Avatar } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import UpdatePlayerProfile from "./UpdatePlayerProfile";
import DisplayStats from "../DisplayStats/DisplayStats";
import "./ModifyPlayer.css";

const ModifyPlayer = () => {
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

  const { TabPane } = Tabs;
  const location = useLocation();
  const user = location.state;
  return (
    <>
      <Title>Modifier Joueur</Title>
      <PageHeader
        onBack={() => window.history.back()}
        avatar={
          <Avatar
            style={{
              color: "white",
              backgroundColor:
                ColorList[Math.floor(Math.random() * ColorList.length)],
            }}
          >
            {user.firstName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={`${user.firstName} ${user.lastName}`}
        tags={<Tag color="blue">active</Tag>}
        extra={[
          <>
            <Statistic
              title="Status"
              value="Active"
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: "#3f8600" }}
              style={{ margin: "0 32px" }}
            />
            <Button type="primary" key="2">
              Operation
            </Button>
            ,
          </>,
        ]}
      >
        {/* <Row>
        <Title>hello</Title>
      </Row> */}
      </PageHeader>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Modifier information" key="1">
          <UpdatePlayerProfile user={user} />
        </TabPane>
        <TabPane tab="Les Buts à atteindre" key="2">
          <DisplayStats />
        </TabPane>
      </Tabs>
    </>
  );
};
export default ModifyPlayer;
