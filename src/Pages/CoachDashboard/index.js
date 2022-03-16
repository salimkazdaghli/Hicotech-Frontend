import { useState } from "react";
import "./Dashboard.css";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Space } from "antd";
import {
  DesktopOutlined,
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../../Assets/logo.svg";
import DashboardRouting from "./Routes/DashboardRouting";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Dashboard = () => {
  const [collapsed, setcollapsed] = useState(false);
  const history = useHistory();
  const onCollapse = (collapsed) => {
    setcollapsed(collapsed);
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Mon Profil</Menu.Item>
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
            <NavLink exact to="/dashboard/accueil">
              Accueil
            </NavLink>
          </Menu.Item>
          <Menu.Item key="11" icon={<DesktopOutlined />}>
            <NavLink exact to="/dashboard/invitations">
              Mes Invitations
            </NavLink>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Mes Statistiques">
            <Menu.Item key="3">ajouter</Menu.Item>
            <Menu.Item key="4">modifier</Menu.Item>
            <Menu.Item key="5">supprimer</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Mes Clients">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<LogoutOutlined />}>
            <NavLink exact to="/dashboard/invite">
              Invitation
            </NavLink>
          </Menu.Item>
          <Menu.Item key="10" icon={<EnvironmentOutlined />}>
            <NavLink exact to="/dashboard/gerer/lieuEntrainement">
              Lieu Entrainement
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header ">
          <Space align="center" style={{ float: "right" }}>
            <Dropdown overlay={userMenu} placement="bottom">
              <Avatar size="large" icon={<UserOutlined />} />
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
        <Footer style={{ textAlign: "center" }}>Hi Coach ©2022</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
