import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Login from "./pages/Login.jsx";
import Ilaclar from "./pages/Ilaclar.jsx";
import Satis from "./pages/Satis.jsx";
import Raporlar from "./pages/Raporlar.jsx";

const { Header, Content, Sider } = Layout;

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("ilaclar");

  const logout = () => {
    setLoggedIn(false);
    setCurrentPage("ilaclar");
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPage]}
          onClick={({ key }) => setCurrentPage(key)}
        >
          <Menu.Item key="ilaclar" icon={<AppstoreOutlined />}>
            İlaçlar
          </Menu.Item>
          <Menu.Item key="satis" icon={<ShoppingCartOutlined />}>
            Satış
          </Menu.Item>
          <Menu.Item key="raporlar" icon={<FileTextOutlined />}>
            Raporlar
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Çıkış Yap
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "#fff",
            paddingLeft: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Eczane Otomasyonu
        </Header>
        <Content style={{ margin: 16 }}>
          {currentPage === "ilaclar" && <Ilaclar />}
          {currentPage === "satis" && <Satis />}
          {currentPage === "raporlar" && <Raporlar />}
        </Content>
      </Layout>
    </Layout>
  );
}
