import { useState } from "react";
import "./Dashboard.css";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Space } from "antd";
import { HomeOutlined, NotificationOutlined } from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../../Assets/logo.svg";
import DashboardRouting from "./Routes/DashboardRouting";
import authService from "../../Services/authService";

const { Header, Content, Footer, Sider } = Layout;
const Dashboard = () => {
  const [collapsed, setcollapsed] = useState(false);
  const history = useHistory();
  const onCollapse = (collapsed) => {
    setcollapsed(collapsed);
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <NavLink exact to="/joueur/dashboard/modifierProfile">
          Mon Profile
        </NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={() => {
          history.push("/logout");
        }}
        key="2"
      >
        Déconnexion
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "2em",
          }}
        >
          {!collapsed ? (
            <img
              src={logo}
              alt=""
              style={{
                width: "115px",
                height: "115px",
              }}
            />
          ) : (
            <div style={{ height: "115px" }} />
          )}
        </div>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink exact to="/joueur/dashboard/mesdefis">
              Mes défis
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<HomeOutlined />}>
            <NavLink id="seancesId" exact to="/joueur/dashboard/seances">
              Mes seances
            </NavLink>
          </Menu.Item>
          <Menu.Item key="1" icon={<NotificationOutlined />}>
            <NavLink id="eventId" exact to="/joueur/dashboard/mesevents">
              Mes Evénements
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header ">
          <Space align="center" style={{ float: "right" }}>
            <Dropdown overlay={userMenu} placement="bottom">
              <Avatar
                size="large"
                style={{ color: "white", backgroundColor: "#7265e6" }}
              >
                {authService.getCurrentUser()?.firstName.charAt(0)}
              </Avatar>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, height: "100%" }}
          >
            <DashboardRouting />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>HiCoach ©2022</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
