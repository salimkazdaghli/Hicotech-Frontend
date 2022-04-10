import { useState } from "react";
import "./Dashboard.css";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Space } from "antd";
import {
  DesktopOutlined,
  HomeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
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
            <NavLink exact to="/coach/dashboard/accueil">
              Accueil
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/invitations">
              Mes Invitations
            </NavLink>
          </Menu.Item>

          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/mystatisitcs">
              Mes Statistiques
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/myskills">
              Mes Compétences
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/programmes">
              Mes Programmes
            </NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/players">
              Mes Joueurs
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/invitations">
              Invitation
            </NavLink>
          </Menu.Item>
          <Menu.Item key="8" icon={<EnvironmentOutlined />}>
            <NavLink exact to="/coach/dashboard/gerer/lieuEntrainement">
              Lieu Entrainement
            </NavLink>
          </Menu.Item>
          <Menu.Item key="9" icon={<EnvironmentOutlined />}>
            <NavLink exact to="/coach/dashboard/manageChallenge">
              Assigner defi
            </NavLink>
          </Menu.Item>
          <Menu.Item key="10" icon={<EnvironmentOutlined />}>
            <NavLink exact to="/coach/dashboard/player/info">
              Afficher Joueur
            </NavLink>
          </Menu.Item>
          <Menu.Item key="11" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/defis">
              Les Défis
            </NavLink>
          </Menu.Item>
          <Menu.Item key="12" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/annulerSeance">
              Annuler Seance
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
