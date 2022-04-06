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
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink exact to="/dashboard/profile">
              Attribuer un défi
            </NavLink>
          </Menu.Item>


          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <NavLink exact to="/dashboard/invitations">
              Mes Invitations
            </NavLink>
          </Menu.Item>
          <Menu.Item key="12" icon={<DesktopOutlined />}>
            <NavLink exact to="/dashboard/programmes">
              Mes Programmes
            </NavLink>
          </Menu.Item>
          <Menu.Item key="13" icon={<DesktopOutlined />}>
            <NavLink exact to="/dashboard/players">
              Mes Joueurs
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<DesktopOutlined />}>
            <NavLink exact to="/dashboard/mystatisitcs">
              Mes Statistiques
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<DesktopOutlined />}>
            <NavLink exact to="/dashboard/myskills">
              Mes Compétences
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            another Content
          </Menu.Item>
          <Menu.Item key="8" icon={<TeamOutlined />}>
            another Content 2
          </Menu.Item>
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
          <Menu.Item key="11" icon={<EnvironmentOutlined />}>
            <NavLink exact to="/dashboard/gerer/defi">
              Gérer defi
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
        <Footer style={{ textAlign: "center" }}>HiCoach ©2022</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
